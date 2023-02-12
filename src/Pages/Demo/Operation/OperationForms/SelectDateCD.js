import React, { useCallback, useMemo, useState } from "react";
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
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

const { Text } = Typography;
const { RangePicker } = DatePicker;

export const SelectDateCD = ({index, field, formProps, lastContainerWidth}) => {
    const contractActiveDateValue = Form.useWatch('contractActiveDate', formProps);
    const contractTypeSelected = Form.useWatch("channelDeals", formProps);
    // console.log(contractActiveDateValue[0].format('YYYY-MM-DD'));

    const isCustomContract = useCallback((index) => {
        if (contractTypeSelected[index].contractType === "specific") return true;
        return false;
    }, [contractTypeSelected]);

    return (
        <>
        <Form.Item
            labelCol={{ span: lastContainerWidth >= 500 ? 12 : 0 }}
            wrapperCol={{ span: lastContainerWidth >= 500 ? 8 : 0 }}
            label={lastContainerWidth >= 500 ? "Select Date" : ""}
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
                    <Text>Select Date :</Text>
                </Form.Item>
            }
            {/* custom label */}

            {/* <Form.Item
                {...field}
                key={field.key}
                name={[field.name, "specificDate"]}
                // initialValue={{specificDate: [contractActiveDateValue[0].format('YYYY-MM-DD'), contractActiveDateValue[1].format('YYYY-MM-DD')]}}
                style={lastContainerWidth >= 500 ? {} : { display: 'inline-block', width: '60%' }}
                // rules={[
                //     {
                //         required: true,
                //         message: "Price can not be empty"
                //     }
                // ]}
            >
                <RangePicker 
                    disabled
                    format={'YYYY-MM-DD'}
                    placeholder={["Start", "End"]}
                    style={{
                        width: "100%"
                    }}
                />
            </Form.Item> */}

            <Form.Item
                {...field}
                key={field.key}
                name={[field.name, "specificDate"]}
                style={lastContainerWidth >= 500 ? {} : { display: 'inline-block', width: '60%' }}
                // rules={[
                //     {
                //         required: true,
                //         message: "Price can not be empty"
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
        </Form.Item>
        </>
    );
};