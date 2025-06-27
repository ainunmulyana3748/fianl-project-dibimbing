import axios from "axios";
import React, { useEffect, useState } from "react";

const useGetAllTrannsaction = () => {
  const token = localStorage.getItem("token");
  const [dataTransaction, setDataTransaction] = useState([]);

  const getAllTransaction = async () => {
    try {
      const response = await axios.get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/all-transactions",
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDataTransaction(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllTransaction();
  }, []);
  return {
    dataTransaction,
  };
};

export default useGetAllTrannsaction;
