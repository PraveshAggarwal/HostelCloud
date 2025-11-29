import { useState, useEffect } from "react";
import { useAuthUser } from "../context/AuthContext";
import {
  getComplaints,
  getLeaveRequests,
  getMyComplaints,
  getMyLeaves,
  getRecentNotices,
} from "../lib/api";

export default function NotificationSystem() {
  const { user } = useAuthUser();
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (user) {
      fetchNotifications();
      const interval = setInterval(fetchNotifications, 30000); // poll every 30s
      return () => clearInterval(interval);
    }
  }, [user]);

  const fetchNotifications = async () => {
    try {
      // ADMIN
      if (user.role === "admin") {
        const [complaints, leaves] = await Promise.all([
          getComplaints(),
          getLeaveRequests(),
        ]);

        const newNotifications = [
          ...(complaints
            ?.filter((c) => c.status === "open")
            ?.map((c) => ({
              id: `complaint-${c._id}`,
              type: "complaint",
              title: "New Complaint",
              message: `${c.studentId?.name || "Student"} submitted: ${
                c.title
              }`,
              time: new Date(c.createdAt),
              read: false,
            })) || []),

          ...(leaves
            ?.filter((l) => l.status === "pending")
            ?.map((l) => ({
              id: `leave-${l._id}`,
              type: "leave",
              title: "Leave Request",
              message: `${
                l.studentId?.name || "Student"
              } requested leave from ${new Date(
                l.fromDate
              ).toLocaleDateString()}`,
              time: new Date(l.createdAt),
              read: false,
            })) || []),
        ];

        setNotifications(newNotifications.slice(0, 10));
        setUnreadCount(newNotifications.length);
      }

      // STUDENT
      else {
        const [myComplaints, myLeaves, notices] = await Promise.all([
          getMyComplaints(),
          getMyLeaves(),
          getRecentNotices(),
        ]);

        const newNotifications = [
          ...(myComplaints
            ?.filter((c) => c.status !== "open")
            ?.map((c) => ({
              id: `complaint-${c._id}`,
              type: "complaint",
              title: "Complaint Update",
              message: `Your complaint "${c.title}" is now ${c.status}`,
              time: new Date(c.updatedAt),
              read: false,
            })) || []),

          ...(myLeaves
            ?.filter((l) => l.status !== "pending")
            ?.map((l) => ({
              id: `leave-${l._id}`,
              type: "leave",
              title: "Leave Update",
              message: `Your leave request has been ${l.status}`,
              time: new Date(l.updatedAt),
              read: false,
            })) || []),

          ...(notices?.slice(0, 3)?.map((n) => ({
            id: `notice-${n._id}`,
            type: "notice",
            title: "New Notice",
            message: n.title,
            time: new Date(n.createdAt),
            read: false,
          })) || []),
        ];

        setNotifications(newNotifications.slice(0, 10));
        setUnreadCount(newNotifications.length);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    setUnreadCount((prev) => Math.max(0, prev - 1));
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "complaint":
        return "🔧";
      case "leave":
        return "📅";
      case "notice":
        return "📢";
      default:
        return "🔔";
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowNotifications(!showNotifications)}
        className="relative text-orange-500 text-2xl hover:text-orange-600 transition-colors"
      >
        🔔
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {showNotifications && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-lg border z-50 max-h-96 overflow-y-auto">
          <div className="p-4 border-b">
            <h3 className="font-semibold text-gray-800">Notifications</h3>
          </div>

          {notifications.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              No notifications
            </div>
          ) : (
            <div className="divide-y">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-gray-50 cursor-pointer ${
                    !notification.read ? "bg-blue-50" : ""
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-lg">
                      {getNotificationIcon(notification.type)}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-800 text-sm">
                        {notification.title}
                      </div>
                      <div className="text-gray-600 text-sm truncate">
                        {notification.message}
                      </div>
                      <div className="text-gray-400 text-xs mt-1">
                        {notification.time.toLocaleString()}
                      </div>
                    </div>

                    {!notification.read && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full shrink-0 mt-2"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
