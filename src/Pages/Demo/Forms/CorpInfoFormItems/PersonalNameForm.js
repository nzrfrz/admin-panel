import React from "react";
import { 
    theme, 
    Form,
    Input,
    Typography,
} from 'antd';

const { Text, Title } = Typography;

export const PersonalNameForm = () => {
    return (
        <Form.Item
            name="personalName"
            label="Personal Name"
            // rules={[
            //     {
            //         required: true,
            //         message: "Personal name can not be empty"
            //     }
            // ]}
        >
            <Input />
        </Form.Item>
    );
};