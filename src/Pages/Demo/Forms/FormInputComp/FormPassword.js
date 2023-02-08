import React from "react";
import { 
    theme,
    Layout, 
    Menu, 
    Typography, 
    Breadcrumb, 
    Dropdown,
    Button,
    Divider,
    Form,
    Input,
} from 'antd';

const { Text, Title } = Typography;

export const FormPassword = ({withConfirmPassword}) => {
    
    return (
        <>
        <Form.Item
            name="password"
            label="Password"
            // initialValue={initialValue?.length > 0 ? initialValue : undefined}
            rules={[
                {
                    required: true,
                    message: 'Please input your password!',
                },
            ]}
            hasFeedback
        >
            <Input.Password />
        </Form.Item>
        
        {
            withConfirmPassword === false ?
            null
            :
            <Form.Item
                name="confirmPassword"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('The two passwords that you entered do not match!'));
                        },
                    }),
                ]}
            >
                <Input.Password />
          </Form.Item>
        }
        </>
    );
};