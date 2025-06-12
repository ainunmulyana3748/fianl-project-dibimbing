import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const useGetCategoriesDetail = () => {
  const { id } = useParams();
  const [dataCategories, setDataCategories] = useState({});
  const apiKey = "24405e01-fbc1-45a5-9f5a-be13afcd757c";

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/category/${id}`,
          {
            headers: {
              apiKey,
            },
          }
        );
        setDataCategories(response.data.data);
      } catch (error) {
        console.error("Failed to fetch Categories:", error);
      }
    };

    fetchCategories();
  }, [id]);
  return {
    dataCategories,
  };
};

export default useGetCategoriesDetail;
