import axios from "axios";
import { toast } from "sonner";

const useDeletCategories = () => {
  const deletCategory = async (id, onSuccess) => {
    try {
      await axios.delete(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-category/${id}`,
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success("Deleted Category Success");
      if (onSuccess) onSuccess();
    } catch (error) {
      console.log(error);
      toast.error("Deleted Category Failed");
    }
  };
  return {
    deletCategory,
  };
};

export default useDeletCategories;
