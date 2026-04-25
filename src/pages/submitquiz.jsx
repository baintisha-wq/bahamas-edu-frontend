const submitQuiz = async () => {
  if (!quiz) return;

  let score = 0;

  quiz.questions.forEach((q, i) => {
    if (answers[i] === q.correct) {
      score++;
    }
  });

  const percentage = (score / quiz.questions.length) * 100;

  const res = await fetch("http://localhost:5000/results", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      studentId: localStorage.getItem("userId"),
      quizId: quiz._id,
      score,
      percentage
    })
  });

  const data = await res.json();

  alert("Quiz submitted!");

  window.location.href = `/results/${data._id}`;
};