import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../../App";
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
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { getCorpInfo } from "../../../_services/Demo/corpInfo";

import { CorpInfoTable } from "./CorpInfoTable";

const { Search } = Input;
const { Text, Title } = Typography;

export const Operation = () => {
    const navigateTo = useNavigate();
    const { isDarkMode } = useContext(GlobalContext);
    const [corporateData, setCorporateData] = useState([]);

    useEffect(() => {
        getCorpInfo(setCorporateData);
    }, []);

    const {
        token: { 
            colorSuccessHover,
            borderRadiusLG,
        },
    } = theme.useToken();

    return (
        <div 
            className="operation-container"
            style={{
                "--brRd": `${borderRadiusLG}px`,
                "--bgc": isDarkMode === true ? "var(--contentContainerDarkMode)" : "var(--contentContainerLightMode)"
            }}
        >
            <div className="operation-top-section">
                <div className="button-register-container">
                    <Button
                        type="default"
                        icon={<PlusOutlined />}
                        style={{
                            backgroundColor: colorSuccessHover
                        }}
                        onClick={() => {
                            navigateTo(`/operation/registration`, {state: {method: "Registration"}});
                        }}
                    >
                        Register Corporate
                    </Button>
                </div>
                <div className="search-container">
                    <Search placeholder="Search Something?" enterButton />
                </div>
            </div>
            <div className="operation-bottom-section">
                <Title level={4}>Corporate Data</Title>
                <CorpInfoTable 
                    corporateData={corporateData} 
                />
            </div>
        </div>
    );
};