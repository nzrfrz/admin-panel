import React, { useContext } from "react";
import { 
    theme,
    Layout, 
    Menu, 
    Typography, 
    Breadcrumb, 
    Dropdown,
    Button,
    Divider,
    Form,
    Input,
} from 'antd';
import { ThemeContext } from "../../../App";

import { FormSelect } from "./FormInputComp";

const { Text, Title } = Typography;

export const SplitForm = () => {
    const { isDarkMode } = useContext(ThemeContext);

    const [form] = Form.useForm();

    const onFinish = (values) => {
        form.resetFields();
        console.log('Received values of form: ', values);
    };

    const {
        token: { 
            borderRadiusLG,
        },
    } = theme.useToken();

    return (
        <div 
            className="split-forms-container"
            style={{
                "--bgc": isDarkMode === true ? "var(--contentContainerDarkMode)" : "var(--contentContainerLightMode)"
            }}
        >
            <div 
                className="split-forms-left-side"
                style={{
                    borderRadius: borderRadiusLG,
                }}
            >
                <Title level={3}>Form Left Side</Title>
                <Form
                    form={form}
                    labelCol={{ span: 10 }}
                    wrapperCol={{ span: 16 }}
                    onFinish={onFinish}
                    style={{
                        width: "auto",
                    }}
                    scrollToFirstError
                >
                    <Form.Item
                        name="companyName"
                        label="Company Name"
                        rules={[
                            {
                                required: true,
                                message: "Company name can not be empty"
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <FormSelect />

                </Form>
            </div>
            <div 
                className="split-forms-right-side"
                style={{
                    borderRadius: borderRadiusLG,
                }}
            >
                <Title level={3}>Form Right Side</Title>
                <Form
                    form={form}
                    labelCol={{ span: 10 }}
                    wrapperCol={{ span: 16 }}
                    onFinish={onFinish}
                    style={{
                        width: "auto",
                    }}
                    scrollToFirstError
                >
                    <Form.Item
                        name="userName"
                        label="User Name"
                        rules={[
                            {
                                required: true,
                                message: "User name can not be empty"
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        style={{
                            display: "flex",
                            justifyContent: "flex-end"
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Register
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};