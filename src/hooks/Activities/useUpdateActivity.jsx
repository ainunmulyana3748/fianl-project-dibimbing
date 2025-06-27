import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

const useUpdateActivity = () => {
  const [loading, setLoading] = useState(false);

  const updateActivity = async (activityId, payload) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-activity/${activityId}`,
        payload,
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Update Activity Success");
    } catch (error) {
      toast.error("Update Activity Failed");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { updateActivity, loading };
};

export default useUpdateActivity;
