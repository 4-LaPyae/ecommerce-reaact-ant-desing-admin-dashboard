import { Fragment, useState } from "react";
import { useGetDataQuery, useCommonApiMutation } from "../../../config/api";
import endpoints from "../../../config/api/endpoints";
import AnimatedLayout from "../../common/animated-layout";
import { Alert, Button, Popconfirm, Table, Tag, Typography } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { Space } from "antd";
import defaultTheme from "../../../themes/default-theme";
import { useNavigate } from "react-router-dom";
import ResizableAntTable from "../../common/resizable-ant-table";

const List = () => {
    const { t } = useTranslation("form");
    const { data } = useGetDataQuery(endpoints.adminEndpoint);
    const [commonApi] = useCommonApiMutation();
    const [alertMessage, setAlertMessage] = useState(""); //alert message for show
    const [alertFlag, setAlertFlag] = useState(false); //alert show hide flag
    const [alertStatus, setAlertStatus] = useState(false); //alert status for show hide
    const navigate = useNavigate();

    const editHandler = (data) => {
        console.log("edit clicked", data);
        navigate("/admin-management/admin-registration", {
            state: {
                adminId: data,
            },
        });
    };

    const deleteHandler = async (data) => {
        try {
            const reqData = {
                endpoint: `${endpoints.adminEndpoint}/${data}`,
                method: "DELETE",
            };
            console.log(reqData);
            const response = await commonApi(reqData);
            const { isSuccess, message } = response.data;
            if (!isSuccess) {
                setAlertMessage(message);
                setAlertFlag(true);
            } else {
                setAlertStatus(true);
                setAlertFlag(true);
                setAlertMessage(message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const columns = [
        {
            title: `${t("no")}`,
            align: "center",
            width: 1,
            dataIndex: "no",
            responsive: ["md"],
        },
        {
            title: `${t("admin-name")}`,
            dataIndex: "admin_name",
            width: 1,
            responsive: ["md"],
        },
        {
            title: `${t("admin-email")}`,
            dataIndex: "admin_email",
            width: 1,
            responsive: ["md"],
        },
        {
            title: `${t("admin-phone")}`,
            dataIndex: "admin_phone",
            width: 1,
            responsive: ["md"],
        },
        {
            title: `${t("admin-roles")}`,
            dataIndex: "admin_roles",
            width: 1,
            responsive: ["md"],
            render: (_, record) => {
                const adminRoles = record.admin_roles;

                return (
                    <Space>
                        {adminRoles?.map((role) => (
                            <Tag
                                color={defaultTheme.token.colorPrimary}
                                bordered
                                key={role.id}
                            >
                                {role.name}
                            </Tag>
                        ))}
                    </Space>
                );
            },
        },
        {
            title: `${t("actions")}`,
            align: "center",
            render: (_, record) => (
                <Space size={"middle"}>
                    <Popconfirm
                        title="Are you sure to edit this role-permission?"
                        okText="Edit"
                        cancelText="No"
                        onConfirm={() => editHandler(record.key)}
                    >
                        <Button
                            type="text"
                            icon={
                                <EditOutlined
                                    style={{ fontSize: "21px", color: "blue" }}
                                />
                            }
                        />
                    </Popconfirm>
                    <Popconfirm
                        title="Are your sure to delete this role-permission?"
                        okText="Delete"
                        cancelText="Cancle"
                        onConfirm={() => deleteHandler(record.no)}
                    >
                        <Button
                            type="text"
                            icon={
                                <DeleteOutlined
                                    style={{ fontSize: "21px", color: "red" }}
                                />
                            }
                        />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const withoutSuperAdmin = data?.data.filter((item) => item.id !== 1);
    const formattedData = withoutSuperAdmin?.map((item, index) => ({
        no: index + 1,
        key: item.id,
        admin_name: item.name,
        admin_email: item.email,
        admin_phone: item.phone,
        admin_roles: item.roles,
    }));

    return (
        <AnimatedLayout>
            <Fragment>
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
                <Typography.Title level={2}>{t("admin-list")}</Typography.Title>
                <hr />

                <ResizableAntTable
                    size="small"
                    columns={columns || []}
                    bordered
                    data={formattedData}
                />
            </Fragment>
        </AnimatedLayout>
    );
};

export default List;
