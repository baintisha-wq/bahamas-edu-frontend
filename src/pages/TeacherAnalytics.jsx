import { useEffect, useState } from "react";

function TeacherAnalytics() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchAnalytics();
  }, [API]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(`${API}/analytics`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (!res.ok) {
        throw new Error("Failed to load analytics");
      }

      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.log("Analytics error:", err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2>📊 Loading analytics...</h2>;
  }

  if (error) {
    return (
      <div style={{ padding: 20 }}>
        <h2>❌ {error}</h2>
        <button onClick={fetchAnalytics}>Retry</button>
      </div>
    );
  }

  if (!stats) {
    return <h2>No analytics data found</h2>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>📊 Teacher Analytics Dashboard</h1>

      <div style={grid}>
        <Card title="👨‍🎓 Total Students" value={stats.totalStudents} />
        <Card title="📈 Average Score" value={`${stats.averageScore}%`} />
        <Card title="🏆 Highest Score" value={`${stats.highestScore}%`} />
        <Card title="📉 Lowest Score" value={`${stats.lowestScore}%`} />
        <Card title="✅ Pass Rate" value={`${stats.passRate}%`} />
      </div>
    </div>
  );
}

/* Reusable card component */
function Card({ title, value }) {
  return (
    <div style={card}>
      <h3>{title}</h3>
      <p style={{ fontSize: 20, fontWeight: "bold" }}>{value}</p>
    </div>
  );
}

/* Styles */
const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: 15,
  marginTop: 20,
};

const card = {
  padding: 20,
  borderRadius: 12,
  border: "1px solid #ddd",
  background: "#f9f9f9",
  textAlign: "center",
};

export default TeacherAnalytics;