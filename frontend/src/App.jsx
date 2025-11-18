import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import StudentDashboard from "./pages/studentPage";
import AdminDashboard from "./pages/adminPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/d" element={<StudentDashboard />} />
        <Route path="/a" element={<AdminDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
