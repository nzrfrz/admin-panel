import React, { useEffect, useMemo, useState } from "react";
import { 
    theme, 
    Form,
    Input,
    Typography,
    Select,
    InputNumber
} from 'antd';

import { ReactCountryFlag } from "react-country-flag"

import { getDialCode } from "../../../../../_services/dialCodeData";

const { Option } = Select;

export const MobileNumber = ({name, label}) => {
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
                    <Select 
                        showSearch
                        allowClear
                        placeholder="Code"
                        style={{
                            width: '30%',
                        }}
                    >
                        {
                            dialCode.map((data, index) => 
                                <Option key={index} value={data.dial_code} >
                                    <ReactCountryFlag
                                        svg
                                        countryCode={data.code}
                                        aria-label={data.name}
                                    />
                                    &nbsp;&nbsp;
                                    {data.dial_code}
                                </Option>
                            )
                        }
                    </Select>
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
                        placeholder="Input Mobile Number"
                        style={{
                            width: '70%',
                        }}
                    />
                </Form.Item>
            </Input.Group>
        </Form.Item>
    );
};