import { lazy } from "react";

const Dashboard = lazy(() => import("../pages/dashboard"));
const Login = lazy(() => import("../pages/auth/login"));
const Customers = lazy(() => import("../pages/customers"));
const AddEditCustomer = lazy(() => import("../pages/customers/addEdit"));

export const ROUTES = {
  ROOT: "/",
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
  CUSTOMERS: "/customers",
  ACCESS_DENIED: "/access-denied",
};

export const PUBLIC_ROUTES = [
  {
    path: ROUTES.LOGIN,
    element: <Login />,
  },
];

export const PRIVATE_ROUTES = [
  {
    path: ROUTES.DASHBOARD,
    element: <Dashboard />,
    permission: [],
  },
  {
    path: ROUTES.CUSTOMERS,
    element: <Customers />,
    permission: [],
  },
  {
    path: `${ROUTES.CUSTOMERS}/add`,
    element: <AddEditCustomer />,
    permission: [],
  },
  {
    path: `${ROUTES.CUSTOMERS}/edit/:id`,
    element: <AddEditCustomer />,
    permission: [],
  },
];
