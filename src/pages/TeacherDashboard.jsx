function TeacherDashboard() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Teacher Dashboard</h1>

      <p>Welcome Teacher 👩‍🏫</p>

      {/* CREATE QUIZ */}
      <button
        onClick={() => {
          window.location.href = "/create-quiz";
        }}
        style={{
          marginRight: 10,
          padding: "10px",
        }}
      >
        Create Quiz
      </button>

      {/* ANALYTICS DASHBOARD */}
      <button
        onClick={() => {
          window.location.href = "/analytics";
        }}
        style={{
          padding: "10px",
        }}
      >
        View Analytics Dashboard
      </button>
    </div>
  );
}

export default TeacherDashboard;