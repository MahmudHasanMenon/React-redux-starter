import { lazy } from "react";
import { RouteObject } from "react-router-dom";

// Lazy loaded components
const Dashboard = lazy(() => import("../pages/dashboard/Dashboard"));
const Profile = lazy(() => import("../pages/profile/Profile"));
const NoMatch = lazy(() => import("../components/NoMatch"));

export const authenticatedRoutes: RouteObject[] = [
  { path: "/", element: <Dashboard /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/profile", element: <Profile /> },
  { path: "*", element: <NoMatch /> },
];
