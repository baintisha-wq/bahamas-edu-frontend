import { useEffect, useState } from "react";

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  const API = import.meta.env.VITE_API_URL;
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch(
          `${API}/notifications/${userId}`
        );

        const data = await res.json();
        setNotifications(data);
      } catch (err) {
        console.log("Notification error:", err);
      }
    };

    if (userId) fetchNotifications();
  }, [userId]);

  return (
    <div style={{ padding: 20 }}>
      <h1>🔔 Notifications</h1>

      {notifications.length === 0 ? (
        <p>No notifications yet</p>
      ) : (
        notifications.map((note) => (
          <div
            key={note._id}
            style={{
              border: "1px solid #ddd",
              padding: 15,
              marginBottom: 10,
              borderRadius: 10,
              backgroundColor: "#f9f9f9",
            }}
          >
            <p>{note.message}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Notifications;