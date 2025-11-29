import { useState, useEffect } from "react";
import { getLeaveRequests, updateLeaveStatus } from "../lib/api";
getLeaveRequests;
const LeaveManagement = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      const response = await getLeaveRequests();
      setLeaves(response.data || []);
    } catch (error) {
      console.error("Error fetching leaves:", error);
    } finally {
      setLoading(false);
    }
  };

  const UpdateLeaveStatus = async (id, status) => {
    try {
      await updateLeaveStatus(id, status);
      fetchLeaves();
    } catch (error) {
      console.error("Error updating leave status:", error);
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md">
      <h3 className="text-gray-800 font-semibold text-xl mb-6">
        Leave Requests
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-gray-600 font-semibold">
                Student
              </th>
              <th className="text-left py-3 px-4 text-gray-600 font-semibold">
                From Date
              </th>
              <th className="text-left py-3 px-4 text-gray-600 font-semibold">
                To Date
              </th>
              <th className="text-left py-3 px-4 text-gray-600 font-semibold">
                Reason
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
            {leaves.map((leave) => (
              <tr
                key={leave._id}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="py-3 px-4">
                  <div className="text-gray-700">
                    {leave.studentId?.name || "Unknown"}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="text-gray-700">
                    {new Date(leave.fromDate).toLocaleDateString()}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="text-gray-700">
                    {new Date(leave.toDate).toLocaleDateString()}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="text-gray-600 max-w-xs truncate">
                    {leave.reason}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      leave.status === "approved"
                        ? "bg-green-100 text-green-800"
                        : leave.status === "rejected"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {leave.status.charAt(0).toUpperCase() +
                      leave.status.slice(1)}
                  </span>
                </td>
                <td className="py-3 px-4">
                  {leave.status === "pending" && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => UpdateLeaveStatus(leave._id, "approved")}
                        className="btn btn-sm bg-green-500 text-white px-3"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => UpdateLeaveStatus(leave._id, "rejected")}
                        className="btn btn-sm bg-red-500 text-white px-3"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {leaves.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No leave requests found
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaveManagement;
