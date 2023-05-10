import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import Home from "../components/Home";
import Login from "../components/Login";

const PublicRoutes = ({ children }: any) => {
  console.log(children);
  console.log("Public Routes called");

  const publicRoutes = useRoutes([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "*",
      element: <Navigate to="/" />,
    },
  ]);
  return publicRoutes;
};

export default PublicRoutes;
