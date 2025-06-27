import axios from "axios";
import { toast } from "sonner";

const useDeleteActivity = () => {
  const deleteActivity = async (id, onSuccess) => {
    try {
      await axios.delete(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-activity/${id}`,
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Deleted Activity Success");
      if (onSuccess) onSuccess();
    } catch (error) {
      toast.error("Deleted Activity Failed");
    }
  };
  return {
    deleteActivity,
  };
};

export default useDeleteActivity;
