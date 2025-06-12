import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useAuthRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [numberPhone, setNumberPhone] = useState("");
  const [role, setRole] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorPasswordRepeat, setErrorPasswordRepeat] = useState("");
  const [errorSamePassword, setErrorSamePassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const imgIcon =
    "https://static.vecteezy.com/system/resources/thumbnails/000/439/863/small/Basic_Ui__28186_29.jpg";

  // for checking long password
  const handlePasswordChange = (value) => {
    setPassword(value);
    if (value.length < 6) {
      setErrorPassword("Password must be at least 6 characters long");
    } else if (value.length < 1) {
      setErrorPassword("");
    } else {
      setErrorPassword("");
    }
  };

  // for checking long password and same password
  const handlePasswordRepeatChange = (value) => {
    setPasswordRepeat(value);
    if (value.length < 6) {
      setErrorPasswordRepeat("Password must be at least 6 characters long");
    } else if (value.length < 1) {
      setErrorPasswordRepeat("");
    } else {
      setErrorPasswordRepeat("");
    }

    if (value !== password) {
      setErrorSamePassword("Repeat Password Not Same");
    } else {
      setErrorSamePassword("");
    }
  };

  // for handle register button
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name: name,
      email: email,
      password: password,
      passwordRepeat: passwordRepeat,
      numberPhone: numberPhone,
      role: role,
      image: imgIcon,
    };

    try {
      const response = await axios.post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/register",
        payload,
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );

      setSuccess(response.data.message);
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      setError("Register Failed");
    } finally {
      setLoading(false);
    }
  };
  return {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    passwordRepeat,
    setPasswordRepeat,
    numberPhone,
    errorPassword,
    setErrorPassword,
    role,
    setRole,
    setNumberPhone,
    handleRegister,
    handlePasswordChange,
    handlePasswordRepeatChange,
    errorPasswordRepeat,
    errorSamePassword,
    success,
    setSuccess,
    error,
    setError,
    loading,
  };
};
