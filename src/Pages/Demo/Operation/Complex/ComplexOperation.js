import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../../../App";
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

import { getCorpInfo } from "../../../../_services/Demo/corpInfo";

import { CorpInfoTable } from "./CorpInfoTable";

import { ButtonInfo } from "../../../_Component";

const { Search } = Input;
const { Text, Title } = Typography;

export const ComplexOperation = () => {
    const navigateTo = useNavigate();
    const { isDarkMode } = useContext(GlobalContext);
    const [corporateData, setCorporateData] = useState([]);

    useEffect(() => {
        getCorpInfo(setCorporateData);
    }, []);

    const {
        token: { 
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
                    <ButtonInfo 
                        text="Register Corporate"
                        icon={<PlusOutlined />}
                        onClick={() => {
                            navigateTo(`/operation/complex/registration`, {state: {method: "Registration"}});
                        }}
                    />
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