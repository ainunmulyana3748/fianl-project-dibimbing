import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const useGetPromoDetail = () => {
  const [dataPromoDetail, setDataPromoDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const apiKey = "24405e01-fbc1-45a5-9f5a-be13afcd757c";
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promo/${id}`,
        {
          headers: { apiKey: apiKey },
        }
      );
      setDataPromoDetail(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching promo detail:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    dataPromoDetail,
    loading,
  };
};

export default useGetPromoDetail;
