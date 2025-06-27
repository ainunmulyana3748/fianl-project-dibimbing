import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const useAddCart = () => {
  const tokenId = localStorage.getItem("token");

  const addCart = async (activityId) => {
    const apiKey = "24405e01-fbc1-45a5-9f5a-be13afcd757c";
    const token = `Bearer ${tokenId}`;

    try {
      const response = await axios.post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/add-cart",
        { activityId },
        {
          headers: {
            apiKey,
            Authorization: token,
          },
        }
      );
      console.log("Berhasil tambah ke cart:", response.data);
      // navigate("/carts");
    } catch (error) {
      console.error(
        "Gagal tambah ke cart:",
        error.response?.data || error.message
      );
    }
  };

  return {
    addCart,
  };
};

export default useAddCart;
