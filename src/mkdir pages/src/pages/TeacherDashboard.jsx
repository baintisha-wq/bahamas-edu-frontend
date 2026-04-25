import { useState } from "react";
import axios from "axios";

export default function TeacherDashboard() {
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");

  const createQuiz = async () => {
    const token = localStorage.getItem("token");

    await axios.post(
      "http://localhost:5000/quiz",
      {
        title,
        questions: [{ question, correct: "4" }],
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    alert("Quiz created!");
  };

  return (
    <div style={styles.container}>
      <h2>Create Quiz</h2>

      <input placeholder="Quiz Title" onChange={(e) => setTitle(e.target.value)} />
      <input placeholder="Question" onChange={(e) => setQuestion(e.target.value)} />

      <button onClick={createQuiz}>Create</button>
    </div>
  );
}

const styles = {
  container: {
    background: "#000",
    color: "#FFD100",
    height: "100vh",
    padding: 20,
  },
};