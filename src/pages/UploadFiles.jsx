import { useEffect, useState } from "react";
import axios from "axios";

export default function TeacherResults() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchResults();
  }, [API]);

  const fetchResults = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(`${API}/results`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      setResults(response.data);
    } catch (error) {
      console.error("Error fetching results:", error);
      setError("Failed to load results");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>📊 Loading results...</h2>;
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: 20 }}>
        <h2>❌ {error}</h2>
        <button onClick={fetchResults}>Retry</button>
      </div>
    );
  }

  return (
    <div style={container}>
      <h1>🏆 Teacher Results Dashboard</h1>

      {results.length === 0 ? (
        <div style={empty}>
          <h3>No quiz results yet 📭</h3>
          <p>Results will appear here once students complete quizzes.</p>
        </div>
      ) : (
        <div style={list}>
          {results.map((result) => (
            <div key={result._id} style={card}>
              <h3>👨‍🎓 {result.studentName || "Student"}</h3>

              <p>
                <strong>Quiz:</strong> {result.quizTitle || "Quiz"}
              </p>

              <p>
                <strong>Score:</strong>{" "}
                {result.score} / {result.totalQuestions}
              </p>

              <p>
                <strong>Percentage:</strong>{" "}
                <span
                  style={{
                    color:
                      result.percentage >= 50 ? "green" : "red",
                    fontWeight: "bold",
                  }}
                >
                  {result.percentage}%
                </span>
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {result.percentage >= 50 ? "✅ Passed" : "❌ Failed"}
              </p>

              <p>
                <strong>Completed:</strong>{" "}
                {result.completedAt
                  ? new Date(result.completedAt).toLocaleString()
                  : "N/A"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* STYLES */
const container = {
  maxWidth: "900px",
  margin: "50px auto",
  padding: "30px",
  background: "white",
  borderRadius: "20px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
};

const list = {
  marginTop: 20,
};

const card = {
  padding: "20px",
  marginBottom: "20px",
  border: "1px solid #ddd",
  borderRadius: "12px",
  background: "#f9f9f9",
};

const empty = {
  textAlign: "center",
  padding: 40,
  color: "#666",
};