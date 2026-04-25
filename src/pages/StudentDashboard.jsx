import { useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function StudentDashboard() {
  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (userId) {
      socket.emit("join", userId);
    }

    socket.on("notification", (data) => {
      alert("🔔 " + data.message);
    });

    return () => {
      socket.off("notification");
    };
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>🎓 Student Dashboard</h1>

      <p>Welcome back 👋</p>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>

        {/* QUIZ */}
        <button
          onClick={() => {
            const id = prompt("Enter Quiz ID");
            if (id) window.location.href = `/quiz/${id}`;
          }}
        >
          📝 Take Quiz
        </button>

        {/* FILES */}
        <button
          onClick={() => (window.location.href = "/files")}
        >
          📚 Study Materials
        </button>

        {/* CHAT */}
        <button
          onClick={() => (window.location.href = "/chat")}
        >
          💬 Chat with Teacher
        </button>

        {/* NOTIFICATIONS */}
        <button
          onClick={() =>
            (window.location.href = "/notifications")
          }
        >
          🔔 Notifications
        </button>

      </div>
    </div>
  );
}

export default StudentDashboard;