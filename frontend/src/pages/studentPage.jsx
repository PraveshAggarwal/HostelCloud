import { useState, useEffect } from "react";
import { House } from "lucide-react";
import { useAuthUser, useLogout } from "../hooks/useAuth";
import StudentAttendance from "../components/StudentAttendance";
import StudentComplaint from "../components/StudentComplaint";
import StudentLaundary from "../components/StudentLaundary";
import StudentNotices from "../components/StudentNotices";
import StudentProfile from "../components/StudentProfile";
import NotificationSystem from "../components/NotificationSystem";
import { getStudents, getMyAttendance, getRecentNotices } from "../lib/api";
export default function StudentDashboard() {
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const { data: user, isLoading: isUserLoading } = useAuthUser();
  const { logout } = useLogout();
  const [studentData, setStudentData] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    if (!isUserLoading && user) {
      fetchStudentData();
      fetchAttendance();
      fetchNotices();
    }
  }, [user, isUserLoading]);

  // Refresh attendance data every 30 seconds
  useEffect(() => {
    if (!isUserLoading && user) {
      const interval = setInterval(fetchAttendance, 30000);
      return () => clearInterval(interval);
    }
  }, [user, isUserLoading]);

  const fetchStudentData = async () => {
    try {
      console.log("Fetching student data for user:", user);
      const response = await getStudents();
      console.log("Students response:", response);
      const currentStudent = response?.find((s) => s.email === user?.email);
      console.log("Current student found:", currentStudent);
      setStudentData(currentStudent);
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  };

  const fetchAttendance = async () => {
    try {
      console.log("Fetching attendance...");
      const response = await getMyAttendance();
      console.log("Attendance response:", response);
      setAttendance(response || []);
    } catch (error) {
      console.error("Error fetching attendance:", error);
      setAttendance([]);
    }
  };

  const fetchNotices = async () => {
    try {
      console.log("Fetching notices...");
      const response = await getRecentNotices();
      console.log("Notices response:", response);
      setNotices(response || []);
    } catch (error) {
      console.error("Error fetching notices:", error);
    }
  };

  const calculateAttendancePercentage = () => {
    if (attendance.length === 0) return 0;
    const presentDays = attendance.filter((a) => a.status === "present").length;
    return Math.round((presentDays / attendance.length) * 100);
  };

  const displayData = {
    name: user?.name || studentData?.name || "Student",
    id: user?.rollNo || studentData?.rollNo || user?.email,
    roomNo: studentData?.roomNo || user?.roomNo || "N/A",
    mobile: studentData?.phone || "N/A",
    attendance: calculateAttendancePercentage(),
    daysPresent: attendance.filter((a) => a.status === "present").length,
    totalDays: attendance.length,
  };

  const menuItems = [
    { icon: "🏠", label: "Dashboard" },
    { icon: "👤", label: "My Profile" },
    { icon: "📅", label: "Attendance & Leave" },
    { icon: "📝", label: "Complaints" },
    { icon: "📋", label: "Notice Board" },
    { icon: "👕", label: "Laundry Services" },
  ];

  if (isUserLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

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
                  Welcome Back, {displayData.name}!
                </h2>
                <p className="text-sm text-gray-500">{displayData.id}</p>
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
              <div className="space-y-6">
                {/* Top Cards Row */}
                <div className="grid grid-cols-2 gap-4">
                  {/* My Quick Info Card */}
                  <div className="bg-white rounded-2xl p-6 shadow-md">
                    <h3 className="text-gray-800 font-semibold text-lg mb-4">
                      My Quick Info
                    </h3>
                    <div className="space-y-2 text-gray-700">
                      <p>
                        <span className="font-medium">Room No:</span>{" "}
                        {displayData.roomNo}
                      </p>
                      <p>
                        <span className="font-medium">Mobile:</span>
                      </p>
                      <p>{displayData.mobile}</p>
                    </div>
                  </div>

                  {/* Attendance Card */}
                  <div className="bg-white rounded-2xl p-6 shadow-md flex flex-col items-center justify-center">
                    <div className="relative w-32 h-32">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          cx="64"
                          cy="64"
                          r="56"
                          stroke="#e5e7eb"
                          strokeWidth="12"
                          fill="none"
                        />
                        <circle
                          cx="64"
                          cy="64"
                          r="56"
                          stroke="url(#gradient)"
                          strokeWidth="12"
                          fill="none"
                          strokeDasharray={`${2 * Math.PI * 56}`}
                          strokeDashoffset={`${
                            2 *
                            Math.PI *
                            56 *
                            (1 - displayData.attendance / 100)
                          }`}
                          strokeLinecap="round"
                        />
                        <defs>
                          <linearGradient
                            id="gradient"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="0%"
                          >
                            <stop offset="0%" stopColor="#f97316" />
                            <stop offset="100%" stopColor="#3b82f6" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl font-bold text-gray-800">
                          {displayData.attendance}%
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-600 mt-3">
                      Days Present: {displayData.daysPresent}/
                      {displayData.totalDays}
                    </p>
                  </div>
                </div>

                {/* Recent Notices Card */}
                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <h3 className="text-gray-800 font-semibold text-lg mb-4">
                    Recent Notices
                  </h3>
                  <div className="space-y-3">
                    {notices.slice(0, 3).map((notice, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-gray-700">{notice.title}</span>
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(
                            notice.date || notice.createdAt
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                    {notices.length === 0 && (
                      <div className="text-center py-4 text-gray-500">
                        No notices available
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            {activeMenu === "My Profile" && <StudentProfile />}
            {activeMenu === "Attendance & Leave" && <StudentAttendance />}
            {activeMenu === "Complaints" && <StudentComplaint />}
            {activeMenu === "Notice Board" && <StudentNotices />}
            {activeMenu === "Laundry Services" && <StudentLaundary />}
          </div>
        </div>
      </div>
    </div>
  );
}
