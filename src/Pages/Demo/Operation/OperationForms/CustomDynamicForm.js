import React, { useCallback, useEffect, useMemo, useState } from "react";
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
} from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

import { 
    CurrencyForm,
    DateRangeForm, 
    SimpleSelectForm 
} from "../../Forms/FormItems";

import { PriceCD } from "./PriceCD";
import { ContractTypeCD } from "./ContractTypeCD";
import { SelectDateCD } from "./SelectDateCD";

const { Text, Title } = Typography;

const channelData = [
    {
        id: 1,
        name: "POP UP",
        value: "simAds",
    },
    {
        id: 2,
        name: "Flash SMS",
        value: "smsFlash",
    },
    {
        id: 3,
        name: "WhatsApp",
        value: "whatsApp",
    },
    {
        id: 4,
        name: "MMS",
        value: "mms",
    },
    {
        id: 5,
        name: "SMS",
        value: "sms",
    }
];

export const CustomDynamicForm = ({formProps, lastContainerWidth}) => {
    const contractActiveDateValue = Form.useWatch('contractActiveDate', formProps);
    const channelDealsValue = Form.useWatch('channelDeals', formProps);

    const errorCD = useMemo(() => {
        const tempPlatformValue = channelDealsValue === undefined ? undefined : channelDealsValue[0]?.platform
        if (tempPlatformValue !== undefined && contractActiveDateValue === undefined) {
            return "error";
        }
        return "";
    }, [channelDealsValue, contractActiveDateValue]);

    return (
        <>
        <DateRangeForm 
            name="contractActiveDate"
            label="Contract Active Date"
            validateStatus={errorCD}
        />
        <Form.List
            name="channelDeals"
        >
            {
                (fields, {add, remove}) => (
                    <>
                    {
                        fields?.map((field, index) => (
                            <div key={index}>
                                <Form.Item
                                    label="Channel Deals"
                                    style={{ 
                                        marginBottom: 0 
                                    }}
                                >
                                    <Form.Item
                                        {...field}
                                        key={field.key}
                                        name={[field.name, "platform"]}
                                        validateStatus={errorCD}
                                        help={errorCD === "error" ? "Contract active date still empty" : ""}
                                        style={{ display: 'inline-block', width: '90%', paddingRight: "12px" }}
                                        rules={[
                                            {
                                                required: true,
                                                message: "Channel can not be empty"
                                            }
                                        ]}
                                    >
                                        <Select
                                            showSearch
                                            allowClear
                                            placeholder="Select Channel"
                                            style={{
                                                width: "100%"
                                            }}
                                        >
                                            {
                                                channelData.map((data, index) => 
                                                    <Select.Option key={index} value={data.value} >{data.name}</Select.Option>
                                                )
                                            }
                                        </Select>
                                    </Form.Item>

                                    {/* button add and remove */}
                                    {
                                        fields.length - 1 === index && fields.length < 5 ?
                                        <Form.Item
                                            style={{ display: 'inline-block', width: '10%', textAlign: "end" }}
                                        >
                                            <Button 
                                                shape="circle" 
                                                icon={<PlusOutlined />} 
                                                onClick={() => add()} 
                                            />
                                        </Form.Item>
                                        :
                                        <Form.Item
                                            style={{ display: 'inline-block', width: '10%', textAlign: "end" }}
                                        >
                                            <Button 
                                                shape="circle" 
                                                icon={<MinusOutlined />} 
                                                onClick={() => remove(field.name)} 
                                            />
                                        </Form.Item>
                                    }
                                    {/* button add and remove */}
                                </Form.Item>

                                <Form.Item
                                    noStyle
                                    shouldUpdate={(prevValues, currentValues) => (prevValues.contractActiveDate !== currentValues.contractActiveDate) || (prevValues.channelDeals[index] !== currentValues.channelDeals[index])}
                                >
                                    {
                                        (({getFieldValue}) => 
                                            getFieldValue("contractActiveDate") === undefined ?
                                            null
                                            :
                                            <Form.Item
                                                noStyle
                                            >
                                                <PriceCD 
                                                    field={field}
                                                    lastContainerWidth={lastContainerWidth}
                                                />

                                                <ContractTypeCD
                                                    index={index}
                                                    formProps={formProps}
                                                    field={field}
                                                    lastContainerWidth={lastContainerWidth}
                                                />

                                                <SelectDateCD
                                                    index={index}
                                                    field={field}
                                                    formProps={formProps}
                                                    lastContainerWidth={lastContainerWidth}
                                                />
                                            </Form.Item>
                                        )
                                    }
                                </Form.Item>


                            </div>
                        ))
                    }
                    </>
                )
            }
        </Form.List>
        </>
    );
};