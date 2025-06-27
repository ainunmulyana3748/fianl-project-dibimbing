import axios from "axios";
import { toast } from "sonner";

const useAddCategory = () => {
  const addCategory = async (name, url) => {
    try {
      const payload = {
        name: name,
        imageUrl: url,
      };

      await axios.post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-category",
        payload,
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success("Add Category success");
    } catch (error) {
      toast.error("Add Category Failed");
    }
  };
  return {
    addCategory,
  };
};

export default useAddCategory;
