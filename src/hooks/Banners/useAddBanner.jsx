import axios from "axios";
import { toast } from "sonner";

const useAddBanner = () => {
  const addBanner = async (name, url) => {
    const payload = {
      name: name,
      imageUrl: url,
    };

    try {
      await axios.post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-banner",
        payload,
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success("Create Banner Success");
    } catch (error) {
      toast.error("Create Banner Failed");
    }
  };
  return {
    addBanner,
  };
};

export default useAddBanner;
