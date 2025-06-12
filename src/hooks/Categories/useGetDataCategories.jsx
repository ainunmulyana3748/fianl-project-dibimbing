import axios from "axios";
import { useEffect, useState } from "react";

const useGetDataCategories = () => {
  const [dataCategories, setDataCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const getDataCategories = async () => {
    const apiKey = "24405e01-fbc1-45a5-9f5a-be13afcd757c";

    try {
      const response = await axios.get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/categories",
        {
          headers: { apiKey: apiKey },
        }
      );
      setDataCategories(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getDataCategories();
  }, []);

  return {
    getDataCategories,
    dataCategories,
    loading,
  };
};

export default useGetDataCategories;
