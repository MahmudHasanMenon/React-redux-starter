import { Navigate, RouteObject } from "react-router-dom";
import { lazy } from "react";

const Login = lazy(() => import("../pages/auth/Login"));

export const unAuthenticatedRoutes: RouteObject[] = [
  { path: "/login", element: <Login /> },
  { path: "*", element: <Navigate to="/login" /> },
];
