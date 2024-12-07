import usePermission from "hooks/usePermission";
import React from "react";
import { Navigate } from "react-router";
import { ROUTES } from "router/routes";

const PermissionGuard = ({ permissions = [], children }) => {
  const roleMatched = usePermission(permissions);

  return roleMatched ? (
    children
  ) : (
    <Navigate to={ROUTES.ACCESS_DENIED} replace />
  );
};

export default PermissionGuard;
