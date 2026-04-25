import { useEffect } from "react";
import { io } from "socket.io-client";

const API = import.meta.env.VITE_API_URL;

function StudentDashboard() {
  useEffect(() => {
    const userId = localStorage.getItem("userId");

    const socket = io(API);

    if (userId) {
      socket.emit("join", userId);
    }

    socket.on("notification", (data) => {
      alert("🔔 " + data.message);
    });

    return () => {
      socket.off("notification");
      socket.disconnect();
    };
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>🎓 Student Dashboard</h1>

      <p>Welcome back 👋</p>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>

        <button
          onClick={() => {
            const id = prompt("Enter Quiz ID");
            if (id) window.location.href = `/quiz/${id}`;
          }}
        >
          📝 Take Quiz
        </button>

        <button onClick={() => (window.location.href = "/files")}>
          📚 Study Materials
        </button>

        <button onClick={() => (window.location.href = "/chat")}>
          💬 Chat with Teacher
        </button>

        <button onClick={() => (window.location.href = "/notifications")}>
          🔔 Notifications
        </button>

      </div>
    </div>
  );
}

export default StudentDashboard;