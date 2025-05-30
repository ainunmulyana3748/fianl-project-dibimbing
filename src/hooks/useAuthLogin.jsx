import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useAuthLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // for handle login button
  const handleAuthLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      email: email,
      password: password,
    };

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
      setTimeout(() => {
        navigate("/");
      }, 1500);
      setError("");
    } catch (error) {
      setError(error.response.data.message);
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
