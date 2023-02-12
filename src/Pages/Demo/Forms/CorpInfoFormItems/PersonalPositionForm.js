import React from "react";
import { 
    theme, 
    Form,
    Input,
    Typography,
} from 'antd';

const { Text, Title } = Typography;

export const PersonalPositionForm = () => {
    return (
        <Form.Item
            name="position"
            label="Position"
            // rules={[
            //     {
            //         required: true,
            //         message: "Position can not be empty"
            //     }
            // ]}
        >
            <Input />
        </Form.Item>
    );
};