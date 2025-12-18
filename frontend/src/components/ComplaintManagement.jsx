import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { getComplaints, updateComplaintStatus } from "../lib/api";
export default function ComplaintManagement() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const response = await getComplaints();
      setComplaints(response.data || []);
    } catch (error) {
      console.error("Error fetching complaints:", error);
      toast.error("Failed to load complaints");
    } finally {
      setLoading(false);
    }
  };

  const UpdateComplaintStatus = async (id, status) => {
    try {
      await updateComplaintStatus(id, status);
      toast.success(`Complaint status updated to ${status}`);
      fetchComplaints();
    } catch (error) {
      console.error("Error updating complaint status:", error);
      toast.error("Failed to update complaint status");
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md">
      <h3 className="text-gray-800 font-semibold text-xl mb-6">
        Complaint Management
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-gray-600 font-semibold">
                Student
              </th>
              <th className="text-left py-3 px-4 text-gray-600 font-semibold">
                Room No
              </th>
              <th className="text-left py-3 px-4 text-gray-600 font-semibold">
                Title
              </th>
              <th className="text-left py-3 px-4 text-gray-600 font-semibold">
                Description
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
            {complaints.map((complaint) => (
              <tr
                key={complaint._id}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="py-3 px-4">
                  <div className="text-gray-700">
                    {complaint.studentId?.name || "Unknown"}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="text-gray-700">
                    {complaint.studentId?.roomNo || "N/A"}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="text-gray-700">{complaint.title}</div>
                </td>
                <td className="py-3 px-4">
                  <div className="text-gray-600 max-w-xs truncate">
                    {complaint.description}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      complaint.status === "resolved"
                        ? "bg-green-100 text-green-800"
                        : complaint.status === "in-progress"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {complaint.status.charAt(0).toUpperCase() +
                      complaint.status.slice(1)}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        UpdateComplaintStatus(complaint._id, "in-progress")
                      }
                      className="btn btn-sm bg-yellow-500 text-white px-3"
                    >
                      In Progress
                    </button>
                    <button
                      onClick={() =>
                        UpdateComplaintStatus(complaint._id, "resolved")
                      }
                      className="btn btn-sm bg-green-500 text-white px-3"
                    >
                      Resolve
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {complaints.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No complaints found
          </div>
        )}
      </div>
    </div>
  );
}
