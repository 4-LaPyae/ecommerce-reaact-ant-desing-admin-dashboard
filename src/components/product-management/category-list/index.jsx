import { Fragment, useState } from "react";
import { Typography } from "antd";
import { useTranslation } from "react-i18next";
import { useCommonApiMutation, useGetDataQuery } from "../../../config/api";
import ResizableAntTable from "../../common/resizable-ant-table";
import AnimatedLayout from "../../common/animated-layout";
import endpoints from "../../../config/api/endpoints";
import CategoryTableColumns from "./columns";
import AppAlert from "../../common/alert";

const CategoryList = () => {
    // Translation hook
    const { t: s } = useTranslation("sidebar");

    // Fetching data and managing state
    const { data } = useGetDataQuery(endpoints.categoriesEndpoint);
    const [errorStatus, setErrorStatus] = useState(false);
    const [msg, setMsg] = useState("");

    // API mutation hook
    const [commonApi] = useCommonApiMutation();

    // Edit handler
    const handleEdit = (data) => {
        console.log("data", data);
    };

    // Delete handler
    const handleDelete = async (data) => {
        try {
            // Making DELETE request
            const response = await commonApi({
                endpoint: `${endpoints.categoriesEndpoint}/${data.id}`,
                method: "DELETE",
            });

            // Handling response
            setErrorStatus(response.data?.isSuccess);
            setMsg(response.data?.message);
        } catch (error) {
            // Handling error
            console.error("Error during delete:", error);
            setErrorStatus(false);
            setMsg("An error occurred during delete.");
        }
    };

    // Columns configuration
    const columns = CategoryTableColumns({ handleEdit, handleDelete });

    return (
        <AnimatedLayout>
            <Fragment>
                {/* Page title */}
                <Typography.Title
                    style={{ marginTop: 0, marginBottom: 40 }}
                    level={2}
                >
                    {s("category-list")}
                </Typography.Title>

                {/* Displaying alert message if any */}
                {msg && (
                    <AppAlert
                        msg={msg}
                        status={errorStatus}
                        onClose={() => setMsg("")}
                    />
                )}

                {/* Resizable Ant Table */}
                <ResizableAntTable
                    data={data?.data || []}
                    columns={columns}
                    size="small"
                />
            </Fragment>
        </AnimatedLayout>
    );
};

export default CategoryList;
