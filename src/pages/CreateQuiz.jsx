import { useState } from "react";

function CreateQuiz() {
  const API = import.meta.env.VITE_API_URL;

  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([
    { question: "", options: ["", "", "", ""], correct: 0 },
  ]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", options: ["", "", "", ""], correct: 0 },
    ]);
  };

  const updateQuestion = (index, value) => {
    const updated = [...questions];
    updated[index].question = value;
    setQuestions(updated);
  };

  const updateOption = (qIndex, oIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex] = value;
    setQuestions(updated);
  };

  const setCorrect = (qIndex, value) => {
    const updated = [...questions];
    updated[qIndex].correct = value;
    setQuestions(updated);
  };

  const submitQuiz = async () => {
    try {
      const res = await fetch(`${API}/quizzes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          title,
          questions,
        }),
      });

      if (!res.ok) throw new Error("Failed");

      alert("Quiz created successfully!");
      setTitle("");
      setQuestions([
        { question: "", options: ["", "", "", ""], correct: 0 },
      ]);
    } catch (err) {
      console.log(err);
      alert("Error creating quiz");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>📝 Create Quiz</h1>

      {/* TITLE */}
      <input
        placeholder="Quiz Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ display: "block", marginBottom: 20 }}
      />

      {/* QUESTIONS */}
      {questions.map((q, i) => (
        <div
          key={i}
          style={{
            border: "1px solid #ddd",
            padding: 15,
            marginBottom: 20,
          }}
        >
          <input
            placeholder="Question"
            value={q.question}
            onChange={(e) => updateQuestion(i, e.target.value)}
            style={{ width: "100%", marginBottom: 10 }}
          />

          {q.options.map((opt, j) => (
            <input
              key={j}
              placeholder={`Option ${j + 1}`}
              value={opt}
              onChange={(e) =>
                updateOption(i, j, e.target.value)
              }
              style={{ display: "block", marginBottom: 5 }}
            />
          ))}

          <label>
            Correct Answer (0-3):
            <input
              type="number"
              min="0"
              max="3"
              value={q.correct}
              onChange={(e) =>
                setCorrect(i, Number(e.target.value))
              }
              style={{ marginLeft: 10 }}
            />
          </label>
        </div>
      ))}

      {/* ACTION BUTTONS */}
      <button onClick={addQuestion}>➕ Add Question</button>

      <button
        onClick={submitQuiz}
        style={{
          marginLeft: 10,
          backgroundColor: "green",
          color: "white",
          padding: "10px",
        }}
      >
        Submit Quiz
      </button>
    </div>
  );
}

export default CreateQuiz;