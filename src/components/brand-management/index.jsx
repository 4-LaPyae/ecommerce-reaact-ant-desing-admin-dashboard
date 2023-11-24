import { Fragment, useState, useEffect } from "react";
import BrandList from "./list/index";
import { Form, Typography, Button, Input, Alert } from "antd";
import AnimatedLayout from "../common/animated-layout";
import FileUpload from "../product-management/category-registration/file-upload";
import { useTranslation } from "react-i18next";
import endpoints from "../../config/api/endpoints";
import { useCommonApiMutation } from "../../config/api";
import { use } from "i18next";

const Registration = () => {
    const { t: f } = useTranslation("form");
    const [form] = Form.useForm();
    const [updateData, setUpdateData] = useState("");
    const [msg, setMsg] = useState("");
    const [fileList, setFileList] = useState([]);
    const [errorStatus, setErrorStatus] = useState(false);
    const [commonApi] = useCommonApiMutation();

    useEffect(() => {
        form.setFieldsValue({
            brandName: updateData.brandName,
            brand_image: updateData.brandImageUrl,
        });
        setFileList;
        return setFileList([]);
    }, [updateData]);

    console.log({ updateData });

    const onFinish = async (values) => {
        const formData = new FormData();

        for (const key in values) {
            formData.append(key, values[key]);
        }

        if (updateData) {
            console.log("in update", values);
        } else {
            console.log("in create", values);
        }

        if (fileList && fileList.length > 0) {
            const imgFile = fileList[0].originFileObj;
            console.log(imgFile);
            formData.append("brand_image", imgFile);
        }

        const reqData = {
            endpoint: updateData
                ? `${endpoints.brandEndpoint}/${updateData.id}`
                : `${endpoints.brandEndpoint}`,
            method: updateData ? "PUT" : "POST",
            body: formData,
        };

        try {
            const response = await commonApi(reqData);

            setErrorStatus(!response.data.isSuccess);
            setMsg(response.data?.message);

            if (response.data.isSuccess) {
                form.resetFields();
                setFileList([]);
            }
        } catch (error) {
            setErrorStatus(true);
            setMsg(error.message || "An Error Occurred");
        }
    };

    const handleFileChange = (fileList) => {
        setMsg("");
        setFileList(fileList);
    };

    return (
        <AnimatedLayout>
            <Fragment>
                {msg && (
                    <Alert
                        message={msg}
                        type={errorStatus ? "error" : "success"}
                        closable
                        onClose={() => setMsg("")}
                        style={{ marginBottom: 30 }}
                    />
                )}
                <Form
                    onFinish={onFinish}
                    form={form}
                    labelCol={{ sm: { span: 9 }, md: { span: 6 } }}
                    wrapperCol={{ span: 12 }}
                >
                    {/* <Typography.Title level={2}>Form</Typography.Title> */}

                    <Form.Item
                        label="Brand Name"
                        name="brandName"
                        rules={[
                            {
                                required: true,
                                message: "Brand Name required!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item label="Brand Image" name="brand_image">
                        <FileUpload
                            setErrorStatus={setErrorStatus}
                            onFileChange={handleFileChange}
                            buttonText={f("click-to-upload")}
                            setMsg={setMsg}
                        />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 6, span: 12 }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{ marginTop: 20 }}
                        >
                            {updateData ? f("update") : f("save")}
                        </Button>
                    </Form.Item>
                </Form>
                <hr />
                <BrandList
                    setErrorStatus={setErrorStatus}
                    setMsg={setMsg}
                    setUpdateData={setUpdateData}
                />
            </Fragment>
        </AnimatedLayout>
    );
};

export default Registration;
