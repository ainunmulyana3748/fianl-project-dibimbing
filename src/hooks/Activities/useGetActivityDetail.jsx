import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const useGetActivityDetail = () => {
  const { id } = useParams();
  const [dataActivities, setDataActivities] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivityDetail = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activity/${id}`,
          {
            headers: {
              apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setDataActivities(response.data.data);
      } catch (error) {
        console.error("Failed to fetch activity detail:", error);
        setDataActivities(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchActivityDetail();
    }
  }, [id]);

  return {
    dataActivities,
    loading,
  };
};

export default useGetActivityDetail;
