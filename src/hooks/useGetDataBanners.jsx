import axios from "axios";
import { useState } from "react";

const useGetDataBanners = () => {
  const [dataBanners, setDataBanners] = useState([]);
  const [loading, setLoading] = useState(false);

  const getDataBanners = async () => {
    setLoading(true);
    const apiKey = "24405e01-fbc1-45a5-9f5a-be13afcd757c";
    try {
      const response = await axios.get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/banners",
        {
          headers: { apiKey },
        }
      );
      setDataBanners(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    getDataBanners,
    dataBanners,
    loading,
  };
};

export default useGetDataBanners;
