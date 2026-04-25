export default function Layout({ children }) {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#00A7A7",
      color: "white",
      fontFamily: "Arial"
    }}>
      <header style={{
        padding: "15px",
        background: "#000",
        color: "#FFD100",
        fontWeight: "bold"
      }}>
        🇧🇸 BahamasEdu
      </header>

      <div style={{ padding: 20 }}>
        {children}
      </div>
    </div>
  );
}