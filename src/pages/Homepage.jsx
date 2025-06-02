import FirstSection from "../components/HomePage/FirstSection";
import SecondSection from "../components/HomePage/SecondSection";
import ThirdSection from "../components/HomePage/ThirdSection";
import Navbar from "../components/Navbar";

const Homepage = () => {
  return (
    <div className="flex flex-col gap-10">
      <Navbar />
      <FirstSection />
      <SecondSection />
      <ThirdSection />
    </div>
  );
};

export default Homepage;
