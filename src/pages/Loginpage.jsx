import bgImg from "../assets/LoginPage/bgImg.jpg";
import AuthLoginLayout from "../components/Login/AuthLoginLayout";

const Loginpage = () => {
  return (
    <div
      className="w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <AuthLoginLayout />
    </div>
  );
};

export default Loginpage;
