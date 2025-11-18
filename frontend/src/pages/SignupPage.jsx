import { useState } from "react";
import { House } from "lucide-react";

export default function SignupPage() {
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
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        photo: file,
      }));
    }
  };

  const handleSubmit = () => {
    console.log("Form Data:", formData);
    // Add your signup logic here
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
        {/* Logo and Title */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <div className="text-4xl">
              <House size={50} className="text-red-500" />
            </div>
          </div>
          <h1 className="text-white text-2xl font-bold">
            HOSTEL <span className="text-orange-400">CLOUD</span>
          </h1>
        </div>

        {/* Welcome Text */}
        <h2 className="text-white text-3xl font-bold text-center mb-6">
          Create Account
        </h2>

        {/* Form Container */}
        <div className="space-y-4">
          {/* Personal Information Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Roll Number */}
            <div className="relative">
              <input
                type="text"
                name="rollNo"
                placeholder="Roll Number *"
                value={formData.rollNo}
                onChange={handleChange}
                className="input w-full bg-white text-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            {/* Full Name */}
            <div className="relative">
              <input
                type="text"
                name="name"
                placeholder="Full Name *"
                value={formData.name}
                onChange={handleChange}
                className="input w-full bg-white text-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder="Email *"
                value={formData.email}
                onChange={handleChange}
                className="input w-full bg-white text-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            {/* Phone */}
            <div className="relative">
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number *"
                value={formData.phone}
                onChange={handleChange}
                className="input w-full bg-white text-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type="password"
                name="password"
                placeholder="Password *"
                value={formData.password}
                onChange={handleChange}
                className="input w-full bg-white text-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password *"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="input w-full bg-white text-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            {/* Room Number */}
            <div className="relative">
              <input
                type="text"
                name="roomNo"
                placeholder="Room Number *"
                value={formData.roomNo}
                onChange={handleChange}
                className="input w-full bg-white text-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            {/* Batch */}
            <div className="relative">
              <input
                type="text"
                name="batch"
                placeholder="Batch (e.g., 2024) *"
                value={formData.batch}
                onChange={handleChange}
                className="input w-full bg-white text-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
          </div>

          {/* Parent/Guardian Information Section */}
          <div className="pt-4">
            <h3 className="text-white text-lg font-semibold mb-3">
              Parent/Guardian Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Father Name */}
              <div className="relative">
                <input
                  type="text"
                  name="parentName"
                  placeholder="Father's Name *"
                  value={formData.parentName}
                  onChange={handleChange}
                  className="input w-full bg-white text-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>

              {/* Father Contact */}
              <div className="relative">
                <input
                  type="tel"
                  name="parentContact"
                  placeholder="Father's Contact *"
                  value={formData.parentContact}
                  onChange={handleChange}
                  className="input w-full bg-white text-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>

              {/* Mother Name */}
              <div className="relative">
                <input
                  type="text"
                  name="motherName"
                  placeholder="Mother's Name *"
                  value={formData.motherName}
                  onChange={handleChange}
                  className="input w-full bg-white text-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>

              {/* Mother Contact */}
              <div className="relative">
                <input
                  type="tel"
                  name="motherContact"
                  placeholder="Mother's Contact *"
                  value={formData.motherContact}
                  onChange={handleChange}
                  className="input w-full bg-white text-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
            </div>
          </div>

          {/* Photo Upload */}
          <div className="pt-2">
            <label className="text-white text-sm font-semibold mb-2 block">
              Upload Photo (Optional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="file-input file-input-bordered w-full bg-white text-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Sign Up Button */}
          <button
            onClick={handleSubmit}
            className="btn w-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg rounded-full py-3 border-none mt-6"
          >
            SIGN UP
          </button>

          {/* Login Link */}
          <div className="text-center text-white text-sm pt-2">
            Already have an account?{" "}
            <a
              href="#"
              className="text-orange-400 hover:text-orange-300 font-semibold"
            >
              Login
            </a>
          </div>
        </div>
      </div>

      {/* Decorative Sparkle */}
      <div className="fixed bottom-8 right-8 text-6xl opacity-50">✨</div>
    </div>
  );
}
