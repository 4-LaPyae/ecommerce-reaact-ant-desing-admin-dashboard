import { Alert, Button, Col, Form, Input, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import endpoints from "../../config/api/endpoints";
import { useDispatch, useSelector } from "react-redux";
import { selectToken, selectUser } from "../../features/userSlice";
import { useCommonApiMutation } from "../../config/api";
// import { selectUpdatePermission } from "../../features/updateSlice";
// import { setUpdateData, clearUpdateData } from "../../features/updateSlice";
import Confirmation from "../common/confirmation";

const PermissionForm = ({ update, setUpdate }) => {
    const permissionEndpoint = endpoints.permissionEndpoint; //permission endpoint
    const [commonApi, { isLoading }] = useCommonApiMutation(); //
    const { t } = useTranslation("form");
    const { t: validation } = useTranslation("validation");
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const updateData = useSelector((state) => state.update.updatePermission); //get data for update
    const [alertFlag, setAlertFlag] = useState(false); //alert show hide flag
    const [alertMessage, setAlertMessage] = useState(""); //alert message for show
    const [alertStatus, setAlertStatus] = useState(false); //alert status for show hide
    const [modalOpen, setModalOpen] = useState(false); // show confirmation modal show hide
    const [confirmData, setConfirmData] = useState(null);

    useEffect(() => {
        // Update form fields when updateData changes
        form.setFieldsValue(updateData);
    }, [form, updateData]);

    const onFinish = async (values) => {
        setAlertFlag(false);
        setConfirmData(values);
        setModalOpen(true);
    };

    const permissionHandler = async () => {
        try {
            // if (!updateData) {  //get update data from redux store
            if (!update) {
                //get update data using props drilling

                //if updateData not have ,Create function work
                const response = await commonApi({
                    endpoint: permissionEndpoint,
                    method: "POST",
                    body: confirmData,
                });
                const { isSuccess, message } = response.data;
                setAlertStatus(isSuccess);
                if (isSuccess) {
                    dispatch(clearUpdateData());
                    form.resetFields();
                    setAlertMessage(message);
                    setAlertFlag(true);
                } else {
                    setAlertMessage(message);
                    setAlertFlag(true);
                }
            } else {
                //if updateData not have ,Update function work
                const response = await commonApi({
                    endpoint: `${permissionEndpoint}/${update?.key}`,
                    method: "PUT",
                    body: confirmData,
                });
                const { isSuccess, message } = response.data;
                setAlertStatus(isSuccess);

                if (!isSuccess) {
                    setAlertMessage(message);
                    setAlertFlag(true);
                } else {
                    dispatch(clearUpdateData());
                    form.resetFields();
                    setUpdate("");
                    setAlertMessage(message);
                    setAlertFlag(true);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const onFinishFailed = () => {
        setAlertFlag(false);
    };

    return (
        <>
            <Confirmation
                modalTitle={
                    update
                        ? "Are you sure you want to update this?"
                        : "Create a new permission?"
                }
                open={modalOpen}
                setOpen={setModalOpen}
                isLoading={isLoading}
                confirmAction={permissionHandler}
            />
            {alertFlag && (
                <Alert
                    message={alertMessage}
                    type={alertStatus ? "success" : "error"}
                    showIcon
                    closable
                    onClose={() => {
                        setAlertFlag(false);
                    }}
                />
            )}
            <Form
                form={form}
                wrapperCol={{
                    span: 20,
                }}
                name="myForm"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout="vertical"
                autoComplete="off"
                style={{
                    marginTop: "16px",
                }}
            >
                <Row gutter={16}>
                    {/* <Col xs={24} sm={24} lg={24} xl={9}>
						<Form.Item
							label={t('permission')}
							name='name'
							rules={[
								{
									required: true,
									message: validation('required').replace(
										'%s',
										t('permission')
									),
								},
							]}
						>
							<Input />
						</Form.Item>
					</Col> */}

                    <Col xs={24} sm={24} lg={24} xl={9}>
                        <Form.Item
                            label={t("group")}
                            name="group"
                            rules={[
                                {
                                    required: true,
                                    message: validation("required").replace(
                                        "%s",
                                        t("group"),
                                    ),
                                },
                            ]}
                        >
                            <Input
                                placeholder={"Enter Permission's Group Name"}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} lg={24} xl={6}>
                        <Form.Item
                            style={{
                                marginTop: "48px",
                            }}
                        >
                            <Button
                                type="primary"
                                htmlType="submit"
                                block
                                disabled={isLoading}
                            >
                                {update ? "Update " : "Save"}
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>

                {/* <Row style={{ marginTop: 20 }}> */}
                {/* <Col
						xs={{ span: 24, offset: 0 }}
						sm={{ span: 4, offset: 10 }}
					> */}

                {/* </Col>
				</Row> */}
            </Form>
        </>
    );
};

export default PermissionForm;
