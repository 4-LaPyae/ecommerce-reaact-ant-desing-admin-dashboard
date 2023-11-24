import { Fragment } from "react";
import {
    Button,
    Row,
    Col,
    Form,
    Input,
    Select,
    message,
    Typography,
} from "antd";
import { useCommonApiMutation, useGetDataQuery } from "../../config/api";
import { useTranslation } from "react-i18next";
import MenuList from "./menu-list";
import endpoints from "../../config/api/endpoints";
import clipboard from "clipboard-copy";
import LoopBanner from "../common/loop-banner";
import AnimatedLayout from "../common/animated-layout";

const MenuManagement = () => {
    // Inform to run command for creating menu files.
    const loopBannerText =
        "After successfully saving the menu data, NPM commands are automatically copied. You must run these commands in the project repository using the terminal.";

    // Define the API endpoint for fetching menu data
    const endpoint = endpoints.routesEndpoint;

    // Use a custom hook to fetch data and manage loading state
    const { data, isLoading: menuLoading } = useGetDataQuery(endpoint);

    // Use a custom mutation hook for common API operations
    const [commonApi, { isLoading }] = useCommonApiMutation();

    // Initialize translation functions for localization
    const { t } = useTranslation("form");
    const { t: s } = useTranslation("sidebar");
    const { t: v } = useTranslation("validation");

    // Create a reference to the form using the useForm hook
    const [form] = Form.useForm();

    // Create a reference to the message API
    const [messageApi, contextHolder] = message.useMessage();

    // Handle form submission
    const onFinish = async (values) => {
        const { path } = values;
        const body = path.trim() === "" ? { ...values, path: null } : values;

        try {
            // Make an API request to save the form data
            const response = await commonApi({
                endpoint: endpoint,
                method: "POST",
                body: body,
            });

            if (response.data.isSuccess) {
                // Define terminal commands for localization update and component creation
                const localeCommand = `npm run update-locales -- --args=${path}`;
                const componentCommand = `npm run create-component -- --args=${path}`;
                const combinedCommands = `${localeCommand}\n${componentCommand}`;

                messageApi.success(response.data.message);

                // Copy commands to clipboard and display a success message
                try {
                    await clipboard([combinedCommands]);
                } catch (error) {
                    message.error("Copying to clipboard failed.");
                    console.error("Copy to clipboard failed:", error);
                }

                // Reset the form fields
                form.resetFields();
            } else {
                messageApi.error(response.data.message);
            }
        } catch (error) {
            console.log("API request error", error);
        }
    };

    // Handle form validation failure
    const onFinishFailed = (errorInfo) => {
        console.log("Form validation failed:", errorInfo);
    };

    return (
        <AnimatedLayout>
            <Fragment>
                {contextHolder}
                <LoopBanner content={loopBannerText} type="info" />
                <Typography.Title level={2}>
                    {s("menu-management")}
                </Typography.Title>
                <Form
                    style={{ marginTop: 30 }}
                    form={form}
                    wrapperCol={{
                        span: 20,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    layout="vertical"
                    autoComplete="off"
                >
                    <Row gutter={16}>
                        <Col xs={24} sm={24} lg={24} xl={12}>
                            <Form.Item
                                label={t("label")}
                                name="label"
                                rules={[
                                    {
                                        required: true,
                                        message: v("required").replace(
                                            "%s",
                                            t("label"),
                                        ),
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} lg={24} xl={12}>
                            <Form.Item
                                label={t("path")}
                                name="path"
                                rules={[
                                    {
                                        required: true,
                                        message: v("required").replace(
                                            "%s",
                                            t("path"),
                                        ),
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} lg={24} xl={12}>
                            <Form.Item
                                label={t("icon")}
                                name="icon"
                                rules={[
                                    {
                                        required: true,
                                        message: v("required").replace(
                                            "%s",
                                            t("icon"),
                                        ),
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} lg={24} xl={12}>
                            <Form.Item label="Parent" name="parent_id">
                                <Select allowClear>
                                    {data?.data &&
                                        data?.data.map((item, index) => (
                                            <Select.Option
                                                key={index}
                                                value={item.id}
                                            >
                                                {item.label}
                                            </Select.Option>
                                        ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: 20 }}>
                        <Col
                            xs={{ span: 24, offset: 0 }}
                            sm={{ span: 4, offset: 10 }}
                        >
                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    block
                                    disabled={isLoading}
                                >
                                    {t("save")}
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
                {menuLoading ? (
                    "Loading..."
                ) : (
                    <MenuList data={data?.data || []} />
                )}
            </Fragment>
        </AnimatedLayout>
    );
};

export default MenuManagement;
