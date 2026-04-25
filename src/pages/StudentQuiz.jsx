import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

function StudentQuiz() {
  const { id } = useParams();

  const [quiz, setQuiz] = useState(null);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState([]);

  const [timeLeft, setTimeLeft] = useState(600);
  const [warnings, setWarnings] = useState(0);

  const userId = localStorage.getItem("userId");

  /* ---------------- LOAD QUIZ ---------------- */
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await fetch(`${API}/quizzes`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });

        const data = await res.json();
        const found = data.find((q) => q._id === id);

        setQuiz(found);
      } catch (err) {
        console.log("Quiz load error:", err);
      }
    };

    fetchQuiz();
  }, [id]);

  /* ---------------- TIMER ---------------- */
  useEffect(() => {
    if (!quiz) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          submitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quiz]);

  /* ---------------- ANTI-CHEAT ---------------- */
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setWarnings((prev) => {
          const updated = prev + 1;

          alert(`⚠ Warning ${updated}/3: Do not switch tabs`);

          if (updated >= 3) {
            alert("❌ Quiz auto-submitted");
            submitQuiz();
          }

          return updated;
        });
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );
    };
  }, [quiz]);

  /* ---------------- SUBMIT QUIZ ---------------- */
  const submitQuiz = async () => {
    if (!quiz || !quiz.questions) return;

    let score = 0;

    quiz.questions.forEach((q, i) => {
      if (answers[i] === q.correct) score++;
    });

    const percentage = (score / quiz.questions.length) * 100;

    try {
      const res = await fetch(`${API}/results`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentId: userId,
          quizId: quiz._id,
          score,
          percentage,
        }),
      });

      const data = await res.json();

      alert("Quiz submitted!");
      window.location.href = `/results/${data._id}`;
    } catch (err) {
      console.log("Submit error:", err);
    }
  };

  /* ---------------- ANSWER SELECT ---------------- */
  const selectAnswer = (i) => {
    const updated = [...answers];
    updated[index] = i;
    setAnswers(updated);
  };

  const next = () => {
    if (index < quiz.questions.length - 1) {
      setIndex(index + 1);
    }
  };

  const prev = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  if (!quiz || !quiz.questions) return <h2>Loading quiz...</h2>;

  const q = quiz.questions[index];

  return (
    <div style={{ padding: 20, maxWidth: 700, margin: "auto" }}>
      <h2>📘 {quiz.title}</h2>

      {/* TOP INFO BAR */}
      <div style={{ marginBottom: 20 }}>
        <h3>
          ⏱ {Math.floor(timeLeft / 60)}:
          {(timeLeft % 60).toString().padStart(2, "0")}
        </h3>

        <h4>⚠ Warnings: {warnings}/3</h4>

        <h4>
          Question {index + 1} / {quiz.questions.length}
        </h4>
      </div>

      {/* QUESTION */}
      <div style={{ marginBottom: 20 }}>
        <h3>{q.question}</h3>
      </div>

      {/* OPTIONS */}
      <div style={{ marginBottom: 20 }}>
        {q.options.map((opt, i) => (
          <div key={i} style={{ marginBottom: 8 }}>
            <label>
              <input
                type="radio"
                checked={answers[index] === i}
                onChange={() => selectAnswer(i)}
              />{" "}
              {opt}
            </label>
          </div>
        ))}
      </div>

      {/* BUTTONS */}
      <div>
        <button onClick={prev} disabled={index === 0}>
          Previous
        </button>

        <button onClick={next} style={{ marginLeft: 10 }}>
          Next
        </button>

        <button
          onClick={submitQuiz}
          style={{
            marginLeft: 10,
            backgroundColor: "green",
            color: "white",
            padding: "8px 12px",
          }}
        >
          Submit Quiz
        </button>
      </div>
    </div>
  );
}

export default StudentQuiz;