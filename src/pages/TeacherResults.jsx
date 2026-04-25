import { useEffect, useState } from "react";
import axios from "axios";

export default function TeacherResults() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const response = await axios.get("http://localhost:5000/results");
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching results:", error);
    }
  };

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "50px auto",
        padding: "30px",
        background: "white",
        borderRadius: "20px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
      }}
    >
      <h1 style={{ marginBottom: "30px" }}>
        Teacher Results Dashboard 🏆
      </h1>

      {results.length === 0 ? (
        <p>No quiz results yet.</p>
      ) : (
        <div>
          {results.map((result, index) => (
            <div
              key={index}
              style={{
                padding: "20px",
                marginBottom: "20px",
                border: "1px solid #ddd",
                borderRadius: "12px"
              }}
            >
              <h3>{result.studentName}</h3>

              <p>
                <strong>Quiz:</strong> {result.quizTitle}
              </p>

              <p>
                <strong>Score:</strong> {result.score} / {result.totalQuestions}
              </p>

              <p>
                <strong>Percentage:</strong> {result.percentage}%
              </p>

              <p>
                <strong>Completed:</strong>{" "}
                {new Date(result.completedAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}