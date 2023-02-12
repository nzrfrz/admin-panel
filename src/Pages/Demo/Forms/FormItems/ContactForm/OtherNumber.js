import React, { useEffect, useMemo, useState } from "react";
import { 
    theme, 
    Form,
    Input,
    Typography,
    Select,
    InputNumber
} from 'antd';

import { getDialCode } from "../../../../../_services/dialCodeData";

const { Option } = Select;

export const OtherNumber = ({name, label}) => {
    const [dialCode, setDialCode] = useState([]);

    useEffect(() => {
        getDialCode(setDialCode);
    }, []);

    return (
        <Form.Item
        label={label}
        >
            <Input.Group compact>
                <Form.Item
                    name={[name, 'areaCode']}
                    noStyle
                    // rules={[
                    //     {
                    //         required: true,
                    //         message: 'Area Code can not be empty',
                    //     },
                    // ]}
                >
                    <InputNumber
                        controls={false}
                        placeholder="Code"
                        style={{
                            width: '30%',
                        }}
                    />
                </Form.Item>
                <Form.Item
                    noStyle
                    name={[name, 'phoneNumber']}
                    // rules={[
                    //     {
                    //         required: true,
                    //         message: 'Phone Number can not be empty',
                    //     },
                    // ]}
                >
                    <InputNumber
                        controls={false}
                        placeholder="Input Phone Number"
                        style={{
                            width: '70%',
                        }}
                    />
                </Form.Item>
            </Input.Group>
        </Form.Item>
    );
};