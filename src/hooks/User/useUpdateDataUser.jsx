import axios from "axios";
import React, { useEffect, useState } from "react";
import { useGetDataUser } from "./useGetDataUser";

const useUpdateDataUser = () => {
  const { dataProfile } = useGetDataUser();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    if (dataProfile) {
      setName(dataProfile.name || "");
      setEmail(dataProfile.email || "");
      setImage(dataProfile.profilePictureUrl || "");
      setPhoneNumber(dataProfile.phoneNumber || "");
    }
  }, [dataProfile]);

  const token = localStorage.getItem("token");

  const updateDataUser = async (e) => {
    e.preventDefault();
    const apiKey = "24405e01-fbc1-45a5-9f5a-be13afcd757c";
    const Authorization = `Bearer ${token}`;
    const payload = {
      name: name,
      email: email,
      image: image,
      phoneNumber: phoneNumber,
    };

    try {
      const response = await axios.post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-profile",
        payload,
        {
          headers: {
            apiKey: apiKey,
            Authorization: Authorization,
          },
        }
      );
      console.log(payload);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    updateDataUser,
    setName,
    setEmail,
    setImage,
    setPhoneNumber,
    name,
    email,
    image,
    phoneNumber,
  };
};

export default useUpdateDataUser;
