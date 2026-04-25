import { useState, useEffect } from "react";

function Classes() {
  const [name, setName] = useState("");
  const [classes, setClasses] = useState([]);

  const token = localStorage.getItem("token");

  const loadClasses = async () => {
    const res = await fetch("http://localhost:5000/classes", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();
    setClasses(data);
  };

  useEffect(() => {
    loadClasses();
  }, []);

  const createClass = async () => {
    await fetch("http://localhost:5000/classes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ name })
    });

    setName("");
    loadClasses();
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>🏫 Classes</h1>

      <input
        placeholder="Class Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={createClass}>Create Class</button>

      <h3>Your Classes</h3>

      {classes.map((c) => (
        <div key={c._id} style={{ margin: 10 }}>
          📘 {c.name}
        </div>
      ))}
    </div>
  );
}

export default Classes;