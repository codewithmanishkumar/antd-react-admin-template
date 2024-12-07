import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router";
import { ROUTES } from "router/routes";

const AccessDeniedPage = () => {
  const navigate = useNavigate();
  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <Button type="primary" onClick={() => navigate(ROUTES.ROOT)}>
          Back Home
        </Button>
      }
    />
  );
};

export default AccessDeniedPage;
