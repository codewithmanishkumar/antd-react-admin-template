import React, { Suspense } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router";
import { PRIVATE_ROUTES, ROUTES, PUBLIC_ROUTES } from "./routes";
import { useSelector } from "react-redux";
import PermissionGuard from "components/route/permissionGuard";
import ThemeLayout from "components/layout/themeLayout";
import { Spin } from "antd";
import NotFoundPage from "pages/404";
import AccessDeniedPage from "pages/accessDenied";

// redirect to login if user is not logged in
const PrivateLayout = () => {
  const signedIn = useSelector((state) => state.auth.signedIn);
  return signedIn ? (
    <ThemeLayout>
      <Outlet />
    </ThemeLayout>
  ) : (
    <Navigate to={ROUTES.LOGIN} />
  );
};

// redirect to dashboard if user is already logged in
const PublicLayout = () => {
  const signedIn = useSelector((state) => state.auth.signedIn);
  return signedIn ? <Navigate to={ROUTES.DASHBOARD} /> : <Outlet />;
};

const Router = () => {
  return (
    <Suspense fallback={<Spin fullscreen />}>
      <Routes>
        <Route element={<PublicLayout />}>
          {PUBLIC_ROUTES.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
        <Route element={<PrivateLayout />}>
          {PRIVATE_ROUTES.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                <PermissionGuard permissions={route.permission}>
                  {route.element}
                </PermissionGuard>
              }
            />
          ))}
        </Route>
        <Route path={ROUTES.ACCESS_DENIED} element={<AccessDeniedPage />} />
        <Route path={ROUTES.ROOT} element={<Navigate to={ROUTES.LOGIN} />} />
        <Route path={"*"} element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default Router;
