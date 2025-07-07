import tourist from "../../assets/RegisterPage/tourist.png";
import { PasswordVisibilityProvider } from "../../context/PasswordVisibilityContext";
import RegisterForm from "./RegisterForm";

import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const AuthRegisterLayout = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <PasswordVisibilityProvider>
      <div className="min-h-screen w-full flex justify-center md:items-center overflow-auto px-4 py-8 ">
        <div className="w-full max-w-4xl flex flex-col md:flex-row items-center justify-between bg-white/90 backdrop-blur-md shadow-2xl p-10 rounded-3xl gap-10">
          <div
            className="hidden md:block w-full md:w-7/12"
            data-aos="fade-up"
            data-aos-delay="800"
          >
            <img
              src={
                "https://travel-journal-api-bootcamp.do.dibimbing.id/images/1751895064616-tourist.png"
              }
              alt="Tourist illustration"
              className="w-full h-full object-contain"
            />
          </div>
          <RegisterForm />
        </div>
      </div>
    </PasswordVisibilityProvider>
  );
};

export default AuthRegisterLayout;
