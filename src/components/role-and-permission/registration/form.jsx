import { useState, useEffect } from "react";
import { Form, Input, Flex, Button, Alert, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useCommonApiMutation } from "../../../config/api";
import endpoints from "../../../config/api/endpoints";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
    clearAllChecked,
    clearSelectedRoleData,
} from "../../../features/rolesSlice";
import Confirmation from "../../common/confirmation";

const RolePermissionForm = () => {
    // State variables
    const selectedRoleData = useSelector(
        (state) => state.roles.selectedRoleData,
    );
    const dispatch = useDispatch();
    const [roleName, setRoleName] = useState("");
    const [msg, setMsg] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [editStatus, setEditStatus] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    // API and translation hooks
    const [commonApi, { isLoading }] = useCommonApiMutation();
    const { state } = useLocation();
    const { t } = useTranslation("form");
    const { t: s } = useTranslation("sidebar");

    // Fetch and set role name when in edit mode
    useEffect(() => {
        if (state?.editData?.id) {
            setEditStatus(true);

            const role = state?.editData?.role_name;
            setRoleName(role);
        } else {
            setEditStatus(false);
        }
    }, [state?.editData?.role_name]);

    // Handle confirmation box
    const isConfirmSave = () => {
        setMsg("");
        setModalOpen(true);
    };

    // Handle save/update button click
    const handleSave = async () => {
        const id = state?.editData?.id;
        const endpoint = editStatus
            ? `${endpoints.rolesEndpoint}/${id}`
            : endpoints.rolesEndpoint;
        const method = editStatus ? "PUT" : "POST";

        const reqData = {
            endpoint,
            method,
            body: {
                name: roleName,
                permissions: selectedRoleData,
            },
        };

        // Make API request
        const response = await commonApi(reqData);

        // Handle API response
        if (response.data.isSuccess) {
            setRoleName("");
            dispatch(clearSelectedRoleData());
            dispatch(clearAllChecked());
            setEditStatus(false);
        }

        setIsSuccess(response.data.isSuccess);
        setMsg(response.data.message);
    };

    return (
        <>
            {/* Confirmation pop up */}
            <Confirmation
                modalTitle={
                    editStatus
                        ? "Are you sure you want to update?"
                        : "Are you sure you want to save?"
                }
                open={modalOpen}
                setOpen={setModalOpen}
                confirmAction={handleSave}
            />
            {/* Display success or error message */}
            {msg && (
                <Alert
                    style={{ marginBottom: 20 }}
                    message={msg}
                    type={isSuccess ? "success" : "error"}
                    showIcon
                    closable
                    onClose={() => setMsg("")}
                />
            )}

            {/* Header section */}
            <Flex justify="space-between" align="center">
                <Typography.Title style={{ marginTop: 0 }} level={2}>
                    {s("role-and-permission")}
                </Typography.Title>
                <Button
                    type="primary"
                    onClick={isConfirmSave}
                    disabled={isLoading}
                >
                    {t(!editStatus ? "save" : "update")}
                </Button>
            </Flex>

            {/* Form section */}
            <Form
                layout="vertical"
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 10 }}
            >
                <Form.Item label="Role Name" required>
                    <Input
                        placeholder="Enter Role Name"
                        value={roleName}
                        onChange={(i) => setRoleName(i.target.value)}
                        disabled={editStatus}
                    />
                </Form.Item>
            </Form>
        </>
    );
};

export default RolePermissionForm;
