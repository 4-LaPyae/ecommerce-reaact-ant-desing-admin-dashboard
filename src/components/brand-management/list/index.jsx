import { useTranslation } from "react-i18next";
import { useCommonApiMutation, useGetDataQuery } from "../../../config/api";
import endpoints from "../../../config/api/endpoints";
import ResizableAntTable from "../../common/resizable-ant-table";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import AnimatedLayout from "../../common/animated-layout";
import {
    Avatar,
    Button,
    Popconfirm,
    Space,
    Typography,
    Tooltip,
    Image,
} from "antd";
import { scrollAction } from "../../../utils/helper";

const List = ({ setMsg, setErrorStatus, setUpdateData }) => {
    const { t } = useTranslation("form");
    const { data } = useGetDataQuery(endpoints.brandEndpoint);

    const [commonApi] = useCommonApiMutation();

    const editHandler = (data) => {
        console.log(data);
        setUpdateData(data);
        scrollAction();
    };

    const deleteHandler = async (data) => {
        console.log(data);
        try {
            const reqData = {
                endpoint: `${endpoints.brandEndpoint}/${data}`,
                method: "DELETE",
            };

            const response = await commonApi(reqData);
            console.log({ response });
            setMsg(response?.data?.message);
            setErrorStatus(!response?.data?.isSuccess);
        } catch (error) {
            console.log("in catch block of deletehandler");
            setErrorStatus(true);
            setMsg(error.message || "An Error Occurred");
        }
    };

    const columns = [
        {
            title: `${t("no")}`,
            align: "center",
            width: 1,
            responsive: ["md"],
            render: (_, record, index) => index + 1,
        },
        {
            title: `${t("brand-image")}`,
            width: 1,
            dataIndex: "brandImageUrl",
            responsive: ["md"],
            render: (text, record) => {
                return (
                    <Image
                        width={80}
                        src={
                            text ||
                            "https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg"
                        }
                    />
                );
            },
        },
        {
            title: `${t("brand-name")}`,
            width: 1,
            dataIndex: "brandName",
            responsive: ["md"],
        },

        {
            title: `${t("actions")}`,
            align: "center",
            render: (_, record) => (
                <Space size={"middle"}>
                    <Popconfirm
                        title="Are you sure to edit this Brand?"
                        okText="Edit"
                        cancelText="No"
                        onConfirm={() => editHandler(record)}
                    >
                        <Tooltip placement="topRight" title={"Edit"}>
                            <Button
                                type="text"
                                icon={
                                    <EditOutlined
                                        style={{
                                            fontSize: "21px",
                                            color: "blue",
                                        }}
                                    />
                                }
                            />
                        </Tooltip>
                    </Popconfirm>
                    <Popconfirm
                        title="Are your sure to delete this Brand?"
                        okText="Delete"
                        cancelText="Cancle"
                        onConfirm={() => deleteHandler(record?.key)}
                    >
                        <Tooltip placement="topRight" title={"Delete"}>
                            <Button
                                type="text"
                                icon={
                                    <DeleteOutlined
                                        style={{
                                            fontSize: "21px",
                                            color: "red",
                                        }}
                                    />
                                }
                            />
                        </Tooltip>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const formattedData = data?.data;

    return (
        <>
            <Typography.Title level={2}>{t("brand-list")}</Typography.Title>
            <ResizableAntTable
                data={data?.data || []}
                size="small"
                bordered
                columns={columns}
            />
        </>
    );
};

export default List;
