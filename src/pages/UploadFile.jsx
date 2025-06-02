import axios from "axios";
import { useState } from "react";

const UploadFile = () => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const handleImageChange = (e) => {
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("image", image);

    axios
      .post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/upload-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      )
      .then((res) => {
        console.log(res);
        setImageUrl(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <input type="file" name="" id="" onChange={handleImageChange} />
      <button onClick={handleUpload}>Upload</button>
      {imageUrl && <img src={imageUrl} alt="uploaded" />}
    </div>
  );
};

export default UploadFile;
