import { useState } from "react";
import { House } from "lucide-react";
export default function AdminDashboard() {
  const [activeMenu, setActiveMenu] = useState("Student Management");
  const [searchQuery, setSearchQuery] = useState("");

  // Admin data
  const adminData = {
    name: "Warden",
    id: "S15001",
    photo: "https://randomuser.me/api/portraits/women/45.jpg",
  };

  // Students data
  const students = [
    {
      id: 1,
      name: "Ananya Sharma",
      rollNo: "C-301",
      room: "19937 2021",
      photo: "https://randomuser.me/api/portraits/women/44.jpg",
      actionType: "edit",
    },
    {
      id: 2,
      name: "Ananya Sharma",
      rollNo: "C-302",
      room: "19937 2024",
      photo: "https://randomuser.me/api/portraits/women/47.jpg",
      actionType: "edit",
    },
    {
      id: 3,
      name: "S19004 60005",
      rollNo: "S1990001",
      room: "05 361 2023",
      photo: "https://randomuser.me/api/portraits/women/48.jpg",
      actionType: "edit",
    },
    {
      id: 4,
      name: "Rahul Singh",
      rollNo: "C-112",
      room: "19951 2024",
      photo: "https://randomuser.me/api/portraits/men/32.jpg",
      actionType: "edit",
    },
    {
      id: 5,
      name: "Rahul Singh",
      rollNo: "S19500I1",
      room: "05 353 2028",
      photo: "https://randomuser.me/api/portraits/men/33.jpg",
      actionType: "edit",
    },
    {
      id: 6,
      name: "Priya Reddy",
      rollNo: "S1990001I",
      room: "05 357 8028",
      photo: "https://randomuser.me/api/portraits/women/50.jpg",
      actionType: "edit",
    },
    {
      id: 7,
      name: "Aiva Reddy",
      rollNo: "AC Repair Room C-I0",
      room: "05 15? 2024",
      photo: "https://randomuser.me/api/portraits/women/51.jpg",
      actionType: "delete",
    },
    {
      id: 8,
      name: "Susttonya Sarna",
      rollNo: "AC Repair Room C-I0",
      room: "05 15? 2024",
      photo: "https://randomuser.me/api/portraits/women/52.jpg",
      actionType: "delete",
    },
    {
      id: 9,
      name: "Ananya Sharma",
      rollNo: "AC RIpair Room C-I0",
      room: "05 15? 3024",
      photo: "https://randomuser.me/api/portraits/women/53.jpg",
      actionType: "delete",
    },
  ];

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
              <img
                src={adminData.photo}
                alt="Profile"
                className="w-12 h-12 rounded-full border-2 border-orange-400"
              />
              <div>
                <h2 className="text-gray-800 font-semibold">
                  Welcome Back, {adminData.name}!
                </h2>
                <p className="text-sm text-gray-500">{adminData.id}</p>
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
          <div className="p-6">
            {/* Student Management Card */}
            <div className="bg-white rounded-2xl p-6 shadow-md">
              {/* Header with Search and Add Button */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-gray-800 font-semibold text-xl">
                  Student Management
                </h3>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Search by Roll No. or Naam..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    🔍
                  </span>
                </div>
                <button className="btn bg-orange-500 hover:bg-orange-600 text-white border-none rounded-lg px-6">
                  Add New Student
                </button>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-gray-600 font-semibold">
                        Photo
                      </th>
                      <th className="text-left py-3 px-4 text-gray-600 font-semibold">
                        Roll No.
                      </th>
                      <th className="text-left py-3 px-4 text-gray-600 font-semibold">
                        Roome
                      </th>
                      <th className="text-left py-3 px-4 text-gray-600 font-semibold">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student) => (
                      <tr
                        key={student.id}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={student.photo}
                              alt={student.name}
                              className="w-10 h-10 rounded-full"
                            />
                            <span className="text-gray-700">
                              {student.name}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-gray-700">{student.rollNo}</div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-gray-600 text-sm">
                            {student.room}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <button
                            className={`btn btn-sm ${
                              student.actionType === "delete"
                                ? "bg-red-500 hover:bg-red-600"
                                : "bg-orange-400 hover:bg-orange-500"
                            } text-white border-none rounded-lg w-10 h-10 p-0`}
                          >
                            {student.actionType === "delete" ? "🗑️" : "✏️"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Bottom Action Buttons */}
              <div className="flex items-center gap-2 mt-6 pt-4 border-t border-gray-200">
                <button className="btn bg-blue-500 hover:bg-blue-600 text-white border-none rounded-lg px-6">
                  View Details
                </button>
                <button className="btn bg-orange-400 hover:bg-orange-500 text-white border-none rounded-lg w-10 h-10 p-0">
                  📁
                </button>
                <button className="btn bg-orange-500 hover:bg-orange-600 text-white border-none rounded-lg px-6">
                  Edit Datels
                </button>
                <button className="btn bg-orange-400 hover:bg-orange-500 text-white border-none rounded-lg w-10 h-10 p-0">
                  ✏️
                </button>
                <button className="btn bg-orange-500 hover:bg-orange-600 text-white border-none rounded-lg w-10 h-10 p-0">
                  📤
                </button>
                <button className="btn bg-red-500 hover:bg-red-600 text-white border-none rounded-lg w-10 h-10 p-0">
                  🗑️
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
