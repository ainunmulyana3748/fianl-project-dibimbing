import { Camera, Mail, Phone, User } from "lucide-react";
import { toast } from "sonner";
import useUploadImage from "@/hooks/useUploadImage";
import { useGetDataUser } from "@/hooks/User/useGetDataUser";
import useUpdateDataUser from "@/hooks/User/useUpdateDataUser";

const ProfileComponent = () => {
  const { dataProfile } = useGetDataUser();
  const { uploadImage } = useUploadImage();

  const {
    updateDataUser,
    setName,
    setPhoneNumber,
    name,
    email,
    phoneNumber,
    setImage,
  } = useUpdateDataUser();

  const fallbackImage =
    "https://images.unsplash.com/photo-1633332755192-727a05c4013d";

  if (!dataProfile) {
    return (
      <div className="w-full py-24 px-4 bg-gradient-to-br from-orange-50 via-white to-orange-100 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500"></div>
      </div>
    );
  }

  const handleUploadImage = async (file) => {
    try {
      const { urlImage } = await uploadImage(file);
      setImage(urlImage);
      toast.success("Upload image success");
    } catch (error) {
      toast.error("Fail Upload image");
    }
  };

  return (
    <div className="w-full py-24 px-4 bg-gradient-to-br from-orange-50 via-white to-orange-100 min-h-screen flex items-center justify-center">
      <div className="container max-w-4xl p-6 bg-white rounded-2xl shadow">
        <h1 className="text-2xl font-bold mb-6">My Profile</h1>

        {/* Profile Header */}
        <div className="flex flex-col items-center mb-8 relative">
          <div className="relative">
            <img
              src={dataProfile?.profilePictureUrl}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-white shadow"
            />
            <label className="absolute bottom-0 right-0 bg-orange-500 p-1.5 rounded-full cursor-pointer">
              <Camera className="w-4 h-4 text-white" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    handleUploadImage(file);
                  }
                }}
              />
            </label>
          </div>
          <div className="mt-3 text-center">
            <h2 className="text-lg font-semibold">{dataProfile?.name}</h2>
            <p className="text-sm text-gray-500">{dataProfile?.email}</p>
            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full mt-1 inline-block">
              {dataProfile?.role}
            </span>
          </div>
        </div>

        {/* Edit Form */}
        <form className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <div className="flex items-center border rounded-md px-3 py-2">
              <User className="w-4 h-4 text-gray-400 mr-2" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full outline-none text-sm"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="flex items-center border rounded-md px-3 py-2 bg-gray-100">
              <Mail className="w-4 h-4 text-gray-400 mr-2" />
              <input
                type="email"
                value={email}
                disabled
                className="w-full bg-gray-100 outline-none text-sm text-gray-500"
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Email address cannot be changed
            </p>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <div className="flex items-center border rounded-md px-3 py-2">
              <Phone className="w-4 h-4 text-gray-400 mr-2" />
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full outline-none text-sm"
              />
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={updateDataUser}
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-md flex justify-center items-center"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileComponent;
