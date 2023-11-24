import { Image, Popconfirm, Space, Button, Tag, Tooltip } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const CategoryTableColumns = ({ handleEdit, handleDelete }) => {
    const { t } = useTranslation("form");

    // Column definitions
    const columns = [
        {
            title: t("image"),
            dataIndex: "categoryImageUrl",
            width: 1,
            render: (text, record) => (
                <Image
                    src={
                        text ||
                        "https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg"
                    }
                    alt={`Category Image - ${record.categoryName_en}`}
                />
            ),
        },
        {
            title: t("category-name-en"),
            dataIndex: "categoryName_en",
            width: 1,
            render: (text) => (
                <div
                    style={{ wordWrap: "break-word", wordBreak: "break-word" }}
                >
                    {text}
                </div>
            ),
        },
        {
            title: t("category-name-mm"),
            dataIndex: "categoryName_mm",
            width: 1,
            render: (text) => (
                <div
                    style={{ wordWrap: "break-word", wordBreak: "break-word" }}
                >
                    {text}
                </div>
            ),
        },
        {
            title: t("category-name-zh"),
            dataIndex: "categoryName_zh",
            width: 1,
            render: (text) => (
                <div
                    style={{ wordWrap: "break-word", wordBreak: "break-word" }}
                >
                    {text}
                </div>
            ),
        },
        {
            title: t("status"),
            dataIndex: "status",
            width: 1,
            align: "center",
            render: (text) => (
                <Tag color={text ? "green" : "red"}>
                    {text ? t("Enabled") : t("Disabled")}
                </Tag>
            ),
        },
        {
            title: t("actions"),
            dataIndex: "action",
            width: 1,
            responsive: ["md"],
            align: "center",
            render: (_, record) => (
                <Space size="middle">
                    {renderEditButton(record)}
                    {renderDeleteButton(record)}
                </Space>
            ),
        },
    ];

    // Render Edit button with Popconfirm and Tooltip
    function renderEditButton(record) {
        return (
            <Popconfirm
                title={t("edit-confirmation")}
                okText={t("ok")}
                cancelText={t("cancel")}
                onConfirm={() => handleEdit(record)}
            >
                <div>
                    <Tooltip title={t("edit")}>
                        <Button
                            type="text"
                            icon={
                                <EditOutlined
                                    style={{ fontSize: "21px", color: "blue" }}
                                />
                            }
                        />
                    </Tooltip>
                </div>
            </Popconfirm>
        );
    }

    // Render Delete button with Popconfirm and Tooltip
    function renderDeleteButton(record) {
        return (
            <Popconfirm
                title={t("delete-confirmation")}
                onConfirm={() => handleDelete(record)}
                okText={t("ok")}
                cancelText={t("cancel")}
            >
                <div>
                    <Tooltip title={t("delete")}>
                        <Button
                            type="text"
                            icon={
                                <DeleteOutlined
                                    style={{ fontSize: "21px", color: "red" }}
                                />
                            }
                        />
                    </Tooltip>
                </div>
            </Popconfirm>
        );
    }

    return columns;
};

export default CategoryTableColumns;
