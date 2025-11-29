import { useState, useEffect } from "react";
import { getNotices } from "../lib/api";
export default function StudentNotices() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md">
      <h3 className="text-gray-800 font-semibold text-xl mb-6">Notice Board</h3>

      <div className="space-y-4">
        {notices.map((notice) => (
          <div
            key={notice._id}
            className="border border-gray-200 rounded-lg p-4"
          >
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              {notice.title}
            </h4>
            <p className="text-gray-600 mb-2">{notice.content}</p>
            <p className="text-sm text-gray-500">
              Posted on{" "}
              {new Date(notice.date || notice.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
        {notices.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No notices available
          </div>
        )}
      </div>
    </div>
  );
}
