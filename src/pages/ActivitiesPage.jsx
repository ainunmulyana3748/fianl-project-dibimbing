import ActivitiesComponent from "@/components/ActivitiesFeature/ActivitiesComponent";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";

const ActivitiesPage = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto min-h-screen py-32 flex flex-col items-center justify-center gap-8">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <h1 className="text-orange-400 text-4xl font-bold">
            Explore Our Activities and Deal with the Destination
          </h1>
          <p className="text-gray-500 text-lg">
            Discover our latest special offers, promotions, and featured
            experiences
          </p>
        </div>
        <ActivitiesComponent />
      </div>
      <Footer />
    </>
  );
};

export default ActivitiesPage;
