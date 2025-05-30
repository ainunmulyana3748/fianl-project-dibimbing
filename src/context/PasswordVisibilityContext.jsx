import { createContext, useContext, useState } from "react";

const PasswordVisibilityContext = createContext();

export const PasswordVisibilityProvider = ({ children }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const togglePasswordRepeatVisibility = () =>
    setShowPasswordRepeat((prev) => !prev);

  return (
    <PasswordVisibilityContext.Provider
      value={{
        showPassword,
        showPasswordRepeat,
        togglePasswordVisibility,
        togglePasswordRepeatVisibility,
      }}
    >
      {children}
    </PasswordVisibilityContext.Provider>
  );
};

export const usePasswordVisibility = () =>
  useContext(PasswordVisibilityContext);
