import useLogoutUser from "@/hooks/useLogoutUser";
import {
  Grid,
  LayoutDashboard,
  LogOut,
  ShoppingCart,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";

const UserMenuDropdown = ({ data }) => {
  const { handleLogout } = useLogoutUser();
  const role = localStorage.getItem("role");
  const fallbackImage =
    "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740";

  return (
    <div className="absolute top-full right-0 mt-2 w-72 bg-white shadow-2xl rounded-xl overflow-hidden z-50 text-gray-800 animate-fadeIn">
      {/* Triangle pointer */}
      <div className="absolute -top-2 right-4 w-4 h-4 bg-white transform rotate-45 shadow-sm" />

      {/* Profile Header */}
      <div className="p-5 bg-gradient-to-r from-orange-50 to-indigo-50 border-b">
        <div className="flex items-center gap-4">
          <img
            src={data.profilePictureUrl || fallbackImage}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = fallbackImage;
            }}
            alt="Profile"
            className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
          />

          <div>
            <p className="font-bold text-lg">{data.name}</p>
            <p className="text-sm text-gray-500">{data.role}</p>
            <p className="text-xs text-gray-500 mt-1">{data.email}</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <ul className="py-2">
        <DropdownItem
          icon={<User size={18} />}
          label="My Profile"
          href={"/update-profile"}
        />
        <DropdownItem
          icon={<ShoppingCart size={18} />}
          label="My Transaction"
          href={"/my-transactions"}
        />
        {role === "admin" ? (
          <DropdownItem
            icon={<LayoutDashboard size={18} />}
            label="My Dashboard"
            href={"/my-dashboard"}
          />
        ) : null}
      </ul>

      {/* Footer */}
      <div className="border-t py-3 px-4 bg-gray-50">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full text-red-500 hover:text-red-600 font-medium text-sm py-2 px-3 rounded-lg hover:bg-red-50 transition-colors"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default UserMenuDropdown;

const DropdownItem = ({ icon, label, badge, href }) => (
  <li>
    <Link
      to={href}
      className="flex items-center justify-between py-3 px-5 text-sm hover:bg-orange-50 transition-colors group"
    >
      <div className="flex items-center gap-3">
        <span className="text-gray-500 group-hover:text-orange-600 transition-colors">
          {icon}
        </span>
        <span>{label}</span>
      </div>
      {badge && (
        <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {badge}
        </span>
      )}
    </Link>
  </li>
);
