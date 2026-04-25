import { useEffect, useState } from "react";

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/notifications",
          {
            headers: {
              Authorization:
                "Bearer " + localStorage.getItem("token"),
            },
          }
        );

        const data = await res.json();
        setNotifications(data);
      } catch (err) {
        console.log("Notification error:", err);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Notifications 🔔</h1>

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