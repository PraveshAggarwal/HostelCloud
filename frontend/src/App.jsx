import { Route, Routes, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { useAuthUser } from "./hooks/useAuth";
import LoginPage from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import StudentDashboard from "./pages/studentPage";
import AdminDashboard from "./pages/adminPage";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { data: authUser, isLoading } = useAuthUser();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!authUser) {
    return <Navigate to="/" replace />;
  }

  if (adminOnly && authUser.role !== "admin") {
    return <Navigate to="/student" replace />;
  }

  return children;
};

const AppRoutes = () => {
  const { data: authUser } = useAuthUser();

  return (
    <Routes>
      {/* Login */}
      <Route
        path="/"
        element={
          authUser ? (
            <Navigate
              to={authUser.role === "admin" ? "/admin" : "/student"}
              replace
            />
          ) : (
            <LoginPage />
          )
        }
      />

      {/* Signup */}
      <Route path="/signup" element={<RegisterPage />} />

      {/* Student */}
      <Route
        path="/student"
        element={
          <ProtectedRoute>
            <StudentDashboard />
          </ProtectedRoute>
        }
      />

      {/* Admin */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute adminOnly>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRoutes />
      <Toaster position="top-center" />
    </QueryClientProvider>
  );
}

export default App;
