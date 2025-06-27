import axios from "axios";

const useUploadImage = () => {
  const uploadImage = async (file) => {
    if (!file.type.startsWith("image/")) {
      throw new Error("File type is not image");
    }

    const formData = new FormData();
    formData.append("image", file);

    const response = await axios.post(
      "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/upload-image",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
        },
      }
    );

    return {
      urlImage: response?.data?.url,
    };
  };

  return { uploadImage };
};

export default useUploadImage;
