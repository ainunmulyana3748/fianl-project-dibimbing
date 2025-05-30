import axios from "axios";
import { AArrowDown } from "lucide-react";
import { useEffect } from "react";

const DropdownProfile = () => {
  const getUserProfile = async () => {
    const Authorization =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI5NWE4MDNjMy1iNTFlLTQ3YTAtOTBkYi0yYzJmM2Y0ODE1YTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MjI4NDgzODl9.Yblw19ySKtguk-25Iw_4kBKPfqcNqKWx9gjf505DIAk";

    const apiKey = "24405e01-fbc1-45a5-9f5a-be13afcd757c";

    try {
      const response = await axios.get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/user",
        {
          headers: {
            Authorization: Authorization,
            apiKey: apiKey,
          },
        }
      );

      console.log(response);
    } catch (error) {}
  };

  useEffect(() => {
    getUserProfile();
  }, []);
  return (
    <div className="text-white bg-orange-400 px-4 py-2 rounded-full">
      <AArrowDown />
    </div>
  );
};

export default DropdownProfile;
