import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  Menu,
  X,
  Home,
  Image,
  LayoutGrid,
  Activity,
  Tag,
  Settings,
  HelpCircle,
} from "lucide-react";
import DropdownProfile from "./DropdownProfile";

// Main Navbar Component
const Navbar = () => {
  const navigate = useNavigate();
  const [nav, setNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const token = localStorage.getItem("token");
  const location = useLocation();
  const pathname = location.pathname;

  const isPathMatch = (basePath) =>
    pathname === basePath || pathname.startsWith(`${basePath}/`);

  // Add scroll effect to navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setNav(false);
  }, [location]);

  return (
    <div
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? " bg-white/90 shadow-md py-2" : "bg-white py-2"
      }`}
    >
      <div className="flex items-center justify-between container px-4 mx-auto">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <p className="font-bold text-xl">
            Dolan<span className="text-orange-600">dolan.com</span>
          </p>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:block">
          <ul className="flex items-center gap-8 text-md font-medium">
            <NavItem
              path="/"
              label="Home"
              icon={<Home size={18} />}
              isActive={pathname === "/"}
            />
            <NavItem
              path="/banners"
              label="Banners"
              icon={<Image size={18} />}
              isActive={
                isPathMatch("/banners") || pathname.startsWith("/banner/")
              }
            />
            <NavItem
              path="/categories"
              label="Categories"
              icon={<LayoutGrid size={18} />}
              isActive={
                isPathMatch("/categories") || pathname.startsWith("/category/")
              }
            />
            <NavItem
              path="/activities"
              label="Activities"
              icon={<Activity size={18} />}
              isActive={
                isPathMatch("/activities") || pathname.startsWith("/activity/")
              }
            />
            <NavItem
              path="/promos"
              label="Promos"
              icon={<Tag size={18} />}
              isActive={isPathMatch("/promos")}
            />
          </ul>
        </nav>

        {/* User Actions */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex">
            {token ? (
              <DropdownProfile />
            ) : (
              <button
                className="bg-gradient-to-r bg-orange-500 hover:to-indigo-800 px-5 py-2 rounded-full text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-orange-500/20"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            )}
          </div>
          <Menu
            className={`text-orange-400 lg:hidden cursor-pointer ${
              scrolled && "text-orange-700"
            }`}
            size={28}
            onClick={() => setNav(true)}
          />
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      {nav && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setNav(false)}
        />
      )}

      {/* Mobile Navigation Sidebar */}
      <div
        className={`fixed top-0 right-0 w-80 h-full bg-orange-500 z-50 transition-all duration-500 ease-in-out shadow-2xl
        ${nav ? "translate-x-0" : "translate-x-full"}
        lg:hidden`}
      >
        <div className="p-6 h-full flex flex-col">
          {/* Sidebar Header */}
          <div className="flex justify-between items-center mb-10">
            <div className="flex items-center gap-3">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 w-12 h-12 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">D</span>
              </div>
              <p className="font-bold text-xl text-white">
                Dolan<span className="text-orange-300">dolan</span>
              </p>
            </div>
            <X
              onClick={() => setNav(false)}
              size={28}
              className="text-white cursor-pointer hover:text-orange-300 transition-colors"
            />
          </div>

          {/* Mobile Menu Items */}
          <nav className="flex-1">
            <ul className="flex flex-col gap-1">
              <MobileNavItem
                path="/"
                label="Home"
                icon={<Home size={20} />}
                isActive={pathname === "/"}
              />
              <MobileNavItem
                path="/banners"
                label="Banners"
                icon={<Image size={20} />}
                isActive={
                  isPathMatch("/banners") || pathname.startsWith("/banner/")
                }
              />
              <MobileNavItem
                path="/categories"
                label="Categories"
                icon={<LayoutGrid size={20} />}
                isActive={
                  isPathMatch("/categories") ||
                  pathname.startsWith("/category/")
                }
              />
              <MobileNavItem
                path="/activities"
                label="Activities"
                icon={<Activity size={20} />}
                isActive={
                  isPathMatch("/activities") || pathname.startsWith("/activity")
                }
              />
              <MobileNavItem
                path="/promos"
                label="Promos"
                icon={<Tag size={20} />}
                isActive={isPathMatch("/promos")}
              />

              <div className="mt-8 pt-6 border-t border-white/20">
                <MobileNavItem
                  path="/settings"
                  label="Settings"
                  icon={<Settings size={20} />}
                  isActive={isPathMatch("/settings")}
                />
                <MobileNavItem
                  path="/help"
                  label="Help Center"
                  icon={<HelpCircle size={20} />}
                  isActive={isPathMatch("/help")}
                />
              </div>
            </ul>
          </nav>

          {/* Sidebar Footer */}
          <div className="pt-6 border-t border-white/20 text-white/60 text-sm">
            <p>© 2023 Dolandolan.com</p>
            <p className="mt-1">All rights reserved</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

// NavItem Component
const NavItem = ({ path, label, icon, isActive }) => {
  return (
    <li className="group relative">
      <Link
        to={path}
        className={`flex items-center gap-1.5 py-2 transition-colors ${
          isActive ? "text-orange-600" : "text-gray-600 hover:text-orange-500"
        }`}
      >
        <span
          className={`transition-transform ${
            isActive
              ? "text-orange-600"
              : "text-gray-400 group-hover:text-orange-500"
          }`}
        >
          {icon}
        </span>
        {label}
      </Link>
      <div
        className={`absolute bottom-0 left-0 h-0.5 bg-orange-600 transition-all duration-300 ${
          isActive ? "w-full" : "w-0 group-hover:w-full"
        }`}
      ></div>
    </li>
  );
};

// MobileNavItem Component
const MobileNavItem = ({ path, label, icon, isActive }) => {
  return (
    <li>
      <Link
        to={path}
        className={`flex items-center gap-4 py-3 px-4 rounded-lg transition-all ${
          isActive
            ? "bg-white/10 text-white"
            : "text-white/80 hover:bg-white/5 hover:text-white"
        }`}
      >
        <span className={`${isActive ? "text-orange-300" : "text-white/60"}`}>
          {icon}
        </span>
        <span className="font-medium">{label}</span>
      </Link>
    </li>
  );
};
