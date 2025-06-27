import axios from "axios";
import { useEffect, useState } from "react";

const useGetPaymentMethod = () => {
  const [paymentMethod, setPaymentMethod] = useState([]);

  const getPaymentMethod = async () => {
    const apiKey = "24405e01-fbc1-45a5-9f5a-be13afcd757c";

    try {
      const response = await axios.get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/payment-methods",
        {
          headers: {
            apiKey: apiKey,
          },
        }
      );

      setPaymentMethod(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPaymentMethod();
  }, []);
  return {
    getPaymentMethod,
    paymentMethod,
  };
};

export default useGetPaymentMethod;
