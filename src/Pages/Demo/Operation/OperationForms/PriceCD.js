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
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

const { Text } = Typography;

export const PriceCD = ({field, lastContainerWidth}) => {
    
    return (
        <>
        <Form.Item
            labelCol={{ span: lastContainerWidth >= 500 ? 12 : 0 }}
            wrapperCol={{ span: lastContainerWidth >= 500 ? 8 : 0 }}
            label={lastContainerWidth >= 500 ? "Price" : ""}
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
                    <Text>Price :</Text>
                </Form.Item>
            }
            {/* custom label */}

            <Form.Item
                {...field}
                key={field.key}
                name={[field.name, "price"]}
                style={lastContainerWidth >= 500 ? {} : { display: 'inline-block', width: '60%' }}
                // rules={[
                //     {
                //         required: true,
                //         message: "Price can not be empty"
                //     }
                // ]}
            >
                <InputNumber
                    controls={false}
                    addonBefore="$"
                    placeholder="Input Price"
                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                    style={{
                        width: "100%"
                    }}
                />
            </Form.Item>
        </Form.Item>
        </>
    );
};