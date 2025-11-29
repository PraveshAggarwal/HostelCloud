import { useState, useEffect } from "react";
import { getStudents, createStudent, deleteStudent } from "../lib/api";
export default function StudentManagement() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newStudent, setNewStudent] = useState({
    rollNo: "",
    name: "",
    email: "",
    phone: "",
    roomNo: "",
    batch: "",
    parentName: "",
    parentContact: "",
    motherName: "",
    motherContact: "",
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await getStudents();
      setStudents(response || []);
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    try {
      await createStudent(newStudent);
      setNewStudent({
        rollNo: "",
        name: "",
        email: "",
        phone: "",
        roomNo: "",
        batch: "",
        parentName: "",
        parentContact: "",
        motherName: "",
        motherContact: "",
      });
      setShowAddForm(false);
      fetchStudents();
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  const handleDeleteStudent = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await deleteStudent(id);
        fetchStudents();
      } catch (error) {
        console.error("Error deleting student:", error);
      }
    }
  };

  const filteredStudents = students.filter(
    (student) =>
      student.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.rollNo?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div className="text-center py-8">Loading students...</div>;
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-gray-800 font-semibold text-xl">
          Student Management
        </h3>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search by Roll No. or Name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            🔍
          </span>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="btn bg-orange-500 hover:bg-orange-600 text-white border-none rounded-lg px-6"
        >
          Add New Student
        </button>
      </div>

      {/* Add Student Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold mb-4">Add New Student</h3>
            <form onSubmit={handleAddStudent} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Roll Number"
                  value={newStudent.rollNo}
                  onChange={(e) =>
                    setNewStudent({ ...newStudent, rollNo: e.target.value })
                  }
                  className="input border border-gray-300 rounded px-3 py-2"
                  required
                />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={newStudent.name}
                  onChange={(e) =>
                    setNewStudent({ ...newStudent, name: e.target.value })
                  }
                  className="input border border-gray-300 rounded px-3 py-2"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={newStudent.email}
                  onChange={(e) =>
                    setNewStudent({ ...newStudent, email: e.target.value })
                  }
                  className="input border border-gray-300 rounded px-3 py-2"
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  value={newStudent.phone}
                  onChange={(e) =>
                    setNewStudent({ ...newStudent, phone: e.target.value })
                  }
                  className="input border border-gray-300 rounded px-3 py-2"
                  required
                />
                <input
                  type="text"
                  placeholder="Room Number"
                  value={newStudent.roomNo}
                  onChange={(e) =>
                    setNewStudent({ ...newStudent, roomNo: e.target.value })
                  }
                  className="input border border-gray-300 rounded px-3 py-2"
                  required
                />
                <input
                  type="text"
                  placeholder="Batch"
                  value={newStudent.batch}
                  onChange={(e) =>
                    setNewStudent({ ...newStudent, batch: e.target.value })
                  }
                  className="input border border-gray-300 rounded px-3 py-2"
                  required
                />
                <input
                  type="text"
                  placeholder="Parent Name"
                  value={newStudent.parentName}
                  onChange={(e) =>
                    setNewStudent({ ...newStudent, parentName: e.target.value })
                  }
                  className="input border border-gray-300 rounded px-3 py-2"
                  required
                />
                <input
                  type="tel"
                  placeholder="Parent Contact"
                  value={newStudent.parentContact}
                  onChange={(e) =>
                    setNewStudent({
                      ...newStudent,
                      parentContact: e.target.value,
                    })
                  }
                  className="input border border-gray-300 rounded px-3 py-2"
                  required
                />
                <input
                  type="text"
                  placeholder="Mother Name"
                  value={newStudent.motherName}
                  onChange={(e) =>
                    setNewStudent({ ...newStudent, motherName: e.target.value })
                  }
                  className="input border border-gray-300 rounded px-3 py-2"
                  required
                />
                <input
                  type="tel"
                  placeholder="Mother Contact"
                  value={newStudent.motherContact}
                  onChange={(e) =>
                    setNewStudent({
                      ...newStudent,
                      motherContact: e.target.value,
                    })
                  }
                  className="input border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="btn bg-orange-500 text-white px-6"
                >
                  Add Student
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

      {/* Students Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-gray-600 font-semibold">
                Name
              </th>
              <th className="text-left py-3 px-4 text-gray-600 font-semibold">
                Roll No.
              </th>
              <th className="text-left py-3 px-4 text-gray-600 font-semibold">
                Room
              </th>
              <th className="text-left py-3 px-4 text-gray-600 font-semibold">
                Batch
              </th>
              <th className="text-left py-3 px-4 text-gray-600 font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr
                key={student._id}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="py-3 px-4">
                  <div className="text-gray-700">{student.name}</div>
                  <div className="text-sm text-gray-500">{student.email}</div>
                </td>
                <td className="py-3 px-4">
                  <div className="text-gray-700">{student.rollNo}</div>
                </td>
                <td className="py-3 px-4">
                  <div className="text-gray-600">{student.roomNo}</div>
                </td>
                <td className="py-3 px-4">
                  <div className="text-gray-600">{student.batch}</div>
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => handleDeleteStudent(student._id)}
                    className="btn btn-sm bg-red-500 hover:bg-red-600 text-white border-none rounded-lg w-10 h-10 p-0"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredStudents.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No students found
          </div>
        )}
      </div>
    </div>
  );
}
