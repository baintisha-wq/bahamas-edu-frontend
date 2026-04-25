import { useState } from "react";

function CreateQuiz() {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: "",
        options: ["", "", "", ""],
        correct: 0
      }
    ]);
  };

  const updateQuestion = (index, value) => {
    const updated = [...questions];
    updated[index].question = value;
    setQuestions(updated);
  };

  const updateOption = (qIndex, optIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[optIndex] = value;
    setQuestions(updated);
  };

  const setCorrect = (qIndex, optIndex) => {
    const updated = [...questions];
    updated[qIndex].correct = optIndex;
    setQuestions(updated);
  };

  const saveQuiz = async () => {
    const res = await fetch("http://127.0.0.1:5000/quizzes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token")
      },
      body: JSON.stringify({
        title,
        questions,
        closesAt: new Date(Date.now() + 86400000) // 1 day default
      })
    });

    const data = await res.json();
    alert("Quiz created!");
    console.log(data);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Create Quiz</h2>

      <input
        placeholder="Quiz Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br /><br />

      <button onClick={addQuestion}>+ Add Question</button>

      {questions.map((q, i) => (
        <div key={i} style={{ marginTop: 20 }}>
          <input
            placeholder="Question"
            value={q.question}
            onChange={(e) => updateQuestion(i, e.target.value)}
          />

          {q.options.map((opt, j) => (
            <div key={j}>
              <input
                placeholder={`Option ${j + 1}`}
                value={opt}
                onChange={(e) => updateOption(i, j, e.target.value)}
              />

              <button onClick={() => setCorrect(i, j)}>
                {q.correct === j ? "✔ Correct" : "Mark Correct"}
              </button>
            </div>
          ))}
        </div>
      ))}

      <br />

      <button onClick={saveQuiz}>Save Quiz</button>
    </div>
  );
}

export default CreateQuiz;