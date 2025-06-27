import React, { useEffect } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import useUpdateCart from "@/hooks/Cart/useUpdateCart";
import { useCart } from "@/context/CartContext";
import useGetCart from "@/hooks/Cart/useGetCart";
import useDeletedActivity from "@/hooks/Activities/useDeletedActivity";

const CardCart = ({ total }) => {
  const { dataCarts, refetchCart: refetchCartData } = useGetCart();
  const { deletedActivity } = useDeletedActivity();
  const { updateCart } = useUpdateCart();
  const { refetchCart: refetchCartContext } = useCart();

  const fallbackImage =
    "https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_829/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/d4mucgi6ur1vcx57u0jb/TiketOceanParkHongKong.jpg";

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleRefetchCart = async () => {
    await Promise.all([refetchCartData(), refetchCartContext()]);
  };

  const handleQuantityChange = async (cartId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      await updateCart(cartId, newQuantity);
      await handleRefetchCart();
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const handleDeleteCart = async (cartId) => {
    try {
      await deletedActivity(cartId, handleRefetchCart);
      await handleRefetchCart();
    } catch (error) {
      console.error("Error deleting cart:", error);
    }
  };

  useEffect(() => {
    const calculateTotal = () => {
      const totalPrice = dataCarts.reduce((acc, item) => {
        const activity = item.activity;
        const price =
          activity.price_discount && activity.price_discount < activity.price
            ? activity.price_discount
            : activity.price;
        return acc + price * item.quantity;
      }, 0);
      total(totalPrice); // lempar ke parent
    };

    if (dataCarts?.length > 0) {
      calculateTotal();
    } else {
      total(0);
    }
  }, [dataCarts, total]);

  return (
    <>
      <div className="space-y-6">
        {dataCarts.map((data) => {
          const activity = data.activity;
          const hasDiscount =
            activity.price_discount && activity.price_discount < activity.price;
          const currentPrice = hasDiscount
            ? activity.price_discount
            : activity.price;
          const totalPrice = currentPrice * data.quantity;

          return (
            <div
              key={data.id}
              className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl bg-gray-50 border border-gray-200 hover:border-orange-300 transition-all"
            >
              {/* Image */}
              <div className="sm:w-1/4">
                <div className="relative aspect-video rounded-xl overflow-hidden">
                  <img
                    src={activity.imageUrls[0] || fallbackImage}
                    alt={activity.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = fallbackImage;
                    }}
                  />
                  {hasDiscount && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      SAVE{" "}
                      {Math.round(
                        (1 - activity.price_discount / activity.price) * 100
                      )}
                      %
                    </div>
                  )}
                </div>
              </div>

              {/* Info */}
              <div className="sm:w-2/4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">
                      {activity.title}
                    </h3>
                    <div className="flex items-center mt-1">
                      <div className="flex text-amber-400">
                        {"★".repeat(Math.floor(activity.rating))}
                        {"☆".repeat(5 - Math.floor(activity.rating))}
                      </div>
                      <span className="text-gray-500 text-sm ml-2">
                        {activity.rating} ({activity.total_reviews} reviews)
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mt-2">
                      <span className="font-medium">Facilities:</span>{" "}
                      {activity.facilities}
                    </p>
                  </div>
                </div>

                {/* Counter */}
                <div className="flex items-center mt-4">
                  <div className="flex items-center border border-gray-300 rounded-lg bg-white">
                    <button
                      onClick={() =>
                        handleQuantityChange(data.id, data.quantity - 1)
                      }
                      disabled={data.quantity <= 1}
                      className={`w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-l-lg transition-colors ${
                        data.quantity <= 1
                          ? "opacity-50 cursor-not-allowed hover:bg-white"
                          : ""
                      }`}
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-10 text-center text-gray-800 font-medium">
                      {data.quantity}
                    </span>
                    <button
                      onClick={() =>
                        handleQuantityChange(data.id, data.quantity + 1)
                      }
                      className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-r-lg transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <button
                    onClick={() => handleDeleteCart(data.id)}
                    className="ml-4 text-red-500 hover:text-red-700 flex items-center transition-colors"
                  >
                    <Trash2 size={18} className="mr-1" />
                    <span className="text-sm">Remove</span>
                  </button>
                </div>
              </div>

              {/* Price */}
              <div className="sm:w-1/4 text-right">
                <div className="flex flex-col h-full justify-between">
                  <div>
                    {hasDiscount && (
                      <div className="text-sm text-gray-400 line-through mb-1">
                        {formatCurrency(activity.price)}
                      </div>
                    )}
                    <div className="text-orange-600 font-semibold">
                      {formatCurrency(currentPrice)}
                    </div>
                  </div>

                  <div className="mt-4 sm:mt-0">
                    <div className="text-sm text-gray-500">Total:</div>
                    <div className="text-lg font-bold text-gray-900">
                      {formatCurrency(totalPrice)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CardCart;
