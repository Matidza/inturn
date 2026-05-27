import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import ProfessionalLayout from "../layouts/ProfessionalLayout";
import MenteeLayout from "../layouts/MenteeLayout";

const getUser = () => JSON.parse(localStorage.getItem("user") || "{}");

export const AppRoutes = () => {
  const user = getUser();

  if (!user.role) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Routes>
      {user.role === "admin" && (
        <Route path="/*" element={<AdminLayout />} />
      )}

      {user.role === "professional" && (
        <Route path="/*" element={<ProfessionalLayout />} />
      )}

      {user.role === "mentee" && (
        <Route path="/*" element={<MenteeLayout />} />
      )}
    </Routes>
  );
};