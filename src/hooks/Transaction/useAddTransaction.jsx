import axios from "axios";

const useAddTransaction = () => {
  const createTransaction = async (cartIds, paymentMethodId) => {
    const token = localStorage.getItem("token");
    const apiKey = "24405e01-fbc1-45a5-9f5a-be13afcd757c";

    if (!cartIds.length || !paymentMethodId) {
      throw new Error("Cart IDs dan Payment Method ID harus diisi");
    }

    try {
      const response = await axios.post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-transaction",
        {
          cartIds,
          paymentMethodId,
        },
        {
          headers: {
            apiKey,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error(
        "Error creating transaction:",
        error.response?.data || error.message
      );
      throw error;
    }
  };

  return { createTransaction };
};

export default useAddTransaction;
