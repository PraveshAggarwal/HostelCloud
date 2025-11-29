import { useState, useEffect } from "react";
import { getMyComplaints, createComplaint } from "../lib/api";

const StudentComplaint = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showComplaintForm, setShowComplaintForm] = useState(false);
  const [newComplaint, setNewComplaint] = useState({
    title: "",
    description: "",
  });
  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const response = await getMyComplaints();
      setComplaints(response.data || []);
    } catch (error) {
      console.error("Error fetching complaints:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitComplaint = async (e) => {
    e.preventDefault();
    try {
      await createComplaint(newComplaint);
      setNewComplaint({ title: "", description: "" });
      setShowComplaintForm(false);
      fetchComplaints();
    } catch (error) {
      console.error("Error submitting complaint:", error);
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-gray-800 font-semibold text-xl">My Complaints</h3>
        <button
          onClick={() => setShowComplaintForm(true)}
          className="btn bg-orange-500 hover:bg-orange-600 text-white border-none rounded-lg px-6"
        >
          Submit Complaint
        </button>
      </div>

      {/* Complaint Form Modal */}
      {showComplaintForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Submit Complaint</h3>
            <form onSubmit={handleSubmitComplaint} className="space-y-4">
              <input
                type="text"
                placeholder="Complaint Title"
                value={newComplaint.title}
                onChange={(e) =>
                  setNewComplaint({ ...newComplaint, title: e.target.value })
                }
                className="input w-full border border-gray-300 rounded px-3 py-2"
                required
              />
              <textarea
                placeholder="Describe your complaint"
                value={newComplaint.description}
                onChange={(e) =>
                  setNewComplaint({
                    ...newComplaint,
                    description: e.target.value,
                  })
                }
                className="textarea w-full border border-gray-300 rounded px-3 py-2 h-32"
                required
              />
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="btn bg-orange-500 text-white px-6"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => setShowComplaintForm(false)}
                  className="btn bg-gray-500 text-white px-6"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {complaints.map((complaint) => (
          <div
            key={complaint._id}
            className="border border-gray-200 rounded-lg p-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  {complaint.title}
                </h4>
                <p className="text-gray-600 mb-2">{complaint.description}</p>
                <p className="text-sm text-gray-500">
                  Submitted on{" "}
                  {new Date(complaint.createdAt).toLocaleDateString()}
                </p>
              </div>
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
            </div>
          </div>
        ))}
        {complaints.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No complaints found
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentComplaint;
