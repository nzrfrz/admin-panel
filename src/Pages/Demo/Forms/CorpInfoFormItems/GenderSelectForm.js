import React from "react";
import { 
    Typography,
    Form,
    Select,
} from 'antd';

const { Text, Title } = Typography;

export const GenderSelectForm = () => {
    return (
        <Form.Item
            name="gender" 
            label="Gender"
            // rules={[
            //     {
            //         required: true,
            //         message: "Gender can not be empty"
            //     }
            // ]}
        >
            <Select>
                <Select.Option value="male">Male</Select.Option>
                <Select.Option value="female">Female</Select.Option>
            </Select>
        </Form.Item>
    );
};