import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const GuestRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/" />;
  }

  return <div>{children || <Outlet />}</div>;
};

export default GuestRoute;
