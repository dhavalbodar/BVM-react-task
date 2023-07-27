// import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import AppRoutes from "./Routes/AppRoutes";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
