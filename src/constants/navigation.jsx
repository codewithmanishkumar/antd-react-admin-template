import { LayoutOutlined, UsergroupAddOutlined } from "@ant-design/icons";

export const NAVIGATION_MENU = [
  {
    path: "/",
    name: "Dashboard",
    icon: <LayoutOutlined />,
    routes: [
      {
        path: "/dashboard",
        name: "Dashboard Stats",
        permission: [],
      },
    ],
  },
  {
    path: "/customers",
    name: "Customers",
    icon: <UsergroupAddOutlined />,
    permission: [],
  },
];
