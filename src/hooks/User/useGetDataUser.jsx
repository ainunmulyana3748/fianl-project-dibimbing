import axios from "axios";
import { useEffect, useState } from "react";

export const useGetDataUser = () => {
  const [dataProfile, setDataProfile] = useState(null);

  const getUserProfile = async () => {
    const apiKey = "24405e01-fbc1-45a5-9f5a-be13afcd757c";

    try {
      const response = await axios.get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/user",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            apiKey: apiKey,
          },
        }
      );
      setDataProfile(response?.data?.data);
    } catch (error) {
      console.error("Gagal mengambil profile:", error);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  return {
    dataProfile,
  };
};
