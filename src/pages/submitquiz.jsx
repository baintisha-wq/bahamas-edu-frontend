const submitQuiz = async () => {
  if (!quiz || !quiz.questions) return;

  try {
    setSubmitting(true); // (add state)

    let score = 0;

    quiz.questions.forEach((q, i) => {
      if (answers[i] === q.correct) {
        score++;
      }
    });

    const percentage = (score / quiz.questions.length) * 100;

    const API = import.meta.env.VITE_API_URL;

    const res = await fetch(`${API}/results`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        studentId: localStorage.getItem("userId"),
        quizId: quiz._id,
        score,
        percentage,
      }),
    });

    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.message || "Failed to submit quiz");
    }

    const data = await res.json();

    alert("Quiz submitted successfully!");

    window.location.href = `/results/${data._id}`;
  } catch (err) {
    console.log("Submit error:", err);
    alert(err.message || "Something went wrong. Please try again.");
  } finally {
    setSubmitting(false); // (add state)
  }
};