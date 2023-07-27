import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../Pages/Auth/Login";
import SignUp from "../Pages/Auth/SignUp";
import Layout from "../Layout/Layout";
import PrivateRoutes from "./PrivateRoutes/PrivateRoutes";
import { Dashboard } from "@mui/icons-material";
import ProtectedRoutes from "./ProtectedRoutes/ProtectedRoutes";

const AppRoutes: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route element={<ProtectedRoutes/>}>
          <Route index path="/" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Route>
        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </Layout>
  );
};

export default AppRoutes;
