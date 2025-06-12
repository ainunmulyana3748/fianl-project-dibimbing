import BannerDetailComponent from "@/components/BannerFeature/BannerDetailComponent";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const BannerDetailPage = () => {
  return (
    <>
      <Navbar />
      <div>
        <BannerDetailComponent />
      </div>
      <Footer />
    </>
  );
};

export default BannerDetailPage;
