import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function TeacherDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    fetchStats();
  }, [API]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(`${API}/analytics`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (!res.ok) {
        throw new Error("Failed to load dashboard data");
      }

      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.log("Dashboard error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2 style={{ padding: 20 }}>📊 Loading dashboard...</h2>;
  }

  if (error) {
    return (
      <div style={{ padding: 20 }}>
        <h2>❌ {error}</h2>
        <button onClick={fetchStats}>Retry</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>👩‍🏫 Teacher Dashboard</h1>
      <p>Welcome back 👋</p>

      {/* STATS */}
      <div style={cardRow}>
        <Card title="Students" value={stats?.totalStudents || 0} />
        <Card title="Avg Score" value={`${stats?.averageScore || 0}%`} />
        <Card title="Pass Rate" value={`${stats?.passRate || 0}%`} />
      </div>

      {/* ACTIONS */}
      <div style={{ marginTop: 30, display: "flex", gap: 10 }}>
        <button style={button} onClick={() => navigate("/create-quiz")}>
          ➕ Create Quiz
        </button>

        <button style={button} onClick={() => navigate("/analytics")}>
          📊 Analytics
        </button>

        <button style={button} onClick={() => navigate("/files")}>
          📚 Upload Materials
        </button>

        <button style={button} onClick={() => navigate("/results")}>
          🏆 View Results
        </button>
      </div>
    </div>
  );
}

/* Reusable Card */
function Card({ title, value }) {
  return (
    <div style={card}>
      <h3>{title}</h3>
      <p style={{ fontSize: 20, fontWeight: "bold" }}>{value}</p>
    </div>
  );
}

/* Styles */
const cardRow = {
  display: "flex",
  gap: 15,
  marginTop: 20,
  flexWrap: "wrap",
};

const card = {
  padding: 20,
  border: "1px solid #ddd",
  borderRadius: 10,
  width: 160,
  textAlign: "center",
  background: "#f9f9f9",
};

const button = {
  padding: "10px 15px",
  cursor: "pointer",
  borderRadius: 6,
  border: "none",
  background: "#222",
  color: "white",
};

export default TeacherDashboard;