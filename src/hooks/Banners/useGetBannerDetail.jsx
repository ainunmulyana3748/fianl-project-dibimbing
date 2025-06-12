import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const useGetBannerDetail = () => {
  const { id } = useParams();
  const [dataBanner, setDataBanner] = useState({});
  const apiKey = "24405e01-fbc1-45a5-9f5a-be13afcd757c";

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const response = await axios.get(
          `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/banner/${id}`,
          {
            headers: {
              apiKey,
            },
          }
        );
        setDataBanner(response.data.data);
      } catch (error) {
        console.error("Failed to fetch banner:", error);
      }
    };

    fetchBanner();
  }, [id]);
  return {
    dataBanner,
  };
};

export default useGetBannerDetail;
