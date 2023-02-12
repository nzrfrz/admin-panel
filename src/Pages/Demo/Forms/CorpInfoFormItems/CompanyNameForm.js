import React from "react";
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

const { Text, Title } = Typography;

export const CompanyNameForm = () => {
    return (
        <Form.Item
            name="companyName"
            label="Company Name"
            // rules={[
            //     {
            //         required: true,
            //         message: "Company name can not be empty"
            //     }
            // ]}
        >
            <Input />
        </Form.Item>
    );
};