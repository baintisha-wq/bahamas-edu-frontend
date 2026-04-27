import SaaSLayout from "../layouts/SaaSLayout";

export default function StudentDashboard() {
  return (
    <SaaSLayout>
      <h1 style={{ marginBottom: 20 }}>
        Student Dashboard 🇧🇸
      </h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: 16
      }}>
        <div className="card">📁 My Files</div>
        <div className="card">🔔 Notifications</div>
        <div className="card">💬 Chat</div>
      </div>
    </SaaSLayout>
  );
}