import axios from "axios";
import { toast } from "sonner";

const useUpdateCategories = () => {
  const updateCategory = async (id, name, url) => {
    try {
      const payload = {
        name: name,
        imageUrl: url,
      };

      await axios.post(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-category/${id}`,
        payload,
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success("Update Category Success");
    } catch (error) {
      toast.error("Update Category Failed");
    }
  };
  return {
    updateCategory,
  };
};

export default useUpdateCategories;
