import axios from "axios";
import { toast } from "sonner";

const useAddPromo = () => {
  const addPromo = async (payload) => {
    try {
      await axios.post(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-promo`,
        payload,
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Promo updated success");
    } catch (err) {
      toast.error("Failed to update promo");
    }
  };

  return { addPromo };
};

export default useAddPromo;
