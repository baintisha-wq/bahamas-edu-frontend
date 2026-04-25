import { useNavigate } from "react-router-dom";
import "../styles.css";

function StudentDashboard() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1>🎓 Student Dashboard</h1>

      <div className="card">
        <h3>Ready to start your quiz?</h3>
        <p>Test your knowledge and see your score instantly.</p>

        <button className="button primary" onClick={() => navigate("/quiz")}>
          🚀 Start Quiz
        </button>
      </div>

      <div className="card">
        <h3>📊 Your Progress</h3>
        <p>Complete quizzes to see analytics here.</p>
      </div>
    </div>
  );
}

export default StudentDashboard;