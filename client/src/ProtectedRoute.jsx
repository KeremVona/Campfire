import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ content }) {
  const token = localStorage.getItem("token");

  if (!token) {
    // Not logged in, redirect to login page
    return <Navigate to="/" replace />;
  }

  // Logged in, render the protected page
  return content;
}
