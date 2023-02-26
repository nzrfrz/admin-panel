import React, { useContext, useMemo } from "react";
import { GlobalContext } from "../../../../App";
import dayjs from "dayjs";

import { 
    Table,
    Typography,
} from 'antd';
import {
    EditOutlined
} from '@ant-design/icons';

import { ButtonWarning, TableButtonDelete } from "../../../_Component";
import { 
    getUserProfile, 
    deleteUserProfile, 
    useQueryData, 
    useMutateData,
    useCachedData,
} from "../../../../_services";

import { getAge } from "../../../../_helper";

const { Text } = Typography;

export const UserProfileTable = ({setIsModalFormOpen, setHTTPMethod, formProps, setEditedDataRow}) => {
    const { apiNotif } = useContext(GlobalContext);

    const fetchedData = useCachedData(["userProfile"]);
    const mutateData = useMutateData("delete", deleteUserProfile, ["userProfile"], undefined, apiNotif);
    // console.log(fetchedData);

    const userProfileData = useMemo(() => {
        return fetchedData?.data?.map((data) => {
            return {
                ...data,
                dateOfBirth: dayjs(data.dateOfBirth).format("MMMM DD, YYYY"),
                age: getAge(dayjs(data.dateOfBirth).format("YYYY-MM-DD"))
            }
        })
    }, [fetchedData?.data]);

    // console.log(userProfileData);

    const columns = [
        {
            title: 'Full Name',
            dataIndex: 'name',
            key: 'name',
            fixed: "left",
            width: 200
        },
        {
            title: 'Date Of Birth',
            dataIndex: 'dateOfBirth',
            key: 'dateOfBirth',
            width: 200,
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            width: 100,
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            width: 200
        },
        {
            title: 'City',
            dataIndex: 'city',
            key: 'city',
            width: 230
        },
        {
            title: 'State',
            dataIndex: 'state',
            key: 'state',
            width: 200
        },
        {
            title: 'Zip Code',
            dataIndex: 'zipCode',
            key: 'zipCode',
            width: 200
        },
        {
            title: 'User Name',
            dataIndex: 'userName',
            key: 'userName',
            width: 300
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: 300
        },
        {
            title: 'Contact Number',
            dataIndex: 'phone',
            key: 'phone',
            width: 200
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
                            setIsModalFormOpen(true);
                            setHTTPMethod("put");
                            setEditedDataRow(record);
                            formProps.setFieldsValue({
                                name: record.name,
                                dateOfBirth: dayjs(record.dateOfBirth),
                                phone: {
                                    areaCode: record.phone.replace(/[\(\)]/g, "").split(" ")[0],
                                    phoneNumber: Number(record.phone.split(" ")[1].replace(/[\-]/g, "")),
                                },
                                address: record.address,
                                city: record.city,
                                state: record.state,
                                zipCode: Number(record.zipCode),
                                userName: record.userName,
                                email: record.email
                            });
                        }}
                    />
                    <TableButtonDelete 
                        rowData={record.name}
                        onClick={() => {
                            mutateData.mutateAsync(record.id);
                        }}
                    />
                </div>
            )
        },
    ];

    return (
        <Table 
            loading={fetchedData?.fetchStatus === "fetching" ? true : false}
            rowKey={(record) => record.id} 
            columns={columns} 
            dataSource={userProfileData?.reverse()}
            scroll={{ x: "100%" }}
        />
    );
};