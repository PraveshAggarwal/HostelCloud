import { useState, useEffect } from "react";
import { getNotices, createNotice, deleteNotice } from "../lib/api";
export default function NoticeManagement() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newNotice, setNewNotice] = useState({ title: "", content: "" });

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const response = await getNotices();
      setNotices(response.data || []);
    } catch (error) {
      console.error("Error fetching notices:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNotice = async (e) => {
    e.preventDefault();
    try {
      await createNotice(newNotice);
      setNewNotice({ title: "", content: "" });
      setShowAddForm(false);
      fetchNotices();
    } catch (error) {
      console.error("Error adding notice:", error);
    }
  };

  const handleDeleteNotice = async (id) => {
    if (window.confirm("Are you sure you want to delete this notice?")) {
      try {
        await deleteNotice(id);
        fetchNotices();
      } catch (error) {
        console.error("Error deleting notice:", error);
      }
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-gray-800 font-semibold text-xl">
          Notice Management
        </h3>
        <button
          onClick={() => setShowAddForm(true)}
          className="btn bg-orange-500 hover:bg-orange-600 text-white border-none rounded-lg px-6"
        >
          Add New Notice
        </button>
      </div>

      {/* Add Notice Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h3 className="text-xl font-semibold mb-4">Add New Notice</h3>
            <form onSubmit={handleAddNotice} className="space-y-4">
              <input
                type="text"
                placeholder="Notice Title"
                value={newNotice.title}
                onChange={(e) =>
                  setNewNotice({ ...newNotice, title: e.target.value })
                }
                className="input w-full border border-gray-300 rounded px-3 py-2"
                required
              />
              <textarea
                placeholder="Notice Content"
                value={newNotice.content}
                onChange={(e) =>
                  setNewNotice({ ...newNotice, content: e.target.value })
                }
                className="textarea w-full border border-gray-300 rounded px-3 py-2 h-32"
                required
              />
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="btn bg-orange-500 text-white px-6"
                >
                  Add Notice
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
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
        {notices.map((notice) => (
          <div
            key={notice._id}
            className="border border-gray-200 rounded-lg p-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  {notice.title}
                </h4>
                <p className="text-gray-600 mb-2">{notice.content}</p>
                <p className="text-sm text-gray-500">
                  Posted on{" "}
                  {new Date(
                    notice.date || notice.createdAt
                  ).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => handleDeleteNotice(notice._id)}
                className="btn btn-sm bg-red-500 hover:bg-red-600 text-white border-none rounded-lg ml-4"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
        {notices.length === 0 && (
          <div className="text-center py-8 text-gray-500">No notices found</div>
        )}
      </div>
    </div>
  );
}
