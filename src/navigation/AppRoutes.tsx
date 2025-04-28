import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { authenticatedRoutes } from "./AuthenticatedRoutes";
import { unAuthenticatedRoutes } from "./UnAuthenticatedRoutes";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export const AppRoutes = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const routes = token ? authenticatedRoutes : unAuthenticatedRoutes;
  return (
    <Suspense fallback={<div>...loading</div>}>
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </Suspense>
  );
};
