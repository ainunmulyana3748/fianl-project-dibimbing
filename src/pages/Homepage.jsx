import FirstSection from "../components/HomePage/FirstSection";
import SecondSection from "../components/HomePage/SecondSection";
import ThirdSection from "../components/HomePage/ThirdSection";
import FourthSection from "../components/HomePage/FourthSection";
import FifthSection from "../components/HomePage/FifthSection";
import SixthSection from "../components/HomePage/SixthSection";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Homepage = () => {
  return (
    <div className="flex flex-col gap-10">
      <Navbar />
      <FirstSection />
      <SecondSection />
      <ThirdSection />
      <FourthSection />
      <FifthSection />
      <SixthSection />
      <Footer />
    </div>
  );
};

export default Homepage;
