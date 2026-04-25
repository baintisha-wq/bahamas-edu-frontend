import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function StudentQuiz() {
  const { id } = useParams();

  const [quiz, setQuiz] = useState(null);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState([]);

  /* ⏱ Timer (10 mins) */
  const [timeLeft, setTimeLeft] = useState(600);

  /* ⚠ Anti-cheat warnings */
  const [warnings, setWarnings] = useState(0);

  /* ---------------- LOAD QUIZ ---------------- */
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await fetch("http://localhost:5000/quizzes", {
          headers: {
            Authorization:
              "Bearer " + localStorage.getItem("token"),
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

  /* ---------------- SUBMIT QUIZ ---------------- */
  const submitQuiz = async () => {
    if (!quiz) return;

    let score = 0;

    quiz.questions.forEach((q, i) => {
      if (answers[i] === q.correct) {
        score++;
      }
    });

    const percentage =
      (score / quiz.questions.length) * 100;

    try {
      const res = await fetch(
        "http://localhost:5000/results",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            studentId: localStorage.getItem("userId"),
            quizId: quiz._id,
            score,
            percentage,
          }),
        }
      );

      const data = await res.json();

      alert("Quiz submitted!");

      window.location.href = `/results/${data._id}`;
    } catch (err) {
      console.log("Submit error:", err);
    }
  };

  /* ---------------- TIMER ---------------- */
  useEffect(() => {
    if (!quiz) return;

    if (timeLeft <= 0) {
      alert("⏱ Time is up! Auto-submitting...");
      submitQuiz();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, quiz]);

  /* ---------------- ANTI-CHEAT ---------------- */
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        const newWarnings = warnings + 1;
        setWarnings(newWarnings);

        alert(
          `⚠ Warning ${newWarnings}/3: Tab switching is not allowed during exams!`
        );

        if (newWarnings >= 3) {
          alert(
            "❌ Too many violations. Quiz auto-submitted."
          );
          submitQuiz();
        }
      }
    };

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );
    };
  }, [warnings, quiz]);

  /* ---------------- ANSWER SELECT ---------------- */
  const selectAnswer = (i) => {
    const updated = [...answers];
    updated[index] = i;
    setAnswers(updated);
  };

  /* ---------------- NAVIGATION ---------------- */
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

  /* ---------------- LOADING ---------------- */
  if (!quiz) return <h2>Loading quiz...</h2>;

  const q = quiz.questions[index];

  return (
    <div style={{ padding: 20 }}>
      <h2>{quiz.title}</h2>

      {/* TIMER */}
      <h3>
        ⏱ Time Left: {Math.floor(timeLeft / 60)}:
        {(timeLeft % 60)
          .toString()
          .padStart(2, "0")}
      </h3>

      {/* WARNINGS */}
      <h3>
        ⚠ Warnings: {warnings} / 3
      </h3>

      {/* QUESTION COUNT */}
      <h3>
        Question {index + 1} /{" "}
        {quiz.questions.length}
      </h3>

      {/* QUESTION */}
      <p>{q.question}</p>

      {/* OPTIONS */}
      {q.options.map((opt, i) => (
        <div key={i}>
          <label>
            <input
              type="radio"
              checked={answers[index] === i}
              onChange={() => selectAnswer(i)}
            />
            {opt}
          </label>
        </div>
      ))}

      {/* BUTTONS */}
      <div style={{ marginTop: 20 }}>
        <button
          onClick={prev}
          disabled={index === 0}
        >
          Previous
        </button>

        <button
          onClick={next}
          disabled={
            index === quiz.questions.length - 1
          }
          style={{ marginLeft: 10 }}
        >
          Next
        </button>

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
    </div>
  );
}

export default StudentQuiz;