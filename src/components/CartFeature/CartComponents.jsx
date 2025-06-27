import React, { useState, useEffect } from "react";
import { ArrowLeft, X } from "lucide-react";
import CardCart from "./CardCart";
import { useNavigate } from "react-router-dom";
import useGetPaymentMethod from "@/hooks/Payment/useGetPaymentMethod";
import useGetDataPromos from "@/hooks/Promos/useGetDataPromos";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import useAddTransaction from "@/hooks/Transaction/useAddTransaction";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

const CartComponent = () => {
  const navigate = useNavigate();
  const { dataCarts } = useCart();
  const { createTransaction } = useAddTransaction();

  const [promoCode, setPromoCode] = useState("");
  const [showPromoApplied, setShowPromoApplied] = useState(false);
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);
  const [promoError, setPromoError] = useState("");
  const { refetchCart } = useCart();

  const { paymentMethod } = useGetPaymentMethod();
  const { dataPromos } = useGetDataPromos();
  const [selectedMethod, setSelectedMethod] = useState("");

  useEffect(() => {
    if (paymentMethod && paymentMethod.length > 0 && !selectedMethod) {
      setSelectedMethod(paymentMethod[0].id);
    }
  }, [paymentMethod, selectedMethod]);

  useEffect(() => {
    if (promoError) {
      const timer = setTimeout(() => {
        setPromoError("");
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [promoError]);

  const handleApplyPromo = (e) => {
    e.preventDefault();

    if (!dataPromos || dataPromos.length === 0) {
      setPromoError("Data promo tidak tersedia.");
      return;
    }

    const promo = dataPromos.find(
      (p) =>
        p.promo_code.toLowerCase() === promoCode.toLowerCase() &&
        total >= p.minimum_claim_price
    );

    if (promo) {
      const discountValue = promo.promo_discount_price;
      setAppliedPromo(promo);
      setDiscount(discountValue);
      setShowPromoApplied(true);
      setPromoError("");
    } else {
      setPromoError(
        "Kode promo tidak valid atau belum memenuhi minimum transaksi."
      );
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(amount || 0);
  };

  const handleCreateTransaction = async () => {
    if (!selectedMethod) {
      toast.error("Silakan pilih metode pembayaran");
      return;
    }

    if (!dataCarts || dataCarts.length === 0) {
      toast.error("Keranjang belanja kosong");
      return;
    }

    try {
      const cartIds = dataCarts.map((cart) => cart.id);
      await createTransaction(cartIds, selectedMethod);
      toast.success("Transaksi berhasil dibuat!");
      navigate("/my-transactions");
      refetchCart();
    } catch (error) {
      console.error("Error creating transaction:", error);
      toast.error("Gagal membuat transaksi");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 w-full py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Cart items */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <button
                className="text-orange-600 font-medium flex items-center hover:underline"
                onClick={() => navigate("/activities")}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Activities
              </button>
              <h2 className="text-xl font-semibold text-orange-600"></h2>
            </div>
            <CardCart total={setTotal} />
          </div>

          {/* Summary */}
          <div className="p-6">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Promo Code Section */}
              <div className="lg:w-1/2">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Promo Code
                </h3>

                {promoError && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertTitle>Oops!</AlertTitle>
                    <AlertDescription>{promoError}</AlertDescription>
                  </Alert>
                )}

                {showPromoApplied && appliedPromo ? (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="bg-green-100 p-2 rounded-full mr-3">
                        <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                          <X size={16} className="text-white" />
                        </div>
                      </div>
                      <div>
                        <div className="font-medium text-green-800">
                          {appliedPromo.promo_code} Applied!
                        </div>
                        <div className="text-sm text-green-600">
                          Diskon sebesar{" "}
                          {formatCurrency(appliedPromo.promo_discount_price)}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setShowPromoApplied(false);
                        setDiscount(0);
                        setPromoCode("");
                        setAppliedPromo(null);
                      }}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ) : (
                  <form className="flex gap-2 mb-4" onSubmit={handleApplyPromo}>
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter promo code"
                      className="flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                    <button
                      type="submit"
                      className="bg-orange-600 hover:bg-orange-700 text-white font-medium px-6 py-3 rounded-xl transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}

                {/* Payment Method */}
                <div className="space-y-3">
                  {paymentMethod.map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-center border rounded-xl p-4 cursor-pointer transition-all ${
                        selectedMethod === method.id
                          ? "border-orange-500 bg-orange-50"
                          : "border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        className="form-radio text-blue-600 mr-4"
                        value={method.id}
                        checked={selectedMethod === method.id}
                        onChange={() => setSelectedMethod(method.id)}
                      />
                      <img
                        src={method.imageUrl}
                        alt={method.name}
                        className="object-contain w-10 h-6 mr-2"
                      />
                      <span className="font-medium text-gray-800">
                        {method.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:w-1/2">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Order Summary
                </h3>
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">
                        {formatCurrency(total)}
                      </span>
                    </div>

                    {discount > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Discount</span>
                        <span className="text-green-600 font-medium">
                          -{formatCurrency(discount)}
                        </span>
                      </div>
                    )}

                    <div className="border-t pt-3 mt-3">
                      <div className="flex justify-between">
                        <span className="text-lg font-semibold text-gray-900">
                          Total
                        </span>
                        <span className="text-xl font-bold text-orange-700">
                          {formatCurrency(total - discount)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleCreateTransaction}
                    disabled={!dataCarts || dataCarts.length === 0}
                    className={`w-full font-bold py-4 rounded-xl mt-6 transition-all transform hover:-translate-y-0.5 shadow-lg ${
                      !dataCarts || dataCarts.length === 0
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-orange-500 hover:bg-orange-600 text-white"
                    }`}
                  >
                    {!dataCarts || dataCarts.length === 0
                      ? "Keranjang Kosong"
                      : "Proceed to Checkout"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartComponent;
