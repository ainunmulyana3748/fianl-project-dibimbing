import axios from "axios";
import { toast } from "sonner";
import useGetTransactionById from "./useGetTransactionById";

const useUpdateTransactionStatus = (refetchData) => {
  const updateTransactionStatus = async (id, status) => {
    try {
      await axios.post(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-transaction-status/${id}`,
        { status },
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success(
        status === "success"
          ? "Confirm Payment Success"
          : "Cancel Transaction Success"
      );

      refetchData?.();
    } catch (error) {
      console.log(error);
    }
  };

  return { updateTransactionStatus };
};

export default useUpdateTransactionStatus;
