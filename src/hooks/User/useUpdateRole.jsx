// hooks/User/useUpdateRole.ts
import axios from "axios";
import { toast } from "sonner";

const useUpdateRole = () => {
  const updateRole = async (id, role) => {
    try {
      const response = await axios.post(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-user-role/${id}`,
        { role },
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Role updated successfully!");
      return response.data;
    } catch (error) {
      toast.error("Failed to update role");
      throw error;
    }
  };

  return { updateRole };
};

export default useUpdateRole;
