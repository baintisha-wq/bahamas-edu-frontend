import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  const token = localStorage.getItem("token");

  /* ---------------- LOAD SAVED NOTIFICATIONS ---------------- */
  const loadNotifications = async () => {
    const res = await fetch("http://localhost:5000/notifications", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();
    setNotifications(data);
  };

  /* ---------------- REAL-TIME SOCKET ---------------- */
  useEffect(() => {
    const payload = JSON.parse(atob(token.split(".")[1]));

    // join personal room
    socket.emit("join", payload.id);

    // listen for live notifications
    socket.on("notification", (newNotification) => {
      setNotifications((prev) => [newNotification, ...prev]);
    });

    return () => socket.disconnect();
  }, []);

  useEffect(() => {
    loadNotifications();
  }, []);

  /* ---------------- MARK AS READ ---------------- */
  const markAsRead = async (id) => {
    await fetch(`http://localhost:5000/notifications/${id}/read`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    setNotifications((prev) =>
      prev.map((n) =>
        n._id === id ? { ...n, isRead: true } : n
      )
    );
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>🔔 Notifications</h1>

      {notifications.length === 0 && <p>No notifications yet.</p>}

      {notifications.map((n) => (
        <div
          key={n._id}
          onClick={() => markAsRead(n._id)}
          style={{
            padding: 12,
            marginBottom: 10,
            borderRadius: 8,
            cursor: "pointer",
            background: n.isRead ? "#eee" : "#dff3ff",
            border: "1px solid #ccc"
          }}
        >
          <p style={{ margin: 0 }}>{n.message}</p>

          <small style={{ color: "#666" }}>
            {new Date(n.createdAt).toLocaleString()}
          </small>
        </div>
      ))}
    </div>
  );
}

export default Notifications;