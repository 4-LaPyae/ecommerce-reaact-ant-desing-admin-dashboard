import { Fragment, useState } from "react";
import AnimatedLayout from "../../common/animated-layout";
import {
    Form,
    Input,
    InputNumber,
    Button,
    Typography,
    Alert,
    Radio,
} from "antd";
import { useTranslation } from "react-i18next";
import { useCommonApiMutation } from "../../../config/api";
import endpoints from "../../../config/api/endpoints";
import FileUpload from "./file-upload";

const CategoryRegistration = () => {
    // Hooks for state management
    const { t: s } = useTranslation("sidebar");
    const { t: f } = useTranslation("form");
    const [errorStatus, setErrorStatus] = useState(false);
    const [msg, setMsg] = useState("");
    const [fileList, setFileList] = useState([]);

    const statusOptions = [
        { value: true, label: "Enable" },
        { value: false, label: "Disable" },
    ];

    // API mutation hook
    const [commonApi] = useCommonApiMutation();
    const [form] = Form.useForm();

    // Handles form submission
    const onFinish = async (values) => {
        // Create FormData to handle file uploads
        const formData = new FormData();

        // Loop through values and append them to FormData
        for (const key in values) {
            formData.append(key, values[key]);
        }

        // If there is a file selected, append it to FormData
        if (fileList && fileList.length > 0) {
            const imgFile = fileList[0].originFileObj;
            formData.append("category_icon", imgFile);
        }

        // Define API request data
        const reqData = {
            endpoint: endpoints.categoriesEndpoint,
            method: "POST",
            body: formData,
        };

        try {
            // Make API request
            const response = await commonApi(reqData);

            // Update state based on API response
            setErrorStatus(!response.data.isSuccess);
            setMsg(response.data?.message);

            // If API request is successful, reset form and clear file selection
            if (response.data.isSuccess) {
                form.resetFields();
                setFileList([]);
            }
        } catch (error) {
            // Handle API request error
            const errorMessage = error.message || "An error occurred.";
            setErrorStatus(true);
            setMsg(errorMessage);
        }
    };

    // Handles form submission failure
    const onFinishFailed = (errorInfo) => {
        setMsg("");
        console.log("Failed:", errorInfo);
    };

    // Handles file change in FileUpload component
    const handleFileChange = (fileList) => {
        setMsg("");
        setFileList(fileList);
    };

    return (
        <AnimatedLayout>
            <Fragment>
                <Typography.Title
                    style={{ marginTop: 0, marginBottom: 40 }}
                    level={2}
                >
                    {s("category-registration")}
                </Typography.Title>

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
                    form={form}
                    initialValues={{ status: true, sort: 1 }}
                    name="category_registration"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    labelCol={{ sm: { span: 9 }, md: { span: 6 } }}
                    wrapperCol={{ span: 12 }}
                >
                    <Form.Item
                        label={f("category-name-en")}
                        name="categoryName_en"
                        rules={[
                            {
                                required: true,
                                message: "Please enter the category name!",
                            },
                        ]}
                    >
                        <Input maxLength={255} />
                    </Form.Item>

                    <Form.Item
                        label={f("category-name-mm")}
                        name="categoryName_mm"
                        rules={[
                            {
                                required: true,
                                message: "Please enter the category name!",
                            },
                        ]}
                    >
                        <Input maxLength={255} />
                    </Form.Item>

                    <Form.Item
                        label={f("category-name-zh")}
                        name="categoryName_zh"
                        rules={[
                            {
                                required: true,
                                message: "Please enter the category name!",
                            },
                        ]}
                    >
                        <Input maxLength={255} />
                    </Form.Item>

                    <Form.Item label={f("sort")} name="sort">
                        <InputNumber
                            style={{
                                width: "100%",
                            }}
                        />
                    </Form.Item>

                    <Form.Item label={f("status")} name="status">
                        <Radio.Group>
                            {statusOptions.map((option) => (
                                <Radio key={option.value} value={option.value}>
                                    {option.label}
                                </Radio>
                            ))}
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item label={f("category-image")}>
                        <FileUpload
                            onFileChange={handleFileChange}
                            setErrorStatus={setErrorStatus}
                            setMsg={setMsg}
                            buttonText={f("click-to-upload")}
                        />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 6, span: 12 }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{ marginTop: 20 }}
                        >
                            {f("save")}
                        </Button>
                    </Form.Item>
                </Form>
            </Fragment>
        </AnimatedLayout>
    );
};

export default CategoryRegistration;
