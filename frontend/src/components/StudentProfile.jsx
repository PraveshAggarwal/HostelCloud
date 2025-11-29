import { useState, useEffect } from "react";
import { useAuthUser } from "../hooks/useAuth";
import { getStudents, updateStudent } from "../lib/api";

export default function StudentProfile() {
  const { data: user, isLoading: isUserLoading } = useAuthUser();
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    roomNo: "",
    batch: "",
    parentName: "",
    parentContact: "",
    motherName: "",
    motherContact: "",
    photo: "",
  });

  useEffect(() => {
    if (!isUserLoading && user) {
      fetchStudentData();
    } else if (!isUserLoading && !user) {
      setLoading(false);
    }
  }, [user, isUserLoading]);

  const fetchStudentData = async () => {
    try {
      console.log("Fetching student data for user:", user);
      const response = await getStudents();
      console.log("Students response:", response);
      const currentStudent = response?.find((s) => s.email === user?.email);
      console.log("Current student found:", currentStudent);
      if (currentStudent) {
        setStudentData(currentStudent);
        setFormData({
          name: currentStudent.name || "",
          email: currentStudent.email || "",
          phone: currentStudent.phone || "",
          roomNo: currentStudent.roomNo || "",
          batch: currentStudent.batch || "",
          parentName: currentStudent.parentName || "",
          parentContact: currentStudent.parentContact || "",
          motherName: currentStudent.motherName || "",
          motherContact: currentStudent.motherContact || "",
          photo: currentStudent.photo || "",
        });
      }
    } catch (error) {
      console.error("Error fetching student data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      if (studentData?._id) {
        await updateStudent(studentData._id, formData);
        setStudentData({ ...studentData, ...formData });
        setEditing(false);
        alert("Profile updated successfully!");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile: " + (error.message || "Unknown error"));
    }
  };

  const handleCancel = () => {
    setFormData({
      name: studentData?.name || "",
      email: studentData?.email || "",
      phone: studentData?.phone || "",
      roomNo: studentData?.roomNo || "",
      batch: studentData?.batch || "",
      parentName: studentData?.parentName || "",
      parentContact: studentData?.parentContact || "",
      motherName: studentData?.motherName || "",
      motherContact: studentData?.motherContact || "",
      photo: studentData?.photo || "",
    });
    setEditing(false);
  };

  if (loading || isUserLoading)
    return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-gray-800 font-semibold text-xl">My Profile</h3>
        {!editing ? (
          <button
            onClick={() => setEditing(true)}
            className="btn bg-orange-500 hover:bg-orange-600 text-white border-none rounded-lg px-6"
          >
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="btn bg-green-500 hover:bg-green-600 text-white border-none rounded-lg px-4"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="btn bg-gray-500 hover:bg-gray-600 text-white border-none rounded-lg px-4"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Profile Photo Section */}
      <div className="flex justify-center mb-6">
        <div className="relative">
          <img
            src={
              editing
                ? formData.photo ||
                  "https://randomuser.me/api/portraits/men/32.jpg"
                : studentData?.photo ||
                  "https://randomuser.me/api/portraits/men/32.jpg"
            }
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-orange-400 object-cover"
          />
          {editing && (
            <div className="mt-2">
              <input
                type="url"
                placeholder="Photo URL"
                value={formData.photo}
                onChange={(e) =>
                  setFormData({ ...formData, photo: e.target.value })
                }
                className="input w-full border border-gray-300 rounded px-3 py-2 text-sm"
              />
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-600 mb-2">Name</label>
          {editing ? (
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="input w-full border border-gray-300 rounded px-3 py-2"
            />
          ) : (
            <div className="text-gray-800 font-medium">
              {studentData?.name || "N/A"}
            </div>
          )}
        </div>

        <div>
          <label className="block text-gray-600 mb-2">Roll Number</label>
          <div className="text-gray-800 font-medium">
            {studentData?.rollNo || user?.rollNo || "N/A"}
          </div>
        </div>

        <div>
          <label className="block text-gray-600 mb-2">Email</label>
          {editing ? (
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="input w-full border border-gray-300 rounded px-3 py-2"
            />
          ) : (
            <div className="text-gray-800 font-medium">
              {studentData?.email || user?.email}
            </div>
          )}
        </div>

        <div>
          <label className="block text-gray-600 mb-2">Phone</label>
          {editing ? (
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="input w-full border border-gray-300 rounded px-3 py-2"
            />
          ) : (
            <div className="text-gray-800 font-medium">
              {studentData?.phone || "N/A"}
            </div>
          )}
        </div>

        <div>
          <label className="block text-gray-600 mb-2">Room Number</label>
          {editing ? (
            <input
              type="text"
              value={formData.roomNo}
              onChange={(e) =>
                setFormData({ ...formData, roomNo: e.target.value })
              }
              className="input w-full border border-gray-300 rounded px-3 py-2"
            />
          ) : (
            <div className="text-gray-800 font-medium">
              {studentData?.roomNo || "N/A"}
            </div>
          )}
        </div>

        <div>
          <label className="block text-gray-600 mb-2">Batch</label>
          {editing ? (
            <input
              type="text"
              value={formData.batch}
              onChange={(e) =>
                setFormData({ ...formData, batch: e.target.value })
              }
              className="input w-full border border-gray-300 rounded px-3 py-2"
            />
          ) : (
            <div className="text-gray-800 font-medium">
              {studentData?.batch || "N/A"}
            </div>
          )}
        </div>

        <div>
          <label className="block text-gray-600 mb-2">Parent Name</label>
          {editing ? (
            <input
              type="text"
              value={formData.parentName}
              onChange={(e) =>
                setFormData({ ...formData, parentName: e.target.value })
              }
              className="input w-full border border-gray-300 rounded px-3 py-2"
            />
          ) : (
            <div className="text-gray-800 font-medium">
              {studentData?.parentName || "N/A"}
            </div>
          )}
        </div>

        <div>
          <label className="block text-gray-600 mb-2">Parent Contact</label>
          {editing ? (
            <input
              type="tel"
              value={formData.parentContact}
              onChange={(e) =>
                setFormData({ ...formData, parentContact: e.target.value })
              }
              className="input w-full border border-gray-300 rounded px-3 py-2"
            />
          ) : (
            <div className="text-gray-800 font-medium">
              {studentData?.parentContact || "N/A"}
            </div>
          )}
        </div>

        <div>
          <label className="block text-gray-600 mb-2">Mother Name</label>
          {editing ? (
            <input
              type="text"
              value={formData.motherName}
              onChange={(e) =>
                setFormData({ ...formData, motherName: e.target.value })
              }
              className="input w-full border border-gray-300 rounded px-3 py-2"
            />
          ) : (
            <div className="text-gray-800 font-medium">
              {studentData?.motherName || "N/A"}
            </div>
          )}
        </div>

        <div>
          <label className="block text-gray-600 mb-2">Mother Contact</label>
          {editing ? (
            <input
              type="tel"
              value={formData.motherContact}
              onChange={(e) =>
                setFormData({ ...formData, motherContact: e.target.value })
              }
              className="input w-full border border-gray-300 rounded px-3 py-2"
            />
          ) : (
            <div className="text-gray-800 font-medium">
              {studentData?.motherContact || "N/A"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
