import { useEffect, useState } from "react";

function TeacherAnalytics() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/analytics",
          {
            headers: {
              Authorization:
                "Bearer " + localStorage.getItem("token"),
            },
          }
        );

        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.log("Analytics error:", err);
      }
    };

    fetchAnalytics();
  }, []);

  if (!stats) return <h2>Loading analytics...</h2>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Teacher Analytics Dashboard</h1>

      <h3>Total Students: {stats.totalStudents}</h3>

      <h3>
        Average Score: {stats.averageScore}%
      </h3>

      <h3>
        Highest Score: {stats.highestScore}%
      </h3>

      <h3>
        Lowest Score: {stats.lowestScore}%
      </h3>

      <h3>
        Pass Rate: {stats.passRate}%
      </h3>
    </div>
  );
}

export default TeacherAnalytics;