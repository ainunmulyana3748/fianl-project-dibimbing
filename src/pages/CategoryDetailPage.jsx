import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CategoriesDetailComponent from "@/components/CategoriesFeature/CategoriesDetailComponent";

const CategoryDetailPage = () => {
  return (
    <>
      <Navbar />
      <div>
        <CategoriesDetailComponent />
      </div>
      <Footer />
    </>
  );
};

export default CategoryDetailPage;
