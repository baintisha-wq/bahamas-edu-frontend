import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  // ❌ NOT LOGGED IN
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // ❌ WRONG ROLE ACCESS
  if (role && userRole !== role) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}

export default ProtectedRoute;