import { lazy } from "react";
import { useRoutes, Navigate } from "react-router-dom";
import Tables from "../components/Tables";

const Login = lazy(() => import("../components/Login"));
const Home = lazy(() => import("../components/Home"));
// const Tables = lazy(() => import("../components/Tables"));


const ProtectedRoute = () => {

  const routes: any = useRoutes([
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "*",
      element: <Navigate to="/home" />,
    },
    {
      path: "/table",
      element: <Tables/>,
    },
  ]);
  return routes;
};

export default ProtectedRoute;
