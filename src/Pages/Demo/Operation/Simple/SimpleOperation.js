import React, { useContext, useState } from "react";
import { GlobalContext } from "../../../../App";
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
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { ButtonInfo } from "../../../_Component";
import { UserProfileTable } from "./UserProfileTable";

import { ModalForm } from "./ModalForm";

const { Search } = Input;
const { Text, Title } = Typography;

export const SimpleOperation = () => {
    const [form] = Form.useForm();
    const { isDarkMode } = useContext(GlobalContext);
    const [isModalFormOpen, setIsModalFormOpen] = useState(false);

    // set httpMethod from butt0n click, either it post, put or delete
    // to make a decision when "mutation" service goes
    const [HTTPMethod, setHTTPMethod] = useState(undefined);

    // to store selected row data that want to edit or view detail of the row data
    // actually just need the id if want to perform an edit
    const [editedDataRow, setEditedDataRow] = useState({});

    const {
        token: { 
            borderRadiusLG,
        },
    } = theme.useToken();

    return (
        <div 
            className="two-row-layout-container"
            style={{
                "--bgc": isDarkMode === true ? "var(--contentContainerDarkMode)" : "var(--contentContainerLightMode)"
            }}
        >
            {/* filter section */}
            <div 
                className="top-section"
                style={{
                    borderRadius: borderRadiusLG,
                }}
            >
                <div className="button-add-something-container">
                    <ButtonInfo 
                        text="Add User"
                        icon={<PlusOutlined />}
                        onClick={() => {
                            form.resetFields();
                            setHTTPMethod("post");
                            setIsModalFormOpen(true);
                            form.setFieldsValue({
                                name: "dummy name 1",
                                dateOfBirth: dayjs("1992-04-06"),
                                phone: {
                                    areaCode: "+54",
                                    phoneNumber: 857463521,
                                },
                                address: "dummy address 1",
                                city: "city 1",
                                state: "state 1",
                                zipCode: 987654,
                                userName: "username1",
                                email: "dummy.user1@mail.com"

                            });
                            console.log("ADD USER");
                        }}
                    />
                </div>
                <div className="search-input-container" style={{ flexGrow: 1 }}>
                    <Search 
                        placeholder="Search Something?" 
                        enterButton 
                    />
                </div>
            </div>
            {/* filter section */}

            {/* content section */}
            <div className="bottom-section" style={{ borderRadius: borderRadiusLG }}>
                <Title level={4}>User List</Title>

                <UserProfileTable 
                    setIsModalFormOpen={setIsModalFormOpen}
                    setHTTPMethod={setHTTPMethod}
                    formProps={form}
                    setEditedDataRow={setEditedDataRow}
                />
            </div>
            {/* content section */}

            {/* modal form */}
            <ModalForm 
                isModalFormOpen={isModalFormOpen}
                setIsModalFormOpen={setIsModalFormOpen}
                httpMethod={HTTPMethod}
                formProps={form}
                editedDataRow={editedDataRow}
            />
            {/* modal form */}
        </div>
    );
};