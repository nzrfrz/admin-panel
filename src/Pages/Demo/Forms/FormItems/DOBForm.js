import React from "react";
import { 
    theme, 
    Form,
    Input,
    Typography,
    DatePicker,
} from 'antd';

import dayjs from "dayjs";

const { Text, Title } = Typography;

export const DOBForm = () => {
    return (
        <Form.Item
            name="dateOfBirth"
            label="Date Of Birth"
            // rules={[
            //     {
            //         type: "object",
            //         required: true,
            //         message: "Date Of Birth can not be empty"
            //     }
            // ]}
        >
            <DatePicker 
                format="YYYY/MM/DD"
                style={{
                    width: "100%"
                }}            
            />
        </Form.Item>
    );
};