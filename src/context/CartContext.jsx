// context/CartContext.js
import useGetCart from "@/hooks/Cart/useGetCart";
import { createContext, useContext, useMemo } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { dataCarts, setDataCarts, refetchCart } = useGetCart();

  const totalQuantity = useMemo(() => {
    return dataCarts.reduce((sum, item) => sum + item.quantity, 0);
  }, [dataCarts]);

  const value = {
    dataCarts,
    setDataCarts,
    refetchCart,
    totalQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
