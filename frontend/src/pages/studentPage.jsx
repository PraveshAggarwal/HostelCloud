import { useState } from "react";
import { House } from "lucide-react";
export default function StudentDashboard() {
  const [activeMenu, setActiveMenu] = useState("My Profile");

  // Student data
  const studentData = {
    name: "Ananya",
    id: "S19001",
    roomNo: "C-301",
    mobile: "+91 98765 66210",
    attendance: 85,
    daysPresent: 18,
    totalDays: 20,
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
  };

  // Recent notices data
  const notices = [
    { title: "Mess Menu Update - Feb 2024", status: "", count: "" },
    { title: "Hostel Diwal Oxlane Celebration", status: "Open", count: "(1)" },
    { title: "AC Repair - Room C-301", status: "Closed", count: "(3)" },
  ];

  const menuItems = [
    { icon: "🏠", label: "Dashboard" },
    { icon: "👤", label: "My Profile" },
    { icon: "📅", label: "Attendance & Leave" },
    { icon: "📝", label: "Complaints &" },
    { icon: "🔧", label: "Notice Board" },
    { icon: "👕", label: "Laundry Services" },
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
              <img
                src={studentData.photo}
                alt="Profile"
                className="w-12 h-12 rounded-full border-2 border-orange-400"
              />
              <div>
                <h2 className="text-gray-800 font-semibold">
                  Welcome Back, {studentData.name}!
                </h2>
                <p className="text-sm text-gray-500">{studentData.id}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="btn btn-sm bg-orange-500 hover:bg-orange-600 text-white border-none rounded-full px-6">
                Logout
              </button>
              <button className="text-orange-500 text-2xl">🔔</button>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="p-6 space-y-6">
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
                    {studentData.roomNo}
                  </p>
                  <p>
                    <span className="font-medium">Mobile:</span>
                  </p>
                  <p>{studentData.mobile}</p>
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
                        2 * Math.PI * 56 * (1 - studentData.attendance / 100)
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
                      {studentData.attendance}%
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 mt-3">
                  Days Present: {studentData.daysPresent}/
                  {studentData.totalDays}
                </p>
              </div>
            </div>

            {/* Recent Notices Card */}
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h3 className="text-gray-800 font-semibold text-lg mb-4">
                Recent Notices
              </h3>
              <div className="space-y-3">
                {notices.map((notice, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                  >
                    <div className="flex items-center gap-2">
                      {notice.status === "Closed" && (
                        <span className="text-gray-400">🔧</span>
                      )}
                      <span className="text-gray-700">{notice.title}</span>
                    </div>
                    {notice.status && (
                      <span
                        className={`text-sm font-medium ${
                          notice.status === "Open"
                            ? "text-green-600"
                            : "text-gray-500"
                        }`}
                      >
                        {notice.status} {notice.count}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Complints & Requests Card */}
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h3 className="text-gray-800 font-semibold text-lg mb-4">
                Complints & Requests
              </h3>
              <button className="btn bg-orange-500 hover:bg-orange-600 text-white border-none rounded-full px-8 mb-4">
                Request New Load
              </button>
              <p className="text-gray-600 text-sm">
                Last Request: Pending Pickup (Feb 15 3)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
