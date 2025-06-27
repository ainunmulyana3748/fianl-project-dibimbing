import axios from "axios";
import { toast } from "sonner";

const useUpdatePromo = () => {
  const updatePromo = async (id, payload) => {
    try {
      await axios.post(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-promo/${id}`,
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

  return { updatePromo };
};

export default useUpdatePromo;
