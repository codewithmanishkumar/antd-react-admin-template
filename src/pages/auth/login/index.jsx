import React, { useState } from "react";
import { Button, Card, Form, Input, message, Typography } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { onSignInSuccess } from "store/auth/userSlice";
const { Text, Title, Link } = Typography;

export default function Login() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const onFinish = (values) => {
    setLoading(true);
    const payload = {
      email: values.email,
      token: "token",
      userName: "userName",
      permissions: [],
    };
    setTimeout(() => {
      dispatch(onSignInSuccess(payload));
      setLoading(false);
      message.success("Login successful!");
    }, 1000);
  };

  return (
    <section style={styles.container}>
      <Card style={styles.card}>
        <div style={styles.title}>
          <Title level={2}>Login</Title>
          <Text color="red">
            Welcome back to Admin theme! Please enter your details below to sign
            in.
          </Text>
        </div>
        <Form
          name="login"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          layout="vertical"
          size="large"
        >
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                required: true,
                message: "Email is required",
              },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Password is required",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <div style={styles.forgotPassword}>
            <Link href="">Forgot password?</Link>
          </div>

          <Form.Item>
            <Button
              loading={loading}
              block="true"
              type="primary"
              htmlType="submit"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </section>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f0f0f0",
  },
  card: {
    maxWidth: "400px",
  },
  title: {
    marginBottom: "20px",
    textAlign: "center",
  },
  button: {
    marginTop: "20px",
  },
  forgotPassword: {
    textAlign: "right",
    marginBottom: "10px",
  },
};
