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

export const FormEmail = ({initialValue}) => {
    
    return (
        <Form.Item
            name="email"
            label="E-mail"
            rules={[
                {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                },
                {
                    required: true,
                    message: 'Please input your E-mail!',
                },
            ]}
        >
            <Input />
        </Form.Item>
    );
};