import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div>
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div style={{
          flex: 1,
          padding: 20,
          background: "#f5f7fb",
          minHeight: "100vh"
        }}>
          {children}
        </div>
      </div>
    </div>
  );
}