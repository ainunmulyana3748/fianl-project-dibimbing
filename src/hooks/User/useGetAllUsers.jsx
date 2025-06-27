import axios from "axios";
import { useEffect, useState } from "react";

const useGetAllUsers = () => {
  const token = localStorage.getItem("token");
  const [dataUsers, setDataUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const response = await axios.get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/all-user",
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const normalizedUsers = response.data.data.map((user) => ({
        id: user.id || "",
        name: user.name || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        role: user.role || "",
        profilePictureUrl: user.profilePictureUrl || "",
      }));

      setDataUsers(normalizedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return {
    dataUsers,
    refetch: getAllUsers,
  };
};

export default useGetAllUsers;
