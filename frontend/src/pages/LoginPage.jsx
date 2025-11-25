import { useState } from "react";
import { House } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useAuth"; // ✔ React Query Login Hook

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // React Query Login Hook
  const { login, isPending } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Call the React Query mutation
    login(
      { email, password },
      {
        onSuccess: (data) => {
          // EXPECTED DATA FROM BACKEND:
          // { success: true, user: { role: "admin" or "student" } }

          if (!data || !data.user) {
            setError("Invalid server response");
            return;
          }

          // Redirect based on role
          if (data.user.role === "admin") {
            navigate("/admin");
          } else {
            navigate("/student");
          }
        },

        onError: (err) => {
          setError(err?.response?.data?.message || "Login failed");
        },
      }
    );
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-4"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=1600')",
      }}
    >
      {/* Login Card */}
      <div className="bg-slate-700 rounded-3xl p-8 w-full max-w-md shadow-2xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <House size={50} className="text-red-500" />
          </div>
          <h1 className="text-white text-3xl font-bold">
            HOSTEL <span className="text-orange-400">CLOUD</span>
          </h1>
        </div>

        <h2 className="text-white text-4xl font-bold text-center mb-6">
          Welcome
        </h2>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button className="flex-1 py-3 rounded-full bg-orange-500 text-white font-semibold">
            Login
          </button>

          <Link
            to="/signup"
            className="flex-1 py-3 rounded-full bg-white text-orange-500 font-semibold text-center"
          >
            Register
          </Link>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <input
            type="text"
            placeholder="Email / Roll Number"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input w-full bg-white text-gray-700 rounded-xl pl-4 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />

          {/* Password Input */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input w-full bg-white text-gray-700 rounded-xl pl-4 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={isPending}
            className="btn w-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg rounded-full py-3 border-none disabled:opacity-50"
          >
            {isPending ? "SIGNING IN..." : "SIGN IN"}
          </button>
        </form>
      </div>

      {/* Decorative Sparkle */}
      <div className="fixed bottom-8 right-8 text-6xl opacity-50">✨</div>
    </div>
  );
}
