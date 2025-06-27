import axios from "axios";
import { toast } from "sonner";

const useUpdateBanner = () => {
  const updateBanner = async (id, name, url) => {
    try {
      const payload = {
        name: name,
        imageUrl: url,
      };

      await axios.post(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-banner/${id}`,
        payload,
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Update Banner Success");
    } catch (error) {
      console.error("Update banner failed:", error);
      toast.error("Update Banner Failed");
    }
  };

  return {
    updateBanner,
  };
};

export default useUpdateBanner;
