import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const useLogoutUser = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/logout",
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Logout success");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error("Logout Failed");
    }
  };

  return {
    handleLogout,
  };
};

export default useLogoutUser;
