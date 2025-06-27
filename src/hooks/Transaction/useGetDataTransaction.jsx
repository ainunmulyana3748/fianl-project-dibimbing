import axios from "axios";
import { useEffect, useState } from "react";

const useGetDataTransaction = () => {
  const token = localStorage.getItem("token");
  const [dataTransaction, setDataTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getDataTransaction = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/my-transactions",
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data && response.data.data) {
        setDataTransaction(response.data.data);
      } else {
        setDataTransaction(null);
        setError("Data transaksi tidak ditemukan");
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setError(
        error.response?.data?.message || "Gagal mengambil data transaksi"
      );
      setDataTransaction(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDataTransaction();
  }, []);

  return {
    getDataTransaction,
    dataTransaction,
    loading,
    error,
    refetchData: getDataTransaction,
  };
};

export default useGetDataTransaction;
