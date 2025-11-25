import { useState, useEffect } from "react";
import { getMyAttendance, getMyLeaves, applyLeave } from "../lib/api";
import { useAuthUser } from "../hooks/useAuth"; // ✔ NEW

export default function StudentAttendance() {
  const { data: user } = useAuthUser(); // ✔ Logged in user
  const [attendance, setAttendance] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLeaveForm, setShowLeaveForm] = useState(false);

  const [newLeave, setNewLeave] = useState({
    fromDate: "",
    toDate: "",
    reason: "",
  });

  // Load data once user is available
  useEffect(() => {
    if (user?._id) {
      fetchAttendance();
      fetchLeaveRequests();
    }
  }, [user]);

  // Auto-refresh attendance every 30 sec
  useEffect(() => {
    if (user?._id) {
      const interval = setInterval(fetchAttendance, 30000);
      return () => clearInterval(interval);
    }
  }, [user]);

  const fetchAttendance = async () => {
    try {
      const data = await getMyAttendance();
      setAttendance(data || []);
    } catch (err) {
      console.error("Attendance fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchLeaveRequests = async () => {
    try {
      const data = await getMyLeaves();
      setLeaveRequests(data || []);
    } catch (err) {
      console.error("Leave fetch error:", err);
    }
  };

  const handleLeaveRequest = async (e) => {
    e.preventDefault();

    try {
      await applyLeave(newLeave);
      setNewLeave({ fromDate: "", toDate: "", reason: "" });
      setShowLeaveForm(false);
      fetchLeaveRequests();
    } catch (err) {
      console.error("Leave apply error:", err);
      alert("Failed to submit leave request");
    }
  };

  const calculateAttendancePercentage = () => {
    if (!attendance.length) return 0;
    const presentDays = attendance.filter((a) => a.status === "present").length;
    return Math.round((presentDays / attendance.length) * 100);
  };

  if (loading)
    return <div className="text-center py-8 text-lg">Loading...</div>;

  return (
    <div className="space-y-6">
      {/* Attendance Summary */}
      <div className="bg-white rounded-2xl p-6 shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-800 font-semibold text-xl">
            Attendance Summary
          </h3>

          <button
            onClick={fetchAttendance}
            className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4"
          >
            🔄 Refresh
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold text-green-600">
              {attendance.filter((a) => a.status === "present").length}
            </div>
            <div className="text-gray-600">Present Days</div>
          </div>

          <div>
            <div className="text-3xl font-bold text-red-600">
              {attendance.filter((a) => a.status === "absent").length}
            </div>
            <div className="text-gray-600">Absent Days</div>
          </div>

          <div>
            <div className="text-3xl font-bold text-orange-600">
              {calculateAttendancePercentage()}%
            </div>
            <div className="text-gray-600">Attendance</div>
          </div>
        </div>
      </div>

      {/* Leave Requests */}
      <div className="bg-white rounded-2xl p-6 shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-800 font-semibold text-xl">
            Leave Requests
          </h3>

          <button
            onClick={() => setShowLeaveForm(true)}
            className="btn bg-orange-500 hover:bg-orange-600 text-white rounded-lg px-6"
          >
            Apply for Leave
          </button>
        </div>

        {/* Leave Form Modal */}
        {showLeaveForm && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Apply for Leave</h3>

              <form onSubmit={handleLeaveRequest} className="space-y-4">
                <input
                  type="date"
                  className="input w-full border border-gray-300 rounded px-3 py-2"
                  value={newLeave.fromDate}
                  onChange={(e) =>
                    setNewLeave({ ...newLeave, fromDate: e.target.value })
                  }
                  required
                />

                <input
                  type="date"
                  className="input w-full border border-gray-300 rounded px-3 py-2"
                  value={newLeave.toDate}
                  onChange={(e) =>
                    setNewLeave({ ...newLeave, toDate: e.target.value })
                  }
                  required
                />

                <textarea
                  placeholder="Reason for leave"
                  className="textarea w-full border border-gray-300 rounded px-3 py-2 h-24"
                  value={newLeave.reason}
                  onChange={(e) =>
                    setNewLeave({ ...newLeave, reason: e.target.value })
                  }
                  required
                />

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="btn bg-orange-500 text-white px-6"
                  >
                    Apply
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowLeaveForm(false)}
                    className="btn bg-gray-500 text-white px-6"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Leave Request List */}
        <div className="space-y-3">
          {leaveRequests.map((leave) => (
            <div
              key={leave._id}
              className="border border-gray-200 rounded-lg p-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-800">
                    {new Date(leave.fromDate).toLocaleDateString()} -{" "}
                    {new Date(leave.toDate).toLocaleDateString()}
                  </div>
                  <div className="text-gray-600 text-sm">{leave.reason}</div>
                </div>

                <span
                  className={`px-2 py-1 rounded text-sm ${
                    leave.status === "approved"
                      ? "bg-green-100 text-green-800"
                      : leave.status === "rejected"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
                </span>
              </div>
            </div>
          ))}

          {leaveRequests.length === 0 && (
            <div className="text-center py-4 text-gray-500">
              No leave requests found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
