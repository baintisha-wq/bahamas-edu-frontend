const API = import.meta.env.VITE_API_URL;

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