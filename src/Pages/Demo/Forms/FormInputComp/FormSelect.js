import React from "react";
import { 
    Typography,
    Form,
    Select,
} from 'antd';

const { Text, Title } = Typography;

export const FormSelect = () => {
    return (
        <Form.Item
            name="gender" 
            label="Select"
        >
            <Select>
                <Select.Option value="male">Male</Select.Option>
                <Select.Option value="female">Female</Select.Option>
            </Select>
        </Form.Item>
    );
};