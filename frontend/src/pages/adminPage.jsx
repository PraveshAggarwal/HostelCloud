import { useState } from "react";
import { House } from "lucide-react";
import { useAuthUser, useLogout } from "../hooks/useAuth";
import StudentManagement from "../components/StudentManagement";
import AttendanceManagement from "../components/AttendanceManagement";
import LeaveManagement from "../components/LeaveManagement";
import ComplaintManagement from "../components/ComplaintManagement";
import LaundaryManagement from "../components/LaundaryManagement";
import NoticeManagement from "../components/NoticeManagement";
import NotificationSystem from "../components/NotificationSystem";
export default function AdminDashboard() {
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const { data: user } = useAuthUser();
  const { logout } = useLogout();

  // Admin data
  const adminData = {
    name: user?.name || "Admin",
    id: user?.email || "admin@hostel.com",
  };

  const menuItems = [
    { icon: "🏠", label: "Dashboard" },
    { icon: "👥", label: "Student Management" },
    { icon: "📅", label: "Attendance" },
    { icon: "📝", label: "Leave Requests" },
    { icon: "🔧", label: "Complaints" },
    { icon: "👕", label: "Laundry Requests" },
    { icon: "💬", label: "Messages" },
  ];

  return (
    <div className="min-h-screen flex bg-white">
      <div className="flex w-full h-screen overflow-hidden">
        {/* Sidebar */}
        <div className="w-80 bg-slate-700 flex flex-col">
          {/* Logo */}
          <div className="p-6 text-center border-b border-slate-600">
            <div className="flex justify-center items-center ">
              <House size={50} className="text-red-500" />
            </div>

            <h1 className="text-white text-xl font-bold">
              HOSTEL <span className="text-orange-400">CLOUD</span>
            </h1>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 py-4">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => setActiveMenu(item.label)}
                className={`w-full px-6 py-4 flex items-center gap-3 transition-colors ${
                  activeMenu === item.label
                    ? "bg-orange-500 text-white"
                    : "text-white hover:bg-slate-600"
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-linear-to-br from-slate-100 to-slate-200 overflow-y-auto">
          {/* Header */}
          <div className="bg-white p-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div>
                <h2 className="text-gray-800 font-semibold">
                  Welcome Back, {adminData.name}!
                </h2>
                <p className="text-sm text-gray-500">{adminData.id}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => logout()}
                className="btn btn-sm bg-orange-500 hover:bg-orange-600 text-white border-none rounded-full px-6"
              >
                Logout
              </button>
              <NotificationSystem />
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="p-6">
            {activeMenu === "Dashboard" && (
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <h3 className="text-gray-800 font-semibold text-xl mb-6">
                  Admin Dashboard
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-600">👥</div>
                    <div className="text-gray-600">Students</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-600">📅</div>
                    <div className="text-gray-600">Attendance</div>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-yellow-600">📝</div>
                    <div className="text-gray-600">Complaints</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-purple-600">💬</div>
                    <div className="text-gray-600">Notices</div>
                  </div>
                </div>
              </div>
            )}
            {activeMenu === "Student Management" && <StudentManagement />}
            {activeMenu === "Attendance" && <AttendanceManagement />}
            {activeMenu === "Leave Requests" && <LeaveManagement />}
            {activeMenu === "Complaints" && <ComplaintManagement />}
            {activeMenu === "Laundry Requests" && <LaundaryManagement />}
            {activeMenu === "Messages" && <NoticeManagement />}
          </div>
        </div>
      </div>
    </div>
  );
}
