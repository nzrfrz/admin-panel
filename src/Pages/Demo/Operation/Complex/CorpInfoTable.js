import React from "react";
import { useNavigate } from "react-router-dom";
import { 
    Table,
    Tooltip,
} from 'antd';
import {
    EditOutlined
} from '@ant-design/icons';

import { ButtonWarning } from "../../../_Component";

export const CorpInfoTable = ({corporateData}) => {
    const navigateTo = useNavigate();

    const columns = [
        {
            title: 'Corporate Name',
            dataIndex: 'corporateName',
            key: 'corporateName',
            fixed: "left",
            width: 200
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
            dataIndex: 'contactNumber',
            key: 'contactNumber',
            width: 200
        },
        {
            title: 'Email',
            dataIndex: 'corporateEmail',
            key: 'corporateEmail',
            width: 230
        },
        {
            title: 'Address',
            dataIndex: 'corporateAddress',
            key: 'corporateAddress',
            width: 300
        },
        {
            title: 'Province',
            dataIndex: 'province',
            key: 'province',
            width: 100,
            ellipsis: {
                showTitle: false,
            },
            render: (province) => (
                <Tooltip placement="topLeft" title={province}>
                    {province}
                </Tooltip>
            ),
        },
        {
            title: 'Regency',
            dataIndex: 'regency',
            key: 'regency',
            width: 100,
            ellipsis: {
                showTitle: false,
            },
            render: (regency) => (
                <Tooltip placement="topLeft" title={regency}>
                    {regency}
                </Tooltip>
            ),
        },
        {
            title: 'Sub District',
            dataIndex: 'subDistrict',
            key: 'subDistrict',
            width: 120,
            ellipsis: {
                showTitle: false,
            },
            render: (subDistrict) => (
                <Tooltip placement="topLeft" title={subDistrict}>
                    {subDistrict}
                </Tooltip>
            ),
        },
        {
            title: 'Village',
            dataIndex: 'village',
            key: 'village',
            width: 100,
            ellipsis: {
                showTitle: false,
            },
            render: (village) => (
                <Tooltip placement="topLeft" title={village}>
                    {village}
                </Tooltip>
            ),
        },
        {
            title: 'Actions',
            key: 'action',
            fixed: 'right',
            width: 200,
            render: (_, record) => (
                <div className="table-action-button-container">
                    <ButtonWarning 
                        icon={<EditOutlined />}
                        onClick={() => {
                            navigateTo(
                                `/operation/complex/edit`, 
                                {
                                    state: {
                                        method: "Edit", 
                                        data: record
                                    }
                                })
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
            scroll={{ x: "100%" }}
        />
    );
};