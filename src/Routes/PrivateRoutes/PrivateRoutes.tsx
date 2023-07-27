import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import Dashboard from "../../Pages/Dashboard/Dashboard";
import { useSelector } from "react-redux";
import { RootState } from "../../Store/store";

const PrivateRoutes: React.FC = () => {
  const { loginUser } = useSelector((state:RootState) => state.auth)
  return loginUser ? <Dashboard/> : <Navigate to="/" />;
};

export default PrivateRoutes;
