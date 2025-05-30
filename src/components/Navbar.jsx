import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DropdownProfile from "./DropdownProfile";

const Navbar = () => {
  const navigate = useNavigate();
  const [nav, setNav] = useState(false);
  const token = localStorage.getItem("token");

  return (
    <div className="w-full">
      <div className="py-5 flex items-center justify-between container px-4 mx-auto">
        <p className="font-bold text-xl md:text-xl">
          Dolan<span className="text-orange-400">dolan.com</span>
        </p>

        {nav && (
          <div
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setNav(false)}
          />
        )}

        <nav
          className={`fixed top-0 left-0 w-full h-full bg-orange-400 pt-32 z-50 transition-all duration-500 ease-in-out
    ${
      nav
        ? "translate-x-0 opacity-100 pointer-events-auto"
        : "-translate-x-full opacity-0 pointer-events-none"
    }
    md:static md:w-auto md:h-auto md:pt-0 md:bg-white md:translate-x-0 md:opacity-100 md:pointer-events-auto md:transition-none`}
        >
          <X
            onClick={() => setNav(false)}
            size={32}
            className="absolute top-0 right-0 mt-7 mr-16 hover:text-gray-600 md:hidden"
          />
          <div className="h-[70%]">
            <ul className="flex flex-col items-center justify-evenly h-full text-4xl font-bold md:flex-row md:text-xl md:gap-10">
              <li className="hover:text-gray-600">
                <a href="">Home</a>
              </li>
              <li className="hover:text-gray-600">
                <a href="">Tours</a>
              </li>
              <li className="hover:text-gray-600">
                <a href="">About</a>
              </li>
            </ul>
          </div>
        </nav>

        <div className="flex items-center gap-3">
          {token ? (
            <DropdownProfile />
          ) : (
            <button
              className="bg-orange-400 px-4 py-2 rounded-full text-white font-semibold"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}
          <Menu
            className="text-orange-400 md:hidden"
            size={28}
            onClick={() => setNav(true)}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
