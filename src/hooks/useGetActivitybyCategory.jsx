import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const useGetActivitybyCategory = () => {
  const { id } = useParams();
  const [dataActivitybyCategory, setDataActivitybyCategory] = useState([]);

  const getDataActivitybyCategory = async () => {
    const apiKey = "24405e01-fbc1-45a5-9f5a-be13afcd757c";

    try {
      const response = await axios.get(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activities-by-category/${id}`,
        {
          headers: {
            apiKey: apiKey,
          },
        }
      );

      setDataActivitybyCategory(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataActivitybyCategory();
  }, []);

  return {
    dataActivitybyCategory,
  };
};

export default useGetActivitybyCategory;
