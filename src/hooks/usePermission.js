import { useMemo } from "react";
import { useSelector } from "react-redux";
import isEmpty from "lodash/isEmpty";

function usePermission(permissions = []) {
  const userPermissions = useSelector((state) => state.auth.permissions);

  const hasPermisson = useMemo(() => {
    return permissions.some((role) => userPermissions.includes(role));
  }, [permissions, userPermissions]);

  if (isEmpty(permissions) || isEmpty(userPermissions)) {
    return true;
  }

  return hasPermisson;
}

export default usePermission;
