import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

function Results() {
  const { id } = useParams();
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const res = await fetch(`${API}/results/${id}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });

        const data = await res.json();
        setResult(data);
      } catch (err) {
        console.log("Result fetch error:", err);
      }
    };

    fetchResult();
  }, [id]);

  if (!result) return <h2>Loading results...</h2>;

  return (
    <div style={{ padding: 20 }}>
      <h2>📊 Quiz Results</h2>

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