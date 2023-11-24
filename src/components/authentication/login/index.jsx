import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message } from "antd";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { loginLayoutStyle } from "./style";
import { useCommonApiMutation } from "../../../config/api";
import endpoints from "../../../config/api/endpoints";
import { useDispatch } from "react-redux";
import { setUser } from "../../../features/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [commonApi, { isLoading }] = useCommonApiMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onFinish = async (values) => {
        const { email_or_phone, password } = values;
        const reqData = {
            endpoint: endpoints.loginEndpoint,
            method: "POST",
            body: {
                email: email_or_phone,
                password,
            },
        };

        try {
            const response = await commonApi(reqData);
            const { isSuccess, message: msg } = response.data;

            if (isSuccess) {
                const userData = response.data.data;
                const token = userData.token;
                const menus = userData.routes;
                dispatch(setUser({ user: userData, token, menus }));
                navigate("/dashboard");
            } else {
                message.error(msg);
            }
        } catch (error) {
            const errorMessage = error.message || "An error occurred.";
            message.error(errorMessage);
        }
    };

    return (
        <div style={loginLayoutStyle.form}>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
            >
                <div style={loginLayoutStyle.iconContainer}>
                    <FontAwesomeIcon
                        icon={faLock}
                        style={loginLayoutStyle.icon}
                    />
                </div>
                {/* <Space direction="vertical"> */}
                <Form.Item
                    name="email_or_phone"
                    rules={[
                        {
                            required: true,
                            message: "Please enter your Email or Phone!",
                        },
                    ]}
                >
                    <Input
                        prefix={
                            <UserOutlined className="site-form-item-icon" />
                        }
                        placeholder="Email or Phone"
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Please enter your Password!",
                        },
                    ]}
                >
                    <Input.Password
                        prefix={
                            <LockOutlined className="site-form-item-icon" />
                        }
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                {/* </Space> */}
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <a className="login-form-forgot" href="">
                        Forgot Password
                    </a>
                </Form.Item>
                <Form.Item>
                    <Button
                        block
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                        disabled={isLoading}
                    >
                        Log in
                    </Button>

                    {/* <span
=======
import { useDispatch } from "react-redux";
import { setUser } from "../../../features/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [commonApi, { isLoading }] = useCommonApiMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onFinish = async (values) => {
        const { email_or_phone, password } = values;
        const reqData = {
            endpoint: endpoints.loginEndpoint,
            method: "POST",
            body: {
                email: email_or_phone,
                password,
            },
        };

        try {
            const response = await commonApi(reqData);
            const { isSuccess, message: msg } = response.data;

            if (isSuccess) {
                const userData = response.data.data;
                const token = userData.token;
                const menus = userData.routes;
                dispatch(setUser({ user: userData, token, menus }));
                navigate("/dashboard");
            } else {
                message.error(msg);
            }
        } catch (error) {
            const errorMessage = error.message || "An error occurred.";
            message.error(errorMessage);
        }
    };

    return (
        <div style={loginLayoutStyle.form}>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
            >
                <div style={loginLayoutStyle.iconContainer}>
                    <FontAwesomeIcon
                        icon={faLock}
                        style={loginLayoutStyle.icon}
                    />
                </div>
                <Form.Item
                    name="email_or_phone"
                    rules={[
                        {
                            required: true,
                            message: "Please enter your Email or Phone!",
                        },
                    ]}
                >
                    <Input
                        prefix={
                            <UserOutlined className="site-form-item-icon" />
                        }
                        placeholder="Email or Phone"
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Please enter your Password!",
                        },
                    ]}
                >
                    <Input.Password
                        prefix={
                            <LockOutlined className="site-form-item-icon" />
                        }
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>

                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <a className="login-form-forgot" href="">
                        Forgot Password
                    </a>
                </Form.Item>
                <Form.Item>
                    <Button
                        block
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                        disabled={isLoading}
                    >
                        Log in
                    </Button>

                    {/* <span
>>>>>>> 24fd9920936077160dd784763477af61b12f1d72
						style={{
							padding: "0 5px",
						}}
					>
						Or
					</span> */}
                    {/* <a href="">Register Now!</a> */}
                </Form.Item>
            </Form>
        </div>
    );
};
export default Login;
