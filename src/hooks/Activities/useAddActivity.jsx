import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const useAddActivity = () => {
  const [loading, setLoading] = useState(false);

  const createActivity = async (data) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-activity",
        data,
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Activity berhasil ditambahkan");
    } catch (err) {
      console.error(err);
      toast.error("Gagal menambahkan activity");
    } finally {
      setLoading(false);
    }
  };

  return { createActivity, loading };
};

export default useAddActivity;
