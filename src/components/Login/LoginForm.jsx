import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { usePasswordVisibility } from "../../context/PasswordVisibilityContext";

import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { useAuthLogin } from "@/hooks/AuthLoginRegister/useAuthLogin";

const LoginForm = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    success,
    error,
    handleAuthLogin,
    loading,
  } = useAuthLogin();

  const { showPassword, togglePasswordVisibility } = usePasswordVisibility();

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <div className="w-full md:w-1/2" data-aos="fade-up">
      <h1 className="text-3xl font-bold text-orange-500 text-center mb-6">
        Welcome Back 👋
      </h1>

      {success && (
        <div className="text-center mb-4 w-full text-green-800 bg-green-100 border border-green-300 rounded-md p-3 text-sm">
          {success}
        </div>
      )}
      {error && (
        <div className="text-center mb-4 w-full text-red-800 bg-red-100 border border-red-300 rounded-md p-3 text-sm">
          {error}
        </div>
      )}

      <form className="space-y-5" data-aos="fade-up" data-aos-delay="100">
        {/* Email */}
        <div data-aos="fade-up" data-aos-delay="300">
          <label className="text-sm font-semibold text-gray-700">Email</label>
          <div className="relative mt-1">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              placeholder="you@example.com"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
        </div>

        {/* Password */}
        <div data-aos="fade-up" data-aos-delay="400">
          <label className="text-sm font-semibold text-gray-700">
            Password
          </label>
          <div className="relative mt-1">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              minLength={6}
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-10 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* Button Login */}
        <div data-aos="zoom-in" data-aos-delay="700">
          <button
            onClick={handleAuthLogin}
            className={`w-full text-white font-semibold py-3 rounded-lg transition ${
              !email || !password
                ? "bg-orange-300 cursor-not-allowed"
                : "bg-orange-400 hover:bg-orange-500"
            }`}
            disabled={!email || !password}
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </div>
      </form>
      <p
        className="text-sm text-center mt-4 text-gray-600"
        data-aos="fade-up"
        data-aos-delay="800"
      >
        Don't have an account?{" "}
        <Link to={"/register"} className="text-orange-500 hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
