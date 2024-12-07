import {
  LogoutOutlined,
  UserOutlined,
  ExclamationCircleFilled,
  SunOutlined,
  MoonOutlined,
} from "@ant-design/icons";
import { ProLayout, SettingDrawer } from "@ant-design/pro-components";
import enUS from "antd/locale/en_US";
import { ConfigProvider, Modal, Dropdown } from "antd";
import { NAVIGATION_MENU } from "constants/navigation";
import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { onSignOutSuccess } from "store/auth/userSlice";
import { setThemeSettings } from "store/themeSettings/themeSlice";
import isEmpty from "lodash/isEmpty";
const { confirm } = Modal;

export default ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const settings = useSelector((state) => state.theme);
  const userPermissions = useSelector((state) => state.auth.permissions);

  const ALLOWED_NAVIGATION_MENU = useMemo(() => {
    if (isEmpty(userPermissions)) return NAVIGATION_MENU;
    return NAVIGATION_MENU.filter((item) => {
      if (item.routes) {
        item.routes = item.routes.filter((route) => {
          if (isEmpty(route.permission)) return true;
          return route.permission.some((perm) =>
            userPermissions.includes(perm)
          );
        });
        return item.routes.length > 0;
      }
      if (isEmpty(item.permission)) return true;
      return item.permission.some((perm) => userPermissions.includes(perm));
    });
  }, [userPermissions]);

  const logout = () => {
    confirm({
      title: "Are you sure you want to logout?",
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      cancelText: "No",
      onOk() {
        dispatch(onSignOutSuccess());
      },
    });
  };

  const ThemeToggle = () => {
    if (settings.navTheme === "realDark") {
      return (
        <SunOutlined
          onClick={() => dispatch(setThemeSettings({ navTheme: "light" }))}
        />
      );
    }
    return (
      <MoonOutlined
        onClick={() => dispatch(setThemeSettings({ navTheme: "realDark" }))}
      />
    );
  };

  if (typeof document === "undefined") {
    return <div />;
  }
  return (
    <div id="pro-layout" style={{ height: "100vh", overflow: "auto" }}>
      <ConfigProvider
        getTargetContainer={() => {
          return document.getElementById("pro-layout") || document.body;
        }}
        locale={enUS}
      >
        <ProLayout
          route={{
            path: "/",
            routes: ALLOWED_NAVIGATION_MENU,
          }}
          token={{
            header: {
              colorBgMenuItemSelected: "rgba(0,0,0,0.04)",
            },
          }}
          siderMenuType="group"
          actionsRender={(props) => {
            return [<ThemeToggle />];
          }}
          avatarProps={{
            icon: <UserOutlined />,
            // src: "https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg",
            size: "small",
            title: "User",
            render: (props, dom) => {
              return (
                <Dropdown
                  menu={{
                    items: [
                      {
                        key: "logout",
                        icon: <LogoutOutlined />,
                        label: "Log Out",
                        onClick: logout,
                      },
                    ],
                  }}
                >
                  {dom}
                </Dropdown>
              );
            },
          }}
          menuFooterRender={(props) => {
            if (props?.collapsed) return undefined;
            return (
              <div style={{ textAlign: "center", paddingBlockStart: 12 }}>
                <div>Made with Love</div>
                <div>by IT WAVES</div>
              </div>
            );
          }}
          menuItemRender={(item, dom) => (
            <div
              onClick={() => {
                navigate(item.path);
              }}
            >
              {dom}
            </div>
          )}
          {...settings}
        >
          {children}
        </ProLayout>
        <SettingDrawer
          enableDarkTheme
          getContainer={() => document.getElementById("pro-layout")}
          settings={settings}
          onSettingChange={(changeSetting) => {
            dispatch(setThemeSettings(changeSetting));
          }}
          disableUrlParams
        />
      </ConfigProvider>
    </div>
  );
};
