import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const API = import.meta.env.VITE_API_URL;
const socket = io(API);

function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [receiverId, setReceiverId] = useState("");

  const userId = localStorage.getItem("userId");

  // 🔥 connect socket once
  useEffect(() => {
    if (!userId) return;

    socket.emit("join", userId);

    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [userId]);

  // 🔥 load chat history when receiver changes
  useEffect(() => {
    if (!userId || !receiverId) return;

    const loadMessages = async () => {
      try {
        const res = await fetch(
          `${API}/messages/${userId}/${receiverId}`
        );

        const data = await res.json();
        setMessages(data);
      } catch (err) {
        console.log("Load messages error:", err);
      }
    };

    loadMessages();
  }, [receiverId, userId]);

  // 🔥 send message
  const sendMessage = () => {
    if (!message || !receiverId) return;

    socket.emit("sendMessage", {
      senderId: userId,
      receiverId,
      message,
    });

    setMessage("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>💬 Chat</h2>

      {/* Receiver input */}
      <input
        placeholder="Enter Teacher/Student ID"
        value={receiverId}
        onChange={(e) => setReceiverId(e.target.value)}
        style={{ marginBottom: 10, padding: 8 }}
      />

      {/* Messages box */}
      <div
        style={{
          border: "1px solid #ddd",
          height: 300,
          overflowY: "scroll",
          padding: 10,
          marginBottom: 10,
        }}
      >
        {messages.map((msg, i) => (
          <div key={i}>
            <b>{msg.senderId}:</b> {msg.message}
          </div>
        ))}
      </div>

      {/* Message input */}
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type message..."
        style={{ padding: 8, width: "70%" }}
      />

      <button onClick={sendMessage} style={{ padding: 8 }}>
        Send
      </button>
    </div>
  );
}

export default Chat;