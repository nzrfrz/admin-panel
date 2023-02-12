import React, { useState } from "react";
import { 
    Typography,
    Form,
    Select,
    Input,
    Button,
    Space,
    Row,
    Col,
    InputNumber,
    DatePicker
} from 'antd';

const { Text } = Typography;


const effectiveDateOptions = [
    {
        // name: "Sesuai Tanggal Aktif Kontrak",
        name: "On Contract Active Date",
        value: "general"
    },
    {
        // name: "Kontrak Khusus",
        name: "Specific Contract",
        value: "specific"
    }
];

export const ContractTypeCD = ({index, formProps, field, lastContainerWidth}) => {
    const contractActiveDateValue = Form.useWatch('contractActiveDate', formProps);
    const channeldDealsValue = Form.useWatch('channelDeals', formProps);
    console.log(channeldDealsValue);

    return (
        <>
        <Form.Item
            labelCol={{ span: lastContainerWidth >= 500 ? 12 : 0 }}
            wrapperCol={{ span: lastContainerWidth >= 500 ? 8 : 0 }}
            label={lastContainerWidth >= 500 ? "Contract Type" : ""}
            style={{ 
                marginBottom: 0,
            }}
        >
            {/* custom label */}
            {
                lastContainerWidth <= 500 &&
                <Form.Item 
                    style={{ display: 'inline-block', width: '40%', paddingRight: "5px", textAlign: "end" }}
                >
                    <Text>Contract Type :</Text>
                </Form.Item>
            }
            {/* custom label */}

            <Form.Item
                {...field}
                key={field.key}
                name={[field.name, "contractType"]}
                style={lastContainerWidth >= 500 ? {} : { display: 'inline-block', width: '60%' }}
                // rules={[
                //     {
                //         required: true,
                //         message: "Price can not be empty"
                //     }
                // ]}
            >
                <Select
                    showSearch
                    allowClear
                    placeholder="Select Contract Type"
                    style={{
                        width: "100%"
                    }}
                    onChange={(e) => {
                        // formProps.setFieldsValue({specificDate: [contractActiveDateValue[0].format('YYYY-MM-DD'), contractActiveDateValue[1].format('YYYY-MM-DD')]});
                        formProps.setFieldsValue(
                            {
                                channelDeals: [
                                    ...channeldDealsValue.slice(channeldDealsValue.length),
                                    {
                                        ...channeldDealsValue[index],
                                        platform: channeldDealsValue[index].platform, 
                                        contractType: e,
                                        specificDate: [...contractActiveDateValue]
                                    }
                                ]
                            });
                        console.log(e);
                    }}
                >
                    {
                        effectiveDateOptions.map((data, index) => 
                            <Select.Option key={index} value={data.value} >{data.name}</Select.Option>
                        )
                    }
                </Select>
            </Form.Item>
        </Form.Item>
        </>
    );
};