import { getRole } from "../utils/auth";

export default function Sidebar() {
  const role = getRole();

  return (
    <div style={{
      width: 240,
      background: "#0f172a",
      color: "white",
      padding: 20
    }}>
      <h2 style={{ marginBottom: 20 }}>🇧🇸 BahamasEdu</h2>

      <div style={{ opacity: 0.7, marginBottom: 10 }}>
        MENU
      </div>

      {role === "student" && (
        <>
          <p>📁 Dashboard</p>
          <p>📚 My Files</p>
          <p>💬 Chat</p>
        </>
      )}

      {role === "teacher" && (
        <>
          <p>📝 Create Quiz</p>
          <p>📊 Analytics</p>
          <p>📈 Results</p>
        </>
      )}
    </div>
  );
}