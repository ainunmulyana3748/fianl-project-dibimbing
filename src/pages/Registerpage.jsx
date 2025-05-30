import bgImg from "../assets/RegisterPage/bgImg.jpg";
import AuthRegisterLayout from "../components/Register/AuthRegisterLayout";

const Registerpage = () => {
  return (
    <div
      className="w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <AuthRegisterLayout />
    </div>
  );
};

export default Registerpage;
