import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
// import { GlobalContext } from "../../../../App";
import { GlobalContext } from "../../../../GlobalContext";

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

import { useQueryData, getMedicinesPaginated, useMutateData, deleteMedicines, useCachedData } from "../../../../_services";

const { Text } = Typography;

export const MedicinesTable = ({setIsModalFormOpen, setHTTPMethod, formProps, setEditedDataRow, searchValue}) => {
    const navigateTo = useNavigate();

    const [limitPerPage, setLimitPerPage] = useState(10);
    const [page, setPage] = useState(1);
    // console.log(["medicines", limitPerPage, page]);
    // console.log("SEARCH VALUE: \n", searchValue);

    const cachedData = useCachedData(["medicines", limitPerPage, page, searchValue]);

    useQueryData(
        ["medicines", limitPerPage, page, searchValue], 
        cachedData?.data?.data === undefined ? getMedicinesPaginated(limitPerPage, page, searchValue) : undefined, 
        cachedData?.data?.data === undefined ? true : false,
        cachedData?.data?.data === undefined ? 1500 : 0, 
    );
    // console.log("CACHED DATA: ", cachedData?.data?.data);

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
        refetchFn: () => getMedicinesPaginated(limitPerPage, page, searchValue),
        queryKey: ["medicines", limitPerPage, page, searchValue],
        lsKey: undefined,
        formProps,
        setIsModalFormOpen: undefined,
        routePath: undefined,
    });

    useEffect(() => {
        if (searchValue.length > 0) {
            setPage(1);
            // set the url to show the pagination with search value
            navigateTo({ search: `?limit=${limitPerPage}&page=${1}&per_page=${limitPerPage}&q=${searchValue}` }, { replace: true });
        }
        else {
            // set the url paginated without url
            navigateTo({ search: `?limit=${limitPerPage}&page=${page}&per_page=${limitPerPage}` }, { replace: true });
        }
    }, [page, limitPerPage, searchValue]);

    const itemRender = (_, type, originalElement) => {
        if (type === 'prev') {
            return <a>Previous</a>;
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
            width: 80,
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
            loading={cachedData?.data?.data === undefined || cachedData?.fetchStatus === "fetching"}
            rowKey={(record) => record.id} 
            columns={columns} 
            dataSource={cachedData?.data?.data?.medicines}
            scroll={{ x: "100%" }}
            pagination={searchValue.length > 0 ? true : false}
        />

        {
            searchValue.length === 0 && 
            <Pagination
                showQuickJumper
                showSizeChanger
                current={page}
                disabled={cachedData?.data?.data === undefined || cachedData?.fetchStatus === "fetching"}
                total={cachedData?.data?.data?.totalPage}
                itemRender={itemRender}
                showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                style={{
                    display: "flex",
                    justifyContent: "flex-end"
                }}
                onShowSizeChange={(currentPage, pageSize) => {
                    setLimitPerPage(pageSize);
                }}
                onChange={async (currentPage) => {
                    setPage(currentPage);
                }}
            />
        }
        </div>
    );
};