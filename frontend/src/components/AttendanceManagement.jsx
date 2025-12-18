import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  getStudents,
  getAttendance,
  markAttendance as markAttendanceAPI,
} from "../lib/api";

export default function AttendanceManagement() {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudents();
    fetchAttendance();
  }, [selectedDate]);

  const fetchStudents = async () => {
    try {
      const data = await getStudents();
      setStudents(data || []);
    } catch (error) {
      console.error("Error fetching students:", error);
      toast.error("Failed to load students");
    }
  };

  const fetchAttendance = async () => {
    try {
      const data = await getAttendance();
      setAttendance(data || []);
    } catch (error) {
      console.error("Error fetching attendance:", error);
      toast.error("Failed to load attendance data");
      setAttendance([]);
    } finally {
      setLoading(false);
    }
  };

  const markAttendance = async (studentId, status) => {
    try {
      await markAttendanceAPI({
        studentId,
        date: selectedDate,
        status,
        checkIn: status === "present" ? new Date().toISOString() : null,
      });

      toast.success(`Attendance marked as ${status}`);
      fetchAttendance(); // refresh
    } catch (error) {
      console.error("Error marking attendance:", error);
      toast.error(error.response?.data?.message || "Failed to mark attendance");
    }
  };

  const getAttendanceStatus = (studentId) => {
    const record = attendance.find((a) => {
      const attendanceDate = new Date(a.date).toDateString();
      const selectedDateString = new Date(selectedDate).toDateString();

      return (
        (a.studentId === studentId || a.studentId?._id === studentId) &&
        attendanceDate === selectedDateString
      );
    });

    return record?.status || "absent";
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-gray-800 font-semibold text-xl">
          Attendance Management
        </h3>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="input border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-gray-600 font-semibold">
                Student
              </th>
              <th className="text-left py-3 px-4 text-gray-600 font-semibold">
                Roll No.
              </th>
              <th className="text-left py-3 px-4 text-gray-600 font-semibold">
                Room
              </th>
              <th className="text-left py-3 px-4 text-gray-600 font-semibold">
                Status
              </th>
              <th className="text-left py-3 px-4 text-gray-600 font-semibold">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => {
              const status = getAttendanceStatus(student._id);

              return (
                <tr
                  key={student._id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-3 px-4">
                    <div className="text-gray-700">{student.name}</div>
                  </td>

                  <td className="py-3 px-4">
                    <div className="text-gray-700">{student.rollNo}</div>
                  </td>

                  <td className="py-3 px-4">
                    <div className="text-gray-600">{student.roomNo}</div>
                  </td>

                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        status === "present"
                          ? "bg-green-100 text-green-800"
                          : status === "leave"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </span>
                  </td>

                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => markAttendance(student._id, "present")}
                        className={`btn btn-sm px-3 ${
                          status === "present"
                            ? "bg-green-600 text-white"
                            : "bg-green-500 hover:bg-green-600 text-white"
                        }`}
                      >
                        Present
                      </button>

                      <button
                        onClick={() => markAttendance(student._id, "absent")}
                        className={`btn btn-sm px-3 ${
                          status === "absent"
                            ? "bg-red-600 text-white"
                            : "bg-red-500 hover:bg-red-600 text-white"
                        }`}
                      >
                        Absent
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
