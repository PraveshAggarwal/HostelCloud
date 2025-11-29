// import { useState, useEffect } from "react";
// import {
//   getMyLaundryBookings,
//   getAvailableSlots,
//   bookLaundrySlot,
// } from "../lib/api";
// const StudentLaundary = () => {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showBookingForm, setShowBookingForm] = useState(false);
//   const [newBooking, setNewBooking] = useState({
//     slot: "morning",
//     date: "",
//   });

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   const fetchBookings = async () => {
//     try {
//       const response = await getMyLaundryBookings();
//       setBookings(response.data || []);
//     } catch (error) {
//       console.error("Error fetching laundry bookings:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleBookSlot = async (e) => {
//     e.preventDefault();
//     try {
//       await bookLaundrySlot(newBooking);
//       setNewBooking({ slot: "morning", date: "" });
//       setShowBookingForm(false);
//       fetchBookings();
//     } catch (error) {
//       console.error("Error booking laundry slot:", error);
//     }
//   };

//   if (loading) return <div className="text-center py-8">Loading...</div>;
//   return (
//     <div className="bg-white rounded-2xl p-6 shadow-md">
//       <div className="flex items-center justify-between mb-6">
//         <h3 className="text-gray-800 font-semibold text-xl">
//           Laundry Services
//         </h3>
//         <button
//           onClick={() => setShowBookingForm(true)}
//           className="btn bg-orange-500 hover:bg-orange-600 text-white border-none rounded-lg px-6"
//         >
//           Book Slot
//         </button>
//       </div>

//       {/* Booking Form Modal */}
//       {showBookingForm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 w-full max-w-md">
//             <h3 className="text-xl font-semibold mb-4">Book Laundry Slot</h3>
//             <form onSubmit={handleBookSlot} className="space-y-4">
//               <select
//                 value={newBooking.slot}
//                 onChange={(e) =>
//                   setNewBooking({ ...newBooking, slot: e.target.value })
//                 }
//                 className="select w-full border border-gray-300 rounded px-3 py-2"
//                 required
//               >
//                 <option value="morning">Morning (8:00 AM - 12:00 PM)</option>
//                 <option value="evening">Evening (2:00 PM - 6:00 PM)</option>
//               </select>
//               <input
//                 type="date"
//                 value={newBooking.date}
//                 onChange={(e) =>
//                   setNewBooking({ ...newBooking, date: e.target.value })
//                 }
//                 className="input w-full border border-gray-300 rounded px-3 py-2"
//                 min={new Date().toISOString().split("T")[0]}
//                 required
//               />
//               <div className="flex gap-4">
//                 <button
//                   type="submit"
//                   className="btn bg-orange-500 text-white px-6"
//                 >
//                   Book Slot
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setShowBookingForm(false)}
//                   className="btn bg-gray-500 text-white px-6"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       <div className="space-y-4">
//         {bookings.map((booking) => (
//           <div
//             key={booking._id}
//             className="border border-gray-200 rounded-lg p-4"
//           >
//             <div className="flex items-center justify-between">
//               <div>
//                 <div className="font-medium text-gray-800 capitalize">
//                   {booking.slot} Slot
//                 </div>
//                 <div className="text-gray-600">
//                   {new Date(booking.date).toLocaleDateString()}
//                 </div>
//               </div>
//               <span
//                 className={`px-2 py-1 rounded text-sm ${
//                   booking.status === "collected"
//                     ? "bg-green-100 text-green-800"
//                     : "bg-yellow-100 text-yellow-800"
//                 }`}
//               >
//                 {booking.status.charAt(0).toUpperCase() +
//                   booking.status.slice(1)}
//               </span>
//             </div>
//           </div>
//         ))}
//         {bookings.length === 0 && (
//           <div className="text-center py-8 text-gray-500">
//             No laundry bookings found
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default StudentLaundary;

import { useState, useEffect } from "react";
import { getMyLaundryBookings, bookLaundrySlot, getStudents } from "../lib/api";
import { useAuthUser } from "../hooks/useAuth";

export default function StudentLaundary() {
  const { data: user } = useAuthUser();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [studentId, setStudentId] = useState(null);
  const [newBooking, setNewBooking] = useState({
    slot: "morning",
    date: "",
  });

  useEffect(() => {
    fetchStudentId();
    fetchBookings();
  }, [user]);

  const fetchStudentId = async () => {
    if (!user?.email) return;
    try {
      const students = await getStudents();
      const currentStudent = students?.find((s) => s.email === user.email);
      if (currentStudent) {
        setStudentId(currentStudent._id);
      }
    } catch (error) {
      console.error("Error fetching student ID:", error);
    }
  };

  const fetchBookings = async () => {
    try {
      const response = await getMyLaundryBookings();
      setBookings(response.data || []);
    } catch (error) {
      console.error("Error fetching laundry bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookSlot = async (e) => {
    e.preventDefault();
    if (!studentId) {
      alert("Student ID not found. Please try again.");
      return;
    }
    try {
      await bookLaundrySlot({ ...newBooking, studentId });
      setNewBooking({ slot: "morning", date: "" });
      setShowBookingForm(false);
      fetchBookings();
    } catch (error) {
      console.error("Error booking laundry slot:", error);
      alert(error?.response?.data?.message || "Error booking slot");
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-gray-800 font-semibold text-xl">
          Laundry Services
        </h3>
        <button
          onClick={() => setShowBookingForm(true)}
          className="btn bg-orange-500 hover:bg-orange-600 text-white border-none rounded-lg px-6"
        >
          Book Slot
        </button>
      </div>

      {/* Booking Form Modal */}
      {showBookingForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Book Laundry Slot</h3>
            <form onSubmit={handleBookSlot} className="space-y-4">
              <select
                value={newBooking.slot}
                onChange={(e) =>
                  setNewBooking({ ...newBooking, slot: e.target.value })
                }
                className="select w-full border border-gray-300 rounded px-3 py-2"
                required
              >
                <option value="morning">Morning (8:00 AM - 12:00 PM)</option>
                <option value="evening">Evening (2:00 PM - 6:00 PM)</option>
              </select>
              <input
                type="date"
                value={newBooking.date}
                onChange={(e) =>
                  setNewBooking({ ...newBooking, date: e.target.value })
                }
                className="input w-full border border-gray-300 rounded px-3 py-2"
                min={new Date().toISOString().split("T")[0]}
                required
              />
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="btn bg-orange-500 text-white px-6"
                >
                  Book Slot
                </button>
                <button
                  type="button"
                  onClick={() => setShowBookingForm(false)}
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
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="border border-gray-200 rounded-lg p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-800 capitalize">
                  {booking.slot} Slot
                </div>
                <div className="text-gray-600">
                  {new Date(booking.date).toLocaleDateString()}
                </div>
              </div>
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
            </div>
          </div>
        ))}
        {bookings.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No laundry bookings found
          </div>
        )}
      </div>
    </div>
  );
}
