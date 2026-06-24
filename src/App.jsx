import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Categories from "./pages/Categories";
import Dashboard from "./pages/Dashboard";
import Movies from "./pages/Movies";
import { useStore } from "./store/useStore";
const ProtectedRoute = ({ children, requireRegistration = false, requireCategories = false }) => {
  const { user, categories } = useStore();
  if (requireRegistration && !user.name) {
    return <Navigate to="/" replace />;
  }
  if (requireCategories && categories.length < 3) {
    return <Navigate to="/categories" replace />;
  }
  return children;
};
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route 
          path="/categories" 
          element={
            <ProtectedRoute requireRegistration={true}>
              <Categories />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute requireRegistration={true} requireCategories={true}>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/movies" 
          element={
            <ProtectedRoute requireRegistration={true} requireCategories={true}>
              <Movies />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
