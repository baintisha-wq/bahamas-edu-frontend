import SaaSLayout from "../layouts/SaaSLayout";

export default function TeacherDashboard() {
  return (
    <SaaSLayout>
      <h1 style={{ marginBottom: 20 }}>
        Teacher Dashboard 🇧🇸
      </h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: 16
      }}>
        <div className="card">📝 Create Quiz</div>
        <div className="card">📊 Analytics</div>
        <div className="card">📈 Results</div>
      </div>
    </SaaSLayout>
  );
}