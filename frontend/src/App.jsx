import { Route, Routes } from "react-router-dom";
import { RegisterPage } from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import AttendanceManagement from "./components/AttendanceManagement";
import StudentAttendance from "./components/StudentAttendance";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/l" element={<LoginPage />} />
        <Route path="/a" element={<AttendanceManagement />} />
        <Route path="/d" element={<StudentAttendance />} />
      </Routes>
    </div>
  );
}

export default App;
