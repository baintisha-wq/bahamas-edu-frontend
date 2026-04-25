import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const userId = localStorage.getItem("userId");
  const receiverId = prompt("Enter Teacher/Student ID");

  useEffect(() => {
    socket.emit("join", userId);

    // load history
    const loadMessages = async () => {
      const res = await fetch(
        `http://localhost:5000/messages/${userId}/${receiverId}`
      );

      const data = await res.json();
      setMessages(data);
    };

    loadMessages();

    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const sendMessage = () => {
    socket.emit("sendMessage", {
      senderId: userId,
      receiverId,
      message,
    });

    setMessage("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Chat 💬</h1>

      <div
        style={{
          border: "1px solid #ddd",
          height: 300,
          overflowY: "scroll",
          padding: 10,
        }}
      >
        {messages.map((msg) => (
          <div key={msg._id}>
            <b>{msg.senderId}:</b> {msg.message}
          </div>
        ))}
      </div>

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type message..."
      />

      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Chat;