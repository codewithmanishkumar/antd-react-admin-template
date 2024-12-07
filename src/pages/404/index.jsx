import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router";
import { ROUTES } from "router/routes";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={() => navigate(ROUTES.ROOT)}>
          Back Home
        </Button>
      }
    />
  );
};

export default NotFoundPage;
