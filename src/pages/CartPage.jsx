import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import CartComponent from "@/components/CartFeature/CartComponents";

const CartPage = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen w-full flex justify-center items-center">
        <CartComponent />
      </div>
      <Footer />
    </>
  );
};

export default CartPage;
