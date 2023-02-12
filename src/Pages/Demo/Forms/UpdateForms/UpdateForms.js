import React, { useContext, useEffect, useState } from "react";
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

import { ThemeContext } from "../../../../App";

import { MockUserTable } from "./MockUserTable";

import { EmailForm } from "../FormItems";

const { Text, Title } = Typography;

export const UpdateForms = () => {
    const { isDarkMode } = useContext(ThemeContext);

    const [selectedTableRow, setSelectedTableRow] = useState(undefined);
    const [formFieldValue, setFormFieldValue] = useState(undefined);

    const [form] = Form.useForm();

    const onFinish = (values) => {
        form.resetFields();
        setFormFieldValue(values);
        console.log('Received values of form: ', values);
        // return values;
    };

    // console.log(formFieldValue);

    const {
        token: { 
            borderRadiusLG,
        },
    } = theme.useToken();

    return (
        <div 
            className="update-form-container"
            style={{
                "--bgc": isDarkMode === true ? "var(--contentContainerDarkMode)" : "var(--contentContainerLightMode)"
            }}
        >
            <div 
                className="user-table-container" 
                style={{ 
                    borderRadius: borderRadiusLG 
                }}
            >
                <Title level={3}>User Data</Title>
                <MockUserTable 
                    form={form}
                    setSelectedTableRow={setSelectedTableRow}
                />
            </div>
            <div 
                className="form-update-container"
                style={{ 
                    borderRadius: borderRadiusLG 
                }}
            >
                <Title level={3}>Edit User</Title>
                <Form
                    form={form}
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 24 }}
                    onFinish={onFinish}
                    style={{
                        width: "auto",
                    }}
                    scrollToFirstError
                >
                    <Form.Item
                        name="name"
                        label="Name"
                    >
                        <Input />
                    </Form.Item>

                    <EmailForm />

                    <Form.Item
                        style={{
                            display: "flex",
                            justifyContent: "flex-end"
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Update
                        </Button>
                    </Form.Item>
                </Form>
                <div className="form-value-cotnainer">
                    {
                        formFieldValue !== undefined &&
                        <Text>
                            <pre>{JSON.stringify(formFieldValue, null, 2) }</pre>
                        </Text>
                    }
                </div>
            </div>
        </div>
    );
};