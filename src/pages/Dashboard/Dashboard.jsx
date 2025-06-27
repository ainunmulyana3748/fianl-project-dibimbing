import DashboardComponents from "@/components/Dashboard/DashboardComponents";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";

const DashboardHome = () => {
  return (
    <>
      <Navbar />
      <DashboardComponents />
      <Footer />
    </>
  );
};

export default DashboardHome;
