import axios from "axios";
import { useEffect, useState } from "react";

const useGetDataPromos = () => {
  const [dataPromos, setDataPromos] = useState([]);
  const [loading, setLoading] = useState(true);

  const getDataPromos = async () => {
    const apiKey = "24405e01-fbc1-45a5-9f5a-be13afcd757c";

    try {
      const response = await axios.get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promos",
        {
          headers: { apiKey: apiKey },
        }
      );
      setDataPromos(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getDataPromos();
  }, []);

  return {
    getDataPromos,
    dataPromos,
    loading,
    refetch: getDataPromos,
  };
};

export default useGetDataPromos;
