import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const navigate = useNavigate();

  // 🔥 Backend URL from .env
  const API = import.meta.env.VITE_API_URL;

  // 🔥 Debug check (remove later if you want)
  console.log("API URL:", API);

  const handleRegister = async () => {
    try {
      const res = await fetch(`${API}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role,
        }),
      });

      const data = await res.json();

      console.log("REGISTER RESPONSE:", data);

      if (res.ok) {
        alert("Account created successfully!");
        navigate("/");
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      console.log("REGISTER ERROR:", error);
      alert("Server connection failed");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Register</h2>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <br />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <br />

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="student">Student</option>
        <option value="teacher">Teacher</option>
      </select>

      <br />
      <br />

      <button onClick={handleRegister}>
        Register
      </button>
    </div>
  );
}

export default Register;