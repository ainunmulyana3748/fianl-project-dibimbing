import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import UserMenuDropdown from "./UserMenuDropdown";
import { useGetDataUser } from "../hooks/useGetDataUser";

const DropdownProfile = () => {
  const [userMenu, setUserMenu] = useState(false);
  const dropdownRef = useRef(null);
  const { dataProfile } = useGetDataUser();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {dataProfile && (
        <div
          className="flex items-center gap-3 bg-gradient-to-r bg-orange-600 px-4 py-2 rounded-full cursor-pointer transition-all hover:from-obge-700 hover shadow-lg"
          onClick={() => setUserMenu(!userMenu)}
        >
          <div className="relative">
            <img
              src={dataProfile.profilePictureUrl}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md"
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          </div>

          <div className="text-white text-sm font-semibold hidden md:block">
            {dataProfile.name}
          </div>

          <ChevronDown
            className={`text-white transition-transform duration-300 ${
              userMenu ? "rotate-180" : ""
            }`}
            size={20}
          />
        </div>
      )}

      {userMenu && <UserMenuDropdown data={dataProfile} />}
    </div>
  );
};

export default DropdownProfile;
