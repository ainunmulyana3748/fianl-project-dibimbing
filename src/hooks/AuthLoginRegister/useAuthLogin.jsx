import axios from "axios";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const useAuthLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleAuthLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = { email, password };
    const apiKey = "24405e01-fbc1-45a5-9f5a-be13afcd757c";

    try {
      const response = await axios.post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/login",
        payload,
        {
          headers: {
            apiKey: apiKey,
          },
        }
      );

      setSuccess("Login Success");
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.data.role);

      // Ambil query redirect dari URL
      const params = new URLSearchParams(location.search);
      const redirectPath = params.get("redirect") || "/";

      // Redirect setelah login
      setTimeout(() => {
        navigate(redirectPath, { replace: true });
      }, 1500);
      setError("");
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
      setSuccess("");
    } finally {
      setLoading(false);
    }
  };

  return {
    handleAuthLogin,
    email,
    setEmail,
    password,
    setPassword,
    success,
    error,
    loading,
  };
};
