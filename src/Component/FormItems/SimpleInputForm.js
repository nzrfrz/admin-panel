import React from "react";
import { 
    Form,
    Input,
} from 'antd';

export const SimpleInputForm = ({name, label, placeholder, validateStatus, help}) => {
    return (
        <Form.Item
            name={name}
            label={label}
            hasFeedback
            validateStatus={validateStatus}
            help={help}
            rules={[
                {
                    required: true,
                    message: `${label} can not be empty`
                }
            ]}
        >
            <Input
                placeholder={placeholder === undefined ? `Input ${label}` : placeholder}
                style={{
                    width: '100%',
                }}
            />
        </Form.Item>
    );
};