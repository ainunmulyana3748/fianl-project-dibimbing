import tourist from "../../assets/LoginPage/tourist.png";
import { PasswordVisibilityProvider } from "../../context/PasswordVisibilityContext";
import LoginForm from "./LoginForm";

import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const AuthLoginLayout = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <PasswordVisibilityProvider>
      <div className="min-h-screen w-full flex justify-center items-center backdrop-brightness-75 px-4">
        <div className="w-full max-w-4xl flex flex-col md:flex-row items-center justify-between bg-white/90 backdrop-blur-md shadow-2xl p-10 rounded-3xl gap-10">
          <LoginForm />
          <div
            className="hidden md:block w-full md:w-7/12"
            data-aos="fade-up"
            data-aos-delay="800"
          >
            <img
              src={tourist}
              alt="Tourist illustration"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </PasswordVisibilityProvider>
  );
};

export default AuthLoginLayout;
