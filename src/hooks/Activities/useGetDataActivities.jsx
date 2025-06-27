import axios from "axios";
import { useEffect, useState } from "react";

const useGetDataActivities = () => {
  const [dataActivities, setDataActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  const getDataActivities = async () => {
    const apiKey = "24405e01-fbc1-45a5-9f5a-be13afcd757c";

    try {
      const response = await axios.get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activities",
        {
          headers: { apiKey: apiKey },
        }
      );
      setDataActivities(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getDataActivities();
  }, []);

  return {
    getDataActivities,
    dataActivities,
    loading,
    refetch: getDataActivities,
  };
};

export default useGetDataActivities;
