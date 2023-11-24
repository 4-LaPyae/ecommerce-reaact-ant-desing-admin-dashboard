import { Table, Popconfirm, Space } from "antd";
import PropsTypes from "prop-types";
import { useGetDataQuery } from "../../config/api";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { clearUpdateData, setUpdateData } from "../../features/updateSlice";
import endpoints from "../../config/api/endpoints";
import { useDispatch } from "react-redux";
import { useCommonApiMutation } from "../../config/api";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const PermissionList = ({ setUpdate, scrollAction }) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [commonApi, { isLoading }] = useCommonApiMutation();
  const dispatch = useDispatch();
  const { t } = useTranslation("form");
  const endpoint = endpoints.permissionEndpoint;
  const { data, isLoading: permissionLoading } = useGetDataQuery(
    endpoint + `?page=${page}&limit=${limit}`
  );

  let counter = 1;
  let formattedData = [];

  for (let i = 0; i < data?.data?.length; i++) {
    const permissions = data.data[i].data;
    formattedData.push(
      ...permissions.map((permit, index) => ({
        no: counter++,
        key: permit.id,
        // id: permit.id,
        permission: permit.name,
        group: permit.group,
      }))
    );
  }

  const deleteHandler = async (data) => {
    try {
      const reqData = {
        endpoint: `${endpoint}/${data}`,
        method: "DELETE",
      };
      const response = await commonApi(reqData);
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      title: `${t("no")}`,
      dataIndex: "no",
      key: "id",
      align: "center",
    },
    {
      title: `${t("permission")}`,
      dataIndex: "permission",
      key: "permission",
    },
    {
      title: `${t("group")}`,
      dataIndex: "group",
      key: "group",
    },
    {
      title: "Actions",
      dataIndex: "action",
      key: "actions",
      align: "center",
      render: (_, record) => (
        <Space size={"middle"}>
          <Popconfirm
            title="Are you sure to edit this permission?"
            okText="Sure"
            cancelText="No"
            onConfirm={() => editHandler(record)}
          >
            <EditOutlined style={{ fontSize: "21px", color: "blue" }} />
          </Popconfirm>
          <Popconfirm
            title="Are you sure to delete this permission?"
            onConfirm={() => deleteHandler(record.key)}
            okText="Delete"
            cancelText="Cancle"
          >
            <DeleteOutlined style={{ fontSize: "21px", color: "red" }} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table
      pagination={
        {
          // total: data?.data[0].total_count,
          // onChange: (page, limit) => {
          // 	setPage(page)
          // 	setLimit(limit)
          // },
        }
      }
      style={{ marginTop: 40 }}
      dataSource={formattedData}
      columns={columns}
      bordered
    />
  );
};

export default PermissionList;
