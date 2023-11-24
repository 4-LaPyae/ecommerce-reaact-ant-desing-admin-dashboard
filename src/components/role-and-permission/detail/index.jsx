import { Flex, Typography } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import "../registration/table.css";
import DetailTableHeader from "./table-header";
import DetailTableBody from "./table-body";
import { useGetDataQuery } from "../../../config/api";
import endpoints from "../../../config/api/endpoints";

const Detail = ({ allPermissions, detailName, setDetailName }) => {
    const endpoint = endpoints.rolesEndpoint;
    const { data } = useGetDataQuery(endpoint + `/${detailName?.id}`);
    const detailPermissionIdList = data?.data?.permissions;

    const filteredArray = allPermissions?.map((group) => ({
        group: group?.group,
        data: group?.data?.filter((item) =>
            detailPermissionIdList?.includes(item.id),
        ),
    }));

    return (
        <>
            <Flex
                justify="space-between"
                align="center"
                style={{ marginTop: "20px" }}
            >
                <Typography.Title level={2}>
                    {detailName?.role_name}'s Role Detail
                </Typography.Title>

                <CloseCircleOutlined
                    style={{ fontSize: "24px", color: "red" }}
                    onClick={() => setDetailName("")}
                />
            </Flex>
            <div className="table table-container">
                <table>
                    <thead>
                        <DetailTableHeader />
                    </thead>
                    <tbody>
                        <DetailTableBody data={filteredArray} />
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Detail;
