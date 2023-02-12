import React from "react";
import { 
    Typography,
    Form,
    Select,
    InputNumber,
    DatePicker,
} from 'antd';

const { Text, Title } = Typography;
const { RangePicker } = DatePicker;

export const DateRangeForm = ({name, label, validateStatus, help}) => {
    return (
        <Form.Item
            name={name}
            label={label}
            validateStatus={validateStatus}
            help={help}
            // rules={[
            //     {
            //         required: true,
            //         message: `${label} can not be empty`
            //     }
            // ]}
        >
            <RangePicker 
                placeholder={["Start", "End"]}
                style={{
                    width: "100%"
                }}
            />
        </Form.Item>
    );
};