import axios from "axios";
import { toast } from "sonner";

const useUpdateActivity = () => {
  const updateActivity = async (activityId, payload, onSuccess) => {
    try {
      const response = await axios.put(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-activity/${activityId}`,
        payload,
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success("Activity updated successfully");
      if (onSuccess) onSuccess(response.data);
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update activity");
    }
  };

  return { updateActivity };
};

export default useUpdateActivity;
