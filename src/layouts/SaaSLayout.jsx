import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function SaaSLayout({ children }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main area */}
      <div style={{ flex: 1, background: "#f5f7fb" }}>
        <Navbar />

        <div style={{
          padding: 24
        }}>
          {children}
        </div>
      </div>
    </div>
  );
}