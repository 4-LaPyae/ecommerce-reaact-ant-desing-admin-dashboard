import { Fragment } from "react";
import AnimatedLayout from "../../common/animated-layout";
import {
    Form,
    Input,
    Select,
    Checkbox,
    Button,
    Upload,
    Typography,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const { Option } = Select;

const SubCategoryRegistration = () => {
    const { t: s } = useTranslation("sidebar");
    const { t: f } = useTranslation("form");

    const onFinish = (values) => {
        // Handle form submission here
        // You can use the form data to make an API request or perform other actions
        console.log("Received values:", values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    return (
        <AnimatedLayout>
            <Fragment>
                <Typography.Title
                    style={{ marginTop: 0, marginBottom: 40 }}
                    level={2}
                >
                    {s("sub-category-registration")}
                </Typography.Title>

                <Form
                    name="category_registration"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    labelCol={{ sm: { span: 9 }, md: { span: 6 } }}
                    wrapperCol={{ span: 12 }}
                >
                    <Form.Item
                        label={f("category-name-en")}
                        name="categoryNameEn"
                        rules={[
                            {
                                required: true,
                                message: "Please enter the category name!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label={f("category-name-mm")}
                        name="categoryNameMm"
                        rules={[
                            {
                                required: true,
                                message: "Please enter the category name!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label={f("category-name-zh")}
                        name="categoryNameZh"
                        rules={[
                            {
                                required: true,
                                message: "Please enter the category name!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item label="Parent Category" name="parentCategory">
                        <Select>
                            <Option value="">None</Option>
                            {/* Include options dynamically if you have parent categories */}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Category Image"
                        name="categoryImage"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                    >
                        <Upload
                            name="categoryImage"
                            beforeUpload={() => false} // Prevent default upload behavior
                            listType="picture"
                        >
                            <Button icon={<UploadOutlined />}>
                                Click to upload
                            </Button>
                        </Upload>
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

export default SubCategoryRegistration;
