import axios from "axios";
import { toast } from "sonner";

const useDeletPromo = () => {
  const deletPromo = async (id, onSuccess) => {
    try {
      await axios.delete(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-promo/${id}`,
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success("Delete Promo Success");
      if (onSuccess) onSuccess();
    } catch (error) {
      toast.error("Delete Promo Failed");
    }
  };
  return {
    deletPromo,
  };
};

export default useDeletPromo;
