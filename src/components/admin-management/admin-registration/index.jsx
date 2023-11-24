import { useCommonApiMutation } from "../../../config/api";
import {
    Alert,
    Button,
    Col,
    Flex,
    Form,
    Input,
    Row,
    Select,
    Tree,
    Typography,
    message,
    Card,
} from "antd";
import { useTranslation } from "react-i18next";
import { useGetDataQuery } from "../../../config/api";
import endpoints from "../../../config/api/endpoints";
import {
    LockOutlined,
    UserOutlined,
    PhoneOutlined,
    MailOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AnimatedLayout from "../../common/animated-layout";

const Registration = () => {
    // const { t } = useTranslation("form");
    const { t: s } = useTranslation("sidebar");
    const [alertMessage, setAlertMessage] = useState(""); //alert message for show
    const [alertFlag, setAlertFlag] = useState(false); //alert show hide flag
    const [alertStatus, setAlertStatus] = useState(false); //alert status for show hide
    const [checkedKeys, setCheckedKeys] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState([]);
    // const [updateTreeData, setUpdateTreeData] = useState([]);
    // Role Api & Routes Api Call
    const { data: roleData } = useGetDataQuery(endpoints.rolesEndpoint);
    const { data: routesData } = useGetDataQuery(endpoints.routesEndpoint);

    // Create Admin Api Hook
    const [commonApi] = useCommonApiMutation();
    const [form] = Form.useForm();

    const location = useLocation();

    const admin_id = location?.state?.adminId;
    const { data } = useGetDataQuery(`${endpoints.adminEndpoint}/${admin_id}`);

    const extractKeysFromRoutes = (routes) => {
        let keys = [];
        routes?.forEach((route) => {
            keys.push(route.id);
            if (route.children && route.children.length > 0) {
                keys = keys.concat(extractKeysFromRoutes(route.children));
            }
        });
        return keys;
    };

    useEffect(() => {
        if (admin_id) {
            const selectedRouteKeys = extractKeysFromRoutes(data?.data?.routes);
            console.log(selectedRouteKeys);
            form.setFieldsValue({
                name: data?.data.name,
                phone: data?.data.phone,
                email: data?.data.email,
                password: data?.data.password,
                roles: data?.data.roles.map((role) => role.id),
                routes: selectedRouteKeys,
            });
            setSelectedKeys(selectedRouteKeys);
            setCheckedKeys(selectedRouteKeys);
        }
    }, [data, admin_id, form]);

    // Role Api & Routes Api Call

    // Routes data
    const routesCollections = routesData?.data;

    // Convert Route DS for Ant Tree Design

    const convertTreeData = (apiData) => {
        return apiData?.map((item) => {
            const mainRoute = {
                title: item.label,
                key: item.id,
            };

            if (item.children && item.children.length > 0) {
                mainRoute.children = convertTreeData(item.children);
            }

            return mainRoute;
        });
    };

    const treeData = convertTreeData(routesCollections);

    // Convert Route DS for Ant Tree Design

    // Route Tree Ant Function
    const onCheck = (checkedKeysValue, info) => {
        if (!admin_id) {
            // create tree routes
            console.log("onCheck in create", checkedKeysValue);
            setCheckedKeys(checkedKeysValue);
            form.setFieldsValue({ routes: checkedKeysValue });
        } else {
            // update tree routes
            console.log("onCheck in update", checkedKeysValue);
            setCheckedKeys(checkedKeysValue);
            form.setFieldsValue({ routes: checkedKeysValue });
        }
    };

    const onSelect = (selectedKeysValue, info) => {
        console.log("onSelect", info);
        setSelectedKeys(selectedKeysValue);
    };

    // Role DS change for Select Ant Design

    const options = roleData?.data.map((role) => ({
        label: role.name,
        value: role.id,
    }));

    // Role DS change for Select Ant Design

    // Role Select Function

    const roleSelectHandler = (value) => {
        console.log(`selected ${value}`);
    };
    // Role Select Function

    // Ant Form Function

    const onFinish = async (values) => {
        let reqData;
        try {
            if (!admin_id) {
                //Create Admin Function Work
                console.log("Received values in create:", values);

                reqData = {
                    endpoint: endpoints.adminEndpoint,
                    method: "POST",
                    body: values,
                };

                console.log(reqData);
            } else {
                delete values.password;
                console.log("Received values in update:", values);

                reqData = {
                    endpoint: `${endpoints.adminEndpoint}/${admin_id}`,
                    method: "PUT",
                    body: values,
                };
            }

            const response = await commonApi(reqData);
            const { data } = response;
            if (!data.isSuccess) {
                setAlertMessage(data.message);
                setAlertFlag(true);
            } else {
                setAlertStatus(true);
                setAlertFlag(true);
                setAlertMessage(data.message);
            }

            form.resetFields();
            console.log("form clear");

            setCheckedKeys([]);
            setSelectedKeys([]);
        } catch (error) {
            message.error(error);
        }
    };

    // Ant Form Function

    return (
        <AnimatedLayout>
            <>
                {alertFlag && (
                    <Alert
                        style={{
                            margin: "20px 0",
                        }}
                        message={alertMessage}
                        type={alertStatus ? "success" : "error"}
                        showIcon
                        closable
                        onClose={() => {
                            setAlertFlag(false);
                        }}
                    />
                )}
                <Card bordered={false}>
                    <Form
                        form={form}
                        onFinish={onFinish}
                        labelCol={{ span: 6 }}
                    >
                        <Flex justify="space-between" align="center">
                            <Typography.Title
                                style={{ marginTop: 0, marginBottom: 40 }}
                                level={2}
                            >
                                {s("admin-registration")}
                            </Typography.Title>
                            <Form.Item>
                                <Button htmlType="submit" type="primary">
                                    {admin_id ? "Update" : "Save"}
                                </Button>
                            </Form.Item>
                        </Flex>

                        <Row>
                            <Col span={8} align="center">
                                {/* Your content for the 1/3 part */}
                                <Form.Item
                                    name="routes"
                                    getValueFromEvent={(checkedKeys) =>
                                        checkedKeys
                                    }
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please select at least one route!",
                                        },
                                    ]}
                                >
                                    <Tree
                                        checkable
                                        treeData={treeData}
                                        onCheck={onCheck}
                                        checkedKeys={checkedKeys}
                                        onSelect={onSelect}
                                        selectedKeys={selectedKeys}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={16} align="center">
                                {/* Your content for the 2/3 part */}
                                <Row
                                    gutter={{
                                        xs: 8,
                                        sm: 16,
                                        md: 24,
                                        lg: 32,
                                    }}
                                >
                                    <Col span={12}>
                                        <Form.Item
                                            label="Name"
                                            name="name"
                                            autoComplete="off"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Admin Name Required!",
                                                },
                                            ]}
                                        >
                                            <Input
                                                prefix={
                                                    <UserOutlined className="site-form-item-icon" />
                                                }
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            name="phone"
                                            label="Phone"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Phone number required!",
                                                },
                                            ]}
                                        >
                                            <Input
                                                prefix={
                                                    <PhoneOutlined className="site-form-item-icon" />
                                                }
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            label="Email"
                                            name="email"
                                            autoComplete="off"
                                            rules={[
                                                {
                                                    type: "email",
                                                    message:
                                                        "The input is not valid E-mail!",
                                                },
                                                {
                                                    required: true,
                                                    message: "Email required!",
                                                },
                                            ]}
                                        >
                                            <Input
                                                autoComplete="off"
                                                prefix={
                                                    <MailOutlined className="site-form-item-icon" />
                                                }
                                            />
                                        </Form.Item>
                                    </Col>
                                    {!admin_id && (
                                        <Col span={12}>
                                            <Form.Item
                                                label="Password"
                                                name="password"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            "Password required!",
                                                    },
                                                ]}
                                            >
                                                <Input.Password
                                                    autoComplete="off"
                                                    prefix={
                                                        <LockOutlined className="site-form-item-icon" />
                                                    }
                                                    type="password"
                                                    placeholder="Password"
                                                />
                                            </Form.Item>
                                        </Col>
                                    )}

                                    <Col span={12}>
                                        <Form.Item
                                            label="Role"
                                            name="roles"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Role Required!",
                                                },
                                            ]}
                                        >
                                            <Select
                                                mode="multiple"
                                                style={{
                                                    width: "100%",
                                                }}
                                                placeholder="Please select role"
                                                onChange={roleSelectHandler}
                                                options={options}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Form>
                </Card>
            </>
        </AnimatedLayout>
    );
};

export default Registration;
