import { useState } from "react";

function JoinClass() {
  const [classCode, setClassCode] = useState("");

  const joinClass = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/classes/join", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ classCode })
    });

    const data = await res.json();

    alert(data.message);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>🎓 Join Class</h1>

      <input
        placeholder="Enter Class Code"
        value={classCode}
        onChange={(e) => setClassCode(e.target.value)}
      />

      <button onClick={joinClass}>
        Join
      </button>
    </div>
  );
}

export default JoinClass;