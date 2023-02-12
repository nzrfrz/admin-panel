import React, { useContext, useEffect } from "react";
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

import { EmailForm, PasswordForm } from "./FormItems";

const { Text, Title } = Typography;

export const RegistrationForms = () => {
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

    // console.log(isDarkMode);

    return (
        <div 
            className="form-container"
            style={{
                borderRadius: borderRadiusLG,
                "--bgc": isDarkMode === true ? "var(--contentContainerDarkMode)" : "var(--contentContainerLightMode)"
            }}
        >
            <Form
                form={form}
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 16 }}
                onFinish={onFinish}
                style={{
                    width: 600,
                }}
                scrollToFirstError
            >
                <PasswordForm
                    withConfirmPassword={true}
                />

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};