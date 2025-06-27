import axios from "axios";
import React, { useEffect, useState } from "react";

const useGetCart = () => {
  const tokenId = localStorage.getItem("token");
  const [dataCarts, setDataCarts] = useState([]);

  const getCarts = async () => {
    const apiKey = "24405e01-fbc1-45a5-9f5a-be13afcd757c";
    const token = `Bearer ${tokenId}`;

    try {
      const response = await axios.get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/carts",
        {
          headers: {
            apiKey: apiKey,
            Authorization: token,
          },
        }
      );

      setDataCarts(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCarts();
  }, []);

  return {
    dataCarts,
    setDataCarts,
    refetchCart: getCarts,
  };
};

export default useGetCart;
