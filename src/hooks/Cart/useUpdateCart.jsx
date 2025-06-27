import axios from "axios";

const useUpdateCart = () => {
  const token = localStorage.getItem("token");

  const updateCart = async (id, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      await axios.post(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-cart/${id}`,
        { quantity: newQuantity },
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  return {
    updateCart,
  };
};

export default useUpdateCart;
