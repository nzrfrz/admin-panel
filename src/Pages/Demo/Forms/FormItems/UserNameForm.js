import React, { useEffect, useMemo, useState } from "react";
import { 
    theme, 
    Form,
    Input,
    Typography,
    Select
} from 'antd';

export const UserNameForm = () => {

    return (
        <Form.Item
            name="userName"
            label="User Name"
            // rules={[
            //     {
            //         min: 6,
            //         message: "User Name should be more than 6"
            //     },
            //     {
            //         required: true,
            //         message: "User Name can not be empty"
            //     }
            // ]}
        >
            <Input 
                placeholder="Input User Name"
            />
        </Form.Item>
    );
};