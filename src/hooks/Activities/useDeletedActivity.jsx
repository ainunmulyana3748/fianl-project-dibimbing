import axios from "axios";
import { toast } from "sonner";

const useDeletedActivity = () => {
  const token = localStorage.getItem("token");
  const deletedActivity = async (id) => {
    try {
      const response = await axios.delete(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-cart/${id}`,
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Deleted Activity success");
    } catch (error) {
      toast.error("Deleted Activity Failed");
    }
  };
  return { deletedActivity };
};

export default useDeletedActivity;
