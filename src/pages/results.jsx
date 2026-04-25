import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Results() {
  const { id } = useParams();
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchResult = async () => {
      const res = await fetch("http://localhost:5000/results", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      });

      const data = await res.json();

      const found = data.find((r) => r._id === id);
      setResult(found);
    };

    fetchResult();
  }, [id]);

  if (!result) return <h2>Loading results...</h2>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Quiz Results</h2>

      <h3>Score: {result.score}</h3>
      <h3>Percentage: {result.percentage}%</h3>

      {result.percentage >= 50 ? (
        <h2 style={{ color: "green" }}>✅ Passed</h2>
      ) : (
        <h2 style={{ color: "red" }}>❌ Failed</h2>
      )}
    </div>
  );
}

export default Results;