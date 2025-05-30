import { useNavigate } from "react-router-dom";
import { Mail, Lock, Phone, Eye, EyeOff, User } from "lucide-react";
import { usePasswordVisibility } from "../../context/PasswordVisibilityContext";
import { useAuthRegister } from "../../hooks/useAuthRegister";

import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const RegisterForm = () => {
  const {
    name,
    setName,
    email,
    setEmail,
    password,
    passwordRepeat,
    numberPhone,
    errorPassword,
    role,
    setRole,
    setNumberPhone,
    handleRegister,
    handlePasswordChange,
    handlePasswordRepeatChange,
    errorPasswordRepeat,
    errorSamePassword,
    success,
    error,
    loading,
  } = useAuthRegister();

  const {
    showPassword,
    togglePasswordVisibility,
    showPasswordRepeat,
    togglePasswordRepeatVisibility,
  } = usePasswordVisibility();

  const navigate = useNavigate();

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
        {/* Name */}
        <div data-aos="fade-up" data-aos-delay="200">
          <label className="text-sm font-semibold text-gray-700">Name</label>
          <div className="relative mt-1">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Your full name"
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-10 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
        </div>
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
        {/* Passwords and Password Repeat */}
        <div className="flex flex-col md:flex-row gap-5">
          {/* Password */}
          <div className="w-full" data-aos="fade-up" data-aos-delay="400">
            <label className="text-sm font-semibold text-gray-700">
              Password
            </label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                minLength={6}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                onChange={(e) => handlePasswordChange(e.target.value)}
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
            {errorPassword && (
              <p className="text-red-500 text-sm mt-1">{errorPassword}</p>
            )}
          </div>

          {/* Password Repeat */}
          <div className="w-full" data-aos="fade-up" data-aos-delay="500">
            <label className="text-sm font-semibold text-gray-700">
              Password Repeat
            </label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                minLength={6}
                type={showPasswordRepeat ? "text" : "password"}
                placeholder="••••••••"
                onChange={(e) => handlePasswordRepeatChange(e.target.value)}
                className="w-full pl-10 pr-10 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <button
                type="button"
                onClick={togglePasswordRepeatVisibility}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {showPasswordRepeat ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errorPasswordRepeat && (
              <p className="text-red-500 text-sm mt-1">{errorPassword}</p>
            )}
            {errorSamePassword && (
              <p className="text-red-500 text-sm mt-1">{errorSamePassword}</p>
            )}
          </div>
        </div>
        {/* Phone Number */}
        <div data-aos="fade-up" data-aos-delay="600">
          <label className="text-sm font-semibold text-gray-700">
            Phone Number
          </label>
          <div className="relative mt-1">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="+62-813-1452-5534"
              onChange={(e) => setNumberPhone(e.target.value)}
              className="w-full pl-10 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
        </div>
        {/* Input Role */}
        <div
          className="flex gap-4 mt-4 w-full"
          data-aos="zoom-in"
          data-aos-delay="700"
        >
          {/* User Button */}
          <button
            type="button"
            onClick={() => setRole("user")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl border  w-full
          ${
            role === "user"
              ? "bg-orange-300 border-orange-500 text-orange-700"
              : "bg-orange-200 border-orange-200 text-orange-500"
          }`}
          >
            <User size={16} />
            User
          </button>

          {/* Admin Button */}
          <button
            type="button"
            onClick={() => setRole("admin")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl border w-full
          ${
            role === "admin"
              ? "bg-orange-300 border-orange-500 text-orange-700"
              : "bg-orange-200 border-orange-200 text-orange-500"
          }`}
          >
            <User size={16} />
            Admin
          </button>
        </div>
        {/* Submit Button */}
        <div data-aos="zoom-in" data-aos-delay="700">
          <button
            onClick={handleRegister}
            className={`w-full text-white font-semibold py-3 rounded-lg transition  ${
              !name || !email || !password || !passwordRepeat || !numberPhone
                ? "bg-orange-300 cursor-not-allowed"
                : "bg-orange-400 hover:bg-orange-500"
            }`}
            disabled={
              !name || !email || !password || !passwordRepeat || !numberPhone
            }
          >
            {loading ? "loading..." : "Register"}
          </button>
        </div>{" "}
      </form>

      <p className="text-sm text-center mt-4 text-gray-600">
        You have an account ?{" "}
        <button
          className="text-orange-500 hover:underline"
          onClick={() => navigate("/Login")}
        >
          Login
        </button>
      </p>
    </div>
  );
};

export default RegisterForm;
