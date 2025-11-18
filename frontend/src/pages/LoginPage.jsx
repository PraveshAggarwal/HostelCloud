import { useState } from "react";
import { House } from "lucide-react";
import { Link } from "react-router-dom";
export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password, rememberMe, isAdmin });
    // Add your login logic here
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
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="text-5xl">
              <House size={50} className="text-red-500" />
            </div>
          </div>
          <h1 className="text-white text-3xl font-bold">
            HOSTEL <span className="text-orange-400">CLOUD</span>
          </h1>
        </div>

        {/* Welcome Text */}
        <h2 className="text-white text-4xl font-bold text-center mb-6">
          Welcome
        </h2>

        {/* Login/Register Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-3 rounded-full font-semibold transition-all ${
              isLogin ? "bg-orange-500 text-white" : "bg-white text-orange-500"
            }`}
          >
            Login
          </button>
          <Link
            to="/signup"
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-3 rounded-full font-semibold ${
              !isLogin
                ? "bg-orange-500 text-white"
                : "bg-white text-orange-500 text-center"
            }`}
          >
            Register
          </Link>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email/Roll Number Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Email / Roll Number"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input w-full bg-white text-gray-700 rounded-xl pl-4 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input w-full bg-white text-gray-700 rounded-xl pl-4 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Remember Me & Forgot Password */}
          {/* <div className="flex items-center justify-between text-white text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="toggle toggle-sm bg-white border-white"
              />
              <span>Remember Me</span>
            </label>
            <a href="#" className="hover:text-orange-400 transition-colors">
              Forgot Password?
            </a>
          </div> */}

          {/* Sign In Button */}
          <button
            type="submit"
            className="btn w-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg rounded-full py-3 border-none"
          >
            SIGN IN
          </button>

          {/* Student/Admin Toggle */}
          <div className="flex items-center justify-center gap-3 text-white">
            <span>Student </span>
            <input
              type="checkbox"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
              className="toggle toggle-lg bg-white border-white"
            />{" "}
            <span>Admin</span>
          </div>

          {/* Sign Up Link */}
          {/* <div className="text-center text-white text-sm">
            Don't have an account?{" "}
            <a
              href="#"
              className="text-orange-400 hover:text-orange-300 font-semibold"
            >
              Sign Up
            </a>
          </div> */}
        </form>
      </div>

      {/* Decorative Sparkle */}
      <div className="fixed bottom-8 right-8 text-6xl opacity-50">✨</div>
    </div>
  );
}
