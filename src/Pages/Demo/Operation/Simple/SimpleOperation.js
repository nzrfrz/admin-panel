import React, { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import { GlobalContext } from "../../../../App";
import { GlobalContext } from "../../../../GlobalContext";
import dayjs from "dayjs";

import { 
    theme,
    Layout, 
    Menu, 
    Typography, 
    Breadcrumb, 
    Dropdown,
    Button,
    Divider,
    Input,
    Form,
    Pagination
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { ButtonInfo, Spinner } from "../../../../Component";
import { MedicinesTable } from "./MedicinesTable";
import { MedicinesTableV2 } from "./MedicinesTableV2";

import { ModalForm } from "./ModalForm";
import { ModalFormV2 } from "./ModalFormV2";

import { useDebounce } from "../../../../_helper/useDebounce";

import { useQueryData, getMedicinesPaginated, useMutateData, useCachedData, useCacehdQueriesData } from "../../../../_services";
import { urlPaginationSplitter } from "../../../../_helper";

const { Search } = Input;
const { Text, Title } = Typography;

export const SimpleOperation = () => {
    const { isDarkMode, apiNotif } = useContext(GlobalContext);

    const [form] = Form.useForm();
    const [isModalFormOpen, setIsModalFormOpen] = useState(false);

    // set httpMethod from button click, either it post, put or delete
    // to make a decision when "mutation" service goes
    const [HTTPMethod, setHTTPMethod] = useState(undefined);

    // to store selected row data that want to edit or view detail of the row data
    // actually just need the id if want to perform an edit
    const [editedDataRow, setEditedDataRow] = useState({});
    
    const [searchValue, setSearchValue] = useState("");
    const debounceSave = useDebounce((nextValue) => setSearchValue(nextValue), 1000);

    const {
        token: { 
            borderRadiusLG,
        },
    } = theme.useToken();

    return (
        <div 
            className="one-column-layout-container"
            style={{
                "--bgc": isDarkMode === true ? "var(--contentContainerDarkMode)" : "var(--contentContainerLightMode)"
            }}
        >
            <div className="page-content" style={{ borderRadius: borderRadiusLG }}>
                <div className="content-title-container">
                    <div className="content-title">
                        <Title level={4}>Medicines List</Title>
                    </div>
                    <ButtonInfo 
                        text="Add Medicine"
                        icon={<PlusOutlined />}
                        onClick={() => {
                            form.resetFields();
                            setHTTPMethod("post");
                            setIsModalFormOpen(true);
                        }}
                    />
                    <Search 
                        allowClear
                        enterButton 
                        size="large"
                        placeholder="Search Something?" 
                        onSearch={(value) => {
                            setSearchValue(value);
                        }}
                        onChange={(e) => {
                            // console.log("SEARCH ON CHANGE: \n", e.target.value);
                            debounceSave(e.target.value);
                        }}
                    />
                </div>
                <div className="page-content-container">
                    {/* 
                        Table V1, using server pagination and search with debounce,
                        and change page to string params to identofy which page is currently on view
                        -- to uncomment the component, block all component then alt + arrow up / arrow down
                        -----------------------------------------------------------------------------------
                    */}
                    <MedicinesTable 
                        setIsModalFormOpen={setIsModalFormOpen}
                        setHTTPMethod={setHTTPMethod}
                        formProps={form}
                        setEditedDataRow={setEditedDataRow}
                        searchValue={searchValue}
                    /> 

                    {/* 
                        Table V2, using a local pagination and search
                        ---------------------------------------------
                    <MedicinesTableV2
                        setIsModalFormOpen={setIsModalFormOpen}
                        setHTTPMethod={setHTTPMethod}
                        formProps={form}
                        setEditedDataRow={setEditedDataRow}
                        searchValue={searchValue}
                    />
                    */}
                </div>
            </div>
            {/* filter section */}

            {/* modal form */}
            {/*
                modal form v1, just to do a CRUD operation on Table V1,
                you need also uncomment to use Table v2
                -- to uncomment the component, block all component then alt + arrow up / arrow down
                -------------------------------------------------------
            */}
            <ModalForm 
                isModalFormOpen={isModalFormOpen}
                setIsModalFormOpen={setIsModalFormOpen}
                httpMethod={HTTPMethod}
                formProps={form}
                editedDataRow={editedDataRow}
                searchValue={searchValue}
            /> 

            {/*
                modal form v2 also just to do a CRUD operation on Table V2,
                you need also uncomment to use Table v2
                ------------------------------------------------------
            <ModalFormV2
                isModalFormOpen={isModalFormOpen}
                setIsModalFormOpen={setIsModalFormOpen}
                httpMethod={HTTPMethod}
                formProps={form}
                editedDataRow={editedDataRow}
                searchValue={searchValue}
            />
            */}
            {/* modal form */}
        </div>
    );
};