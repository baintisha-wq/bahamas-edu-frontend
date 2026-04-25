import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

import "../styles.css";

function TeacherDashboard() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const loadAnalytics = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/analytics", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const json = await res.json();
    setData(json);
  };

  useEffect(() => {
    loadAnalytics();
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  if (!data) return <p className="container">Loading...</p>;

  /* ---------------- CHART DATA ---------------- */
  const barData = [
    { name: "Average", value: Number(data.averageScore) },
    { name: "Highest", value: Number(data.highestScore) },
    { name: "Lowest", value: Number(data.lowestScore) }
  ];

  const pieData = [
    { name: "Passed", value: Number(data.passRate) },
    { name: "Failed", value: 100 - Number(data.passRate) }
  ];

  const COLORS = ["#22c55e", "#ef4444"];

  return (
    <div className="container">
      <h1>👩‍🏫 Teacher Analytics Dashboard</h1>

      <button className="button danger" onClick={logout}>
        Logout
      </button>

      {/* ---------------- CARDS ---------------- */}
      <div className="card">
        <h3>👥 Total Students</h3>
        <p>{data.totalStudents}</p>
      </div>

      <div className="card">
        <h3>📈 Average Score</h3>
        <p>{data.averageScore}%</p>
      </div>

      {/* ---------------- BAR CHART ---------------- */}
      <div className="card">
        <h3>📊 Score Overview</h3>

        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={barData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#2563eb" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ---------------- PIE CHART ---------------- */}
      <div className="card">
        <h3>🎯 Pass Rate</h3>

        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              outerRadius={100}
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* ---------------- QUICK STATS ---------------- */}
      <div className="card">
        <h3>🏆 Performance Summary</h3>
        <p>Highest Score: {data.highestScore}%</p>
        <p>Lowest Score: {data.lowestScore}%</p>
        <p>Pass Rate: {data.passRate}%</p>
      </div>

      <button
        className="button primary"
        onClick={() => navigate("/create-quiz")}
      >
        ➕ Create Quiz
      </button>
    </div>
  );
}

export default TeacherDashboard;