import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import TransactionComponent from "@/components/Transaction/TransactionComponent";
import React from "react";

const Transaction = () => {
  return (
    <>
      <Navbar />
      <div className="py-32 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 ">
        <TransactionComponent />
      </div>
      <Footer />
    </>
  );
};

export default Transaction;
