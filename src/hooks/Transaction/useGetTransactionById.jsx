import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const useGetTransactionById = () => {
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const [dataTransactionById, setDataTransactionById] = useState([]);
  const { id } = useParams();

  const getTransactionById = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/transaction/${id}`,
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDataTransactionById(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTransactionById();
  }, [id]);

  return {
    getTransactionById,
    dataTransactionById,
    loading,
    refetchData: getTransactionById,
  };
};

export default useGetTransactionById;
