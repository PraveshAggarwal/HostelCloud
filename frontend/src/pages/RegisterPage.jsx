import { useState } from "react";
import { House } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useRegister } from "../hooks/useAuth";

export const RegisterPage = () => {
  const [formData, setFormData] = useState({
    rollNo: "",
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    roomNo: "",
    batch: "",
    parentName: "",
    parentContact: "",
    motherName: "",
    motherContact: "",
    role: "student",
  });

  const navigate = useNavigate();

  // React Query register hook
  const { register, isPending, error: registerError } = useRegister();

  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Prepare final data (remove confirmPassword)
    const { confirmPassword, ...registerData } = formData;
    const payload = registerData;

    // Call React Query mutation
    register(payload, {
      onSuccess: () => {
        setSuccess("Registration successful! Redirecting...");
        setTimeout(() => navigate("/"), 1500);
      },
      onError: () => {
        alert("Registration failed!");
      },
    });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-4 py-12 overflow-y-scroll scrollbar-hide"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=1600')",
      }}
    >
      {/* Signup Card */}
      <div className="bg-slate-700 rounded-3xl p-8 w-full max-w-2xl shadow-2xl">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <House size={50} className="text-red-500" />
          </div>
          <h1 className="text-white text-2xl font-bold">
            HOSTEL <span className="text-orange-400">CLOUD</span>
          </h1>
        </div>

        <h2 className="text-white text-3xl font-bold text-center mb-6">
          Create Account
        </h2>

        {/* Error */}
        {registerError && (
          <div className="bg-red-100 text-red-700 px-4 py-3 rounded mb-4">
            {registerError.message || "Registration failed"}
          </div>
        )}

        {/* Success */}
        {success && (
          <div className="bg-green-100 text-green-700 px-4 py-3 rounded mb-4">
            {success}
          </div>
        )}

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formData.role === "student" && (
              <input
                type="text"
                name="rollNo"
                placeholder="Roll Number *"
                value={formData.rollNo}
                onChange={handleChange}
                className="input w-full bg-white text-gray-700 rounded-xl px-4 py-3"
              />
            )}

            <input
              type="text"
              name="name"
              placeholder="Full Name *"
              value={formData.name}
              onChange={handleChange}
              className="input w-full bg-white text-gray-700 rounded-xl px-4 py-3"
            />

            <input
              type="email"
              name="email"
              placeholder="Email *"
              value={formData.email}
              onChange={handleChange}
              className="input w-full bg-white text-gray-700 rounded-xl px-4 py-3"
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number *"
              value={formData.phone}
              onChange={handleChange}
              className="input w-full bg-white text-gray-700 rounded-xl px-4 py-3"
            />

            <input
              type="password"
              name="password"
              placeholder="Password *"
              value={formData.password}
              onChange={handleChange}
              className="input w-full bg-white text-gray-700 rounded-xl px-4 py-3"
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password *"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="input w-full bg-white text-gray-700 rounded-xl px-4 py-3"
            />

            {formData.role === "student" && (
              <>
                <input
                  type="text"
                  name="roomNo"
                  placeholder="Room Number *"
                  value={formData.roomNo}
                  onChange={handleChange}
                  className="input w-full bg-white text-gray-700 rounded-xl px-4 py-3"
                />

                <input
                  type="text"
                  name="batch"
                  placeholder="Batch (e.g., 2024) *"
                  value={formData.batch}
                  onChange={handleChange}
                  className="input w-full bg-white text-gray-700 rounded-xl px-4 py-3"
                />
              </>
            )}

            {/* Role */}
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="select w-full bg-white text-gray-700 rounded-xl px-4 py-3"
            >
              <option value="student">Student</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Parent Section */}
          {formData.role === "student" && (
            <div className="pt-4">
              <h3 className="text-white text-lg font-semibold mb-3">
                Parent/Guardian Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="parentName"
                  placeholder="Father's Name *"
                  value={formData.parentName}
                  onChange={handleChange}
                  className="input w-full bg-white text-gray-700 rounded-xl px-4 py-3"
                />

                <input
                  type="tel"
                  name="parentContact"
                  placeholder="Father's Contact *"
                  value={formData.parentContact}
                  onChange={handleChange}
                  className="input w-full bg-white text-gray-700 rounded-xl px-4 py-3"
                />

                <input
                  type="text"
                  name="motherName"
                  placeholder="Mother's Name *"
                  value={formData.motherName}
                  onChange={handleChange}
                  className="input w-full bg-white text-gray-700 rounded-xl px-4 py-3"
                />

                <input
                  type="tel"
                  name="motherContact"
                  placeholder="Mother's Contact *"
                  value={formData.motherContact}
                  onChange={handleChange}
                  className="input w-full bg-white text-gray-700 rounded-xl px-4 py-3"
                />
              </div>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isPending}
            className="btn w-full bg-orange-500 hover:bg-orange-600 text-white rounded-full py-3 mt-6 disabled:opacity-50"
          >
            {isPending ? "CREATING ACCOUNT..." : "SIGN UP"}
          </button>

          <div className="text-center text-white text-sm pt-2">
            Already have an account?{" "}
            <Link
              to="/"
              className="text-orange-400 hover:text-orange-300 font-semibold"
            >
              Login
            </Link>
          </div>
        </form>
      </div>

      <div className="fixed bottom-8 right-8 text-6xl opacity-50">✨</div>
    </div>
  );
};
