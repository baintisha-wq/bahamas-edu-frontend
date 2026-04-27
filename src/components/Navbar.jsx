export default function Navbar() {
  return (
    <div style={{
      padding: 14,
      background: "white",
      borderBottom: "1px solid #e5e7eb",
      display: "flex",
      justifyContent: "space-between"
    }}>
      <strong>Dashboard</strong>

      <button onClick={() => {
        localStorage.clear();
        window.location.href = "/";
      }}>
        Logout
      </button>
    </div>
  );
}