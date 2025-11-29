import { useState, useEffect } from "react";
import { getLaundryBookings, updateLaundaryStatus } from "../lib/api";

const LaundaryManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await getLaundryBookings();
      setBookings(response.data || []);
    } catch (error) {
      console.error("Error fetching laundry bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await updateLaundaryStatus(id, status);
      fetchBookings(); // Refresh list after update
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status");
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md">
      <h3 className="text-gray-800 font-semibold text-xl mb-6">
        Laundry Management
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-gray-600 font-semibold">
                Student
              </th>
              <th className="text-left py-3 px-4 text-gray-600 font-semibold">
                Room
              </th>
              <th className="text-left py-3 px-4 text-gray-600 font-semibold">
                Slot
              </th>
              <th className="text-left py-3 px-4 text-gray-600 font-semibold">
                Date
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
            {bookings.map((booking) => (
              <tr
                key={booking._id}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="py-3 px-4">
                  <div className="text-gray-700 font-medium">
                    {booking.studentId?.name || "Unknown"}
                  </div>
                  <div className="text-xs text-gray-500">
                    {booking.studentId?.rollNo || ""}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="text-gray-700">
                    {booking.studentId?.roomNo || "N/A"}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="text-gray-700 capitalize">{booking.slot}</div>
                </td>
                <td className="py-3 px-4">
                  <div className="text-gray-700">
                    {new Date(booking.date).toLocaleDateString()}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      booking.status === "collected"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {booking.status.charAt(0).toUpperCase() +
                      booking.status.slice(1)}
                  </span>
                </td>
                <td className="py-3 px-4">
                  {booking.status === "booked" && (
                    <button
                      onClick={() =>
                        handleStatusUpdate(booking._id, "collected")
                      }
                      className="btn btn-sm bg-green-500 hover:bg-green-600 text-white border-none"
                    >
                      Mark Collected
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {bookings.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No laundry bookings found
          </div>
        )}
      </div>
    </div>
  );
};

export default LaundaryManagement;
