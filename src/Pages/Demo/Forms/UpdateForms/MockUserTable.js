import React, { useEffect, useState } from "react";
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
    Table
} from 'antd';
import {
    EditOutlined
} from '@ant-design/icons';

import { mockAPIGetUser } from "../../../../_services/Demo/mockAPIUser";

const { Text, Title } = Typography;

export const MockUserTable = ({form, setSelectedTableRow}) => {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        mockAPIGetUser(setUserData);
    }, []);

    const {
        token: { 
            colorWarningHover
        },
    } = theme.useToken();

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Actions',
            key: 'action',
            render: (_, record) => (
                <div className="table-action-button-container">
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        style={{
                            backgroundColor: colorWarningHover
                        }}
                        onClick={() => {
                            form.setFieldsValue({name: record.name, email: record.email});
                            setSelectedTableRow(record);
                        }}
                    />
                </div>
            )
        },
    ];

    // console.log(userData);

    return (
        <Table rowKey={(record) => record.id} columns={columns} dataSource={userData} />
    );
};