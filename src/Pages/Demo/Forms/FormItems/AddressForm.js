import React from "react";
import { 
    theme, 
    Form,
    Input,
    Typography,
} from 'antd';

const { Text, Title } = Typography;

export const AddressForm = ({name, label}) => {
    return (
        <Form.Item
            name={name}
            label={label}
            // rules={[
            //     {
            //         required: true,
            //         message: "Address can not be empty"
            //     }
            // ]}
        >
            <Input.TextArea 
                autoSize={{
                    minRows: 2
                }}
            />
        </Form.Item>
    );
};