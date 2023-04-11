import React, { useState, useMemo } from "react";

import { 
    Table,
    Typography,
    Pagination
} from 'antd';
import {
    EditOutlined,
} from '@ant-design/icons';

import { 
    ButtonWarning, 
    TableButtonDelete,
    TableButtonViewDetail
} from "../../../../Component";

import { 
    useQueryData, 
    useMutateData, 
    deleteMedicines, 
    useCachedData, 
    getMedicines 
} from "../../../../_services";

const { Text } = Typography;

export const MedicinesTableV2 = ({setIsModalFormOpen, setHTTPMethod, formProps, setEditedDataRow, searchValue}) => {

    const [limitPerPage, setLimitPerPage] = useState(10);
    const [page, setPage] = useState(1);
    // const [tableData, setTableData] = useState([]);
    // console.log(["medicines", limitPerPage, page]);
    // console.log("SEARCH VALUE: \n", searchValue);

    // to get and display data, 
    // avoid calling to server again when page refresh, or any activity is going on on this page
    const cachedData = useCachedData(["medicinesAll"]);

    // to actually call the server if the cachedData is empty
    useQueryData(
        // this is the query key or unique key thaht react query need
        ["medicinesAll"], 
        // this is the function to call the server, first check cachedData, if empty this function is fire
        cachedData?.data?.data === undefined ? getMedicines() : undefined, 
        // "enabled" another react query options to enabled fetching or not
        cachedData?.data?.data === undefined ? true : false,
        // "refetchInterval" also another react query options to refetch again if any operation intercept coz of access token expiration 
        cachedData?.data?.data === undefined ? 500 : 0, 
    );
    
    // console.log("CACHED DATA: ", cachedData?.fetchStatus, cachedData?.isInvalidated, cachedData?.status);
    // console.log("CACHED DATA: ", cachedData?.data);
    // console.log("QUERY DATA: ", queryData?.data?.data);
    // console.log("CHECK TOKEN: ", accessTokenValidity?.status);

    // logic for local search
    const searchResultsTableData = useMemo(() => {
        // filter all object key inside "medicines" data with any input field you type
        const searchData = cachedData?.data?.data?.filter((data) => 
            data.name.toLowerCase().includes(searchValue) ||
            data.manufacturer.toLowerCase().includes(searchValue) ||
            data.dosage.toLowerCase().includes(searchValue) ||
            data.quantity.toString().toLowerCase().includes(searchValue) ||
            data.price.toLowerCase().includes(searchValue)
        );

        return searchData;
    }, [searchValue]);

    const tableData = useMemo(() => {
        const medicinesData = searchValue.length > 0 ? searchResultsTableData : cachedData?.data?.data;

        // logic for pagination
        const indexOfLastData = page * limitPerPage; // page 1 * limit 10 per page
        const indexOfFirstData = indexOfLastData - limitPerPage; // 10 - 10 limit per page, if go to page 2 then 20 - 10
        const currentData = medicinesData?.slice(indexOfFirstData, indexOfLastData); // get the data by slicing them from the indexOfFirstData to the indexOfLastData
        
        return currentData;
    }, [limitPerPage, page, searchValue, cachedData?.data?.data]);

    const setFormFieldValue = (record) => {
        setEditedDataRow(record);
        formProps.setFieldsValue({
            name: record.name,
            manufacturer: record.manufacturer,
            dosage: Number(record.dosage.replace(/\s(mg|mcg)/g, '')),
            quantity: record.quantity,
            price: record.price
        })
    };

    const mutateData = useMutateData({
        actionType: "delete",
        mutateFn: deleteMedicines,
        queryKey: ["medicinesAll"],
        refetchFn: () => getMedicines(),
        lsKey: undefined,
        apiKey: "delete_medicine",
        setIsModalFormOpen: setIsModalFormOpen,
        routePath: undefined,
    });
    // console.log("MUTATE DELETE", mutateData?.isLoading, mutateData?.isSuccess);

    const itemRender = (_, type, originalElement) => {
        if (type === 'prev') {
            return <a>Prev</a>;
        }
        if (type === 'next') {
            return <a>Next</a>;
        }
        return originalElement;
    };

    const columns = [
        {
            title: 'Num',
            fixed: "left",
            width: 70,
            render: (list, record, index) => (
                <Text>{index + 1}</Text>
            )
        },
        {
            title: 'Full Name',
            dataIndex: 'name',
            key: 'name',
            fixed: "left",
            width: 200
        },
        {
            title: 'Manufacturer',
            dataIndex: 'manufacturer',
            key: 'manufacturer',
            width: 200,
        },
        {
            title: 'Dosage',
            dataIndex: 'dosage',
            key: 'dosage',
            width: 150,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            width: 100
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            width: 100
        },
        {
            title: 'Actions',
            key: 'action',
            fixed: 'right',
            width: 150,
            render: (_, record) => (
                <div className="table-action-button-container">
                    <TableButtonViewDetail 
                        onClick={() => {
                            setIsModalFormOpen(true);
                            setHTTPMethod("viewDetail");
                            setFormFieldValue(record);
                        }}
                    />
                    <ButtonWarning 
                        icon={<EditOutlined />}
                        onClick={() => {
                            setIsModalFormOpen(true);
                            setHTTPMethod("put");
                            setFormFieldValue(record);
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
        <div 
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px"
            }}
        >
        <Table 
            loading={cachedData?.data?.data === undefined || cachedData?.fetchStatus === "fetching" || mutateData?.isLoading}
            // loading={cachedData?.data?.data === undefined}
            rowKey={(record) => record.id} 
            columns={columns} 
            dataSource={tableData}
            scroll={{ x: "100%" }}
            pagination={false}
        />

        <Pagination
            showQuickJumper
            showSizeChanger
            current={page}
            disabled={cachedData?.data?.data === undefined || cachedData?.fetchStatus === "fetching" || mutateData?.isLoading}
            // disabled={cachedData?.data?.data === undefined}
            total={searchValue.length > 0 ? searchResultsTableData.length : cachedData?.data?.data?.length}
            itemRender={itemRender}
            showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
            style={{
                display: "flex",
                justifyContent: "flex-end"
            }}
            onShowSizeChange={(currentPage, pageSize) => {
                setLimitPerPage(pageSize);
            }}
            onChange={(currentPage) => {
                setPage(currentPage);
            }}
        />
        </div>
    );
};