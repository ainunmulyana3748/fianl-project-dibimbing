import axios from "axios";
import { toast } from "sonner";

const useCancelTransaction = () => {
  const token = localStorage.getItem("token");

  const cancelTransaction = async (id) => {
    try {
      const response = await axios.post(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/cancel-transaction/${id}`,
        {},
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Transaksi berhasil dibatalkan!");
      // await refetchData();
    } catch (error) {
      toast.error("Gagal membatalkan transaksi. Silakan coba lagi.");
    }
  };

  return {
    cancelTransaction,
  };
};

export default useCancelTransaction;
