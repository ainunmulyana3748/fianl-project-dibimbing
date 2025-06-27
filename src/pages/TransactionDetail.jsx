import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import TransactionDetailComponent from "@/components/Transaction/TransactionDetailComponent";
import React from "react";

const TransactionDetail = () => {
  return (
    <>
      <Navbar />
      <TransactionDetailComponent />
      <Footer />
    </>
  );
};

export default TransactionDetail;
