import React from "react";
import {
  Users as UsersIcon,
  ShoppingBag,
  Image,
  LayoutGrid,
  Activity,
  Percent,
  UserIcon,
} from "lucide-react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import useGetAllUsers from "@/hooks/User/useGetAllUsers";
import useGetAllTrannsaction from "@/hooks/Transaction/useGetAllTrannsaction";
import useGetDataBanners from "@/hooks/Banners/useGetDataBanners";
import useGetDataCategories from "@/hooks/Categories/useGetDataCategories";
import useGetDataActivities from "@/hooks/Activities/useGetDataActivities";
import useGetDataPromos from "@/hooks/Promos/useGetDataPromos";

const DashboardComponents = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const { dataUsers } = useGetAllUsers();
  const { dataTransaction } = useGetAllTrannsaction();
  const { dataBanners } = useGetDataBanners();
  const { dataCategories } = useGetDataCategories();
  const { dataActivities } = useGetDataActivities();
  const { dataPromos } = useGetDataPromos();

  const stats = [
    {
      label: "Total Users",
      value: dataUsers.length,
      icon: <UsersIcon className="text-sky-500" />,
      bg: "bg-sky-100",
    },
    {
      label: "Total Transaction",
      value: dataTransaction.length,
      icon: <ShoppingBag className="text-green-500" />,
      bg: "bg-green-100",
    },
    {
      label: "Banners",
      value: dataBanners.length,
      icon: <Image className="text-orange-500" />,
      bg: "bg-orange-100",
    },
    {
      label: "Categories",
      value: dataCategories.length,
      icon: <LayoutGrid className="text-pink-500" />,
      bg: "bg-pink-100",
    },
    {
      label: "Activities",
      value: dataActivities.length,
      icon: <Activity className="text-indigo-500" />,
      bg: "bg-indigo-100",
    },
    {
      label: "Promos",
      value: dataPromos.length,
      icon: <Percent className="text-rose-500" />,
      bg: "bg-rose-100",
    },
  ];

  const manage = [
    { label: "Users", icon: <UserIcon />, path: "users" },
    { label: "Orders", icon: <ShoppingBag />, path: "orders" },
    { label: "Banners", icon: <Image />, path: "banners" },
    { label: "Categories", icon: <LayoutGrid />, path: "categories" },
    { label: "Activities", icon: <Activity />, path: "activities" },
    { label: "Promos", icon: <Percent />, path: "promos" },
  ];

  const currentSection = currentPath.split("/").pop();
  return (
    <div className="container w-full flex flex-col justify-center mx-auto py-32">
      <div className="space-y-8">
        <h1 className="text-4xl font-bold">Dashboard</h1>

        {/* Top stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((item, i) => (
            <div key={i} className={`rounded-xl p-4 ${item.bg} shadow-sm`}>
              <div className="flex items-center gap-4">
                <div className="text-3xl">{item.icon}</div>
                <div>
                  <p className="text-sm text-gray-500">{item.label}</p>
                  <p className="text-xl font-bold text-gray-800">
                    {item.value}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Manage</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {manage.map((item, i) => (
              <NavLink
                key={i}
                to={`/my-dashboard/${item.path}`}
                className={({ isActive }) =>
                  `p-4 rounded-xl border border-gray-200 flex flex-col items-center gap-2 shadow-sm ${
                    isActive ? "bg-orange-500" : "bg-white hover:bg-orange-100"
                  }`
                }
              >
                <div className="text-2xl">{item.icon}</div>
                <p className="text-sm font-medium text-gray-700">
                  {item.label}
                </p>
              </NavLink>
            ))}
          </div>
        </div>

        <div className="mt-6 w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardComponents;
