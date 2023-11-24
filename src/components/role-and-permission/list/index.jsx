import { Fragment, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import endpoints from "../../../config/api/endpoints";
import { Button, Flex, Popconfirm, Space, Table, Typography } from "antd";
import { commonApi, useGetDataQuery } from "../../../config/api";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Detail from "../detail";
import AnimatedLayout from "../../common/animated-layout";
import ResizableAntTable from "../../common/resizable-ant-table";
import AppAlert from "../../common/alert";
import { useDispatch } from "react-redux";

const List = () => {
    const [detailName, setDetailName] = useState("");
    const [allPermissions, setAllPermissions] = useState(null);
    const targetRef = useRef(null);
    const { t } = useTranslation("form");
    const rolesEndpoint = endpoints.rolesEndpoint;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [errorStatus, setErrorStatus] = useState(false);
    const [msg, setMsg] = useState("");

    const { data } = useGetDataQuery(rolesEndpoint);
    const { data: permissionListData } = useGetDataQuery(
        `${endpoints.permissionEndpoint}`,
    );

    useEffect(() => {
        setDetailName("");
    }, []);

    useEffect(() => {
        if (detailName && targetRef.current) {
            window.scrollTo({
                top: targetRef.current.offsetTop,
                behavior: "smooth",
            });
        }
    }, [detailName]);

    let counter = 1;
    const formattedData = data?.data.map((item, index) => ({
        no: counter++,
        id: item.id,
        role_name: item.name,
        key: index,
    }));

    const editHandler = (data) => {
        console.log("in edit", data);
        navigate("/role-and-permission/registration", {
            state: {
                editData: data,
            },
        });
    };

    const deleteHandler = async (data) => {
        console.log("in delete", data);
        try {
            const reqData = {
                endpoint: `${rolesEndpoint}/${data}`,
                method: "DELETE",
            };

            //You can use this method too
            const response = await dispatch(
                commonApi.endpoints.commonApi.initiate(reqData),
            );
            const { isSuccess, message } = response;
            setErrorStatus(isSuccess);
            setMsg(message);

            console.log(response);
        } catch (error) {
            setErrorStatus(false);
            setMsg("An Error Occured During Role delete");
        }
        console.log(reqData);
    };

    const detailHandler = (data) => {
        setDetailName(data);

        setAllPermissions(permissionListData?.data?.data);
    };

    const columns = [
        {
            title: `${t("no")}`,
            align: "center",
            dataIndex: "no",
            width: 1,
            responsive: ["md"],
        },
        {
            title: `${t("role-name")}`,
            dataIndex: "role_name",
            align: "center",
            width: 1,
            responsive: ["md"],
            render: (_, record) => (
                <a onClick={() => detailHandler(record)}>{record.role_name}</a>
            ),
        },
        {
            title: `${t("actions")}`,
            align: "center",
            width: 1,
            responsive: ["md"],
            render: (_, record) => (
                <Space size={"middle"}>
                    <Popconfirm
                        title="Are you sure to edit this role-permission?"
                        okText="Edit"
                        cancelText="No"
                        onConfirm={() => editHandler(record)}
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
                        onConfirm={() => deleteHandler(record.id)}
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

    return (
        <AnimatedLayout>
            <Fragment>
                {msg && (
                    <AppAlert
                        msg={msg}
                        status={errorStatus}
                        onClose={() => setMsg("")}
                    />
                )}
                <Typography.Title
                    style={{ marginTop: 0, marginBottom: 40 }}
                    level={2}
                >
                    {t("role-list")}
                </Typography.Title>
                <ResizableAntTable
                    size="small"
                    columns={columns}
                    data={formattedData}
                    bordered
                />
                <hr />
                {detailName && (
                    <div ref={targetRef}>
                        <Detail
                            allPermissions={
                                permissionListData?.data?.data || []
                            }
                            detailName={detailName}
                            setDetailName={setDetailName}
                        />
                    </div>
                )}
            </Fragment>
        </AnimatedLayout>
    );
};

export default List;
