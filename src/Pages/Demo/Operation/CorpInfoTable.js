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

export const CorpInfoTable = ({corporateData}) => {
    
    const {
        token: { 
            colorWarningHover
        },
    } = theme.useToken();

    const columns = [
        {
            title: 'Name',
            dataIndex: 'corporateName',
            key: 'corporateName',
            // fixed: "left",
            width: 500
        },
        {
            title: 'Sector',
            dataIndex: 'corporateSector',
            key: 'corporateSector',
            width: 200
        },
        {
            title: 'Scale',
            dataIndex: 'businessScale',
            key: 'businessScale',
            width: 200
        },
        {
            title: 'Contact',
            dataIndex: 'corporateContact',
            key: 'corporateContact',
            width: 350
        },
        // {
        //     title: 'Email',
        //     dataIndex: 'corporateEmail',
        //     key: 'corporateEmail',
        //     width: 200
        // },
        // {
        //     title: 'Address',
        //     dataIndex: 'corporateAddress',
        //     key: 'corporateAddress',
        //     width: 200
        // },
        // {
        //     title: 'Province',
        //     dataIndex: 'province',
        //     key: 'province',
        //     width: 200
        // },
        // {
        //     title: 'Regency',
        //     dataIndex: 'regency',
        //     key: 'regency',
        //     width: 200
        // },
        // {
        //     title: 'Sub District',
        //     dataIndex: 'subDistrict',
        //     key: 'subDistrict',
        //     width: 200
        // },
        // {
        //     title: 'Village',
        //     dataIndex: 'village',
        //     key: 'village',
        //     width: 200
        // },
        {
            title: 'Actions',
            key: 'action',
            fixed: 'right',
            width: 200,
            render: (_, record) => (
                <div className="table-action-button-container">
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        style={{
                            backgroundColor: colorWarningHover
                        }}
                        onClick={() => {
                            // form.setFieldsValue({name: record.name, email: record.email});
                            // setSelectedTableRow(record);
                        }}
                    />
                </div>
            )
        },
    ];

    return (
        <Table 
            rowKey={(record) => record.id} 
            columns={columns} 
            dataSource={corporateData}
            scroll={{ x: 1600 }}
        />
    );
};