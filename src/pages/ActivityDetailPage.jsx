import ActivityDetailComponent from "@/components/ActivitiesFeature/ActivityDetailComponent";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const ActivityDetailPage = () => {
  return (
    <>
      <Navbar />
      <div>
        <ActivityDetailComponent />
      </div>
      <Footer />
    </>
  );
};

export default ActivityDetailPage;
