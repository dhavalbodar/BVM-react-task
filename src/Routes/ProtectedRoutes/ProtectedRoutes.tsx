import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { RootState } from "../../Store/store";
import { useSelector } from "react-redux";

const ProtectedRoutes: React.FC = () => {
const { loginUser } = useSelector((state:RootState) => state.auth)
  return !loginUser ? <Outlet/> : <Navigate to="/dashboard" />;
};

export default ProtectedRoutes; 