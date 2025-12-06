import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import { Toaster } from "react-hot-toast";
import CategoryPage from "./pages/CategoryPage";
import Profile from "./pages/Profile";
import PublicRoutes from "./routes/PublicsRoute";
import Orders from "./pages/Orders";

export default function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        {/* Protected sahifalar */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Navigate to={`/category/${1}`} />} />{" "}
          <Route path="category/:id" element={<CategoryPage />} />
        </Route>

        {/* Login → faqat user bo‘lmasa */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route path="/profile" element={<PublicRoutes><Profile /></PublicRoutes>} />
                <Route path="/profile/orders" element={<PublicRoutes><Orders /></PublicRoutes>} />

      </Routes>
    </>
  );
}
