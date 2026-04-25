import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const API = "https://bahamasedu-backend.onrender.com";
const socket = io(API);

function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const userId = localStorage.getItem("userId");
  const receiverId = prompt("Enter Teacher/Student ID");

  useEffect(() => {
    if (!userId) return;

    socket.emit("join", userId);

    const loadMessages = async () => {
      const res = await fetch(
        `${API}/messages/${userId}/${receiverId}`
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
        {messages.map((msg, i) => (
          <div key={i}>
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