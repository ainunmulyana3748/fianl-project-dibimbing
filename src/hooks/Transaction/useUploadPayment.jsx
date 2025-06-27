import axios from "axios";

const paymentProof = async (id, imageUrl) => {
  const token = localStorage.getItem("token");

  const payload = {
    proofPaymentUrl: imageUrl,
  };

  try {
    const response = await axios.post(
      `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-transaction-proof-payment/${id}`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log("Upload payment proof error:", error);
    throw error;
  }
};

export default paymentProof;
