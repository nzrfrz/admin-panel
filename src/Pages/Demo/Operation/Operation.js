import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../../App";
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
import { DemoTable } from "./DemoTable";

const { Search } = Input;
const { Text, Title } = Typography;

export const Operation = () => {
    const { isDarkMode } = useContext(ThemeContext);
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
                    <Button
                        icon={<PlusOutlined />}
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
                {/* <Text>Table</Text> */}
                {/* <CorpInfoTable 
                    corporateData={corporateData} 
                /> */}
                <DemoTable />
            </div>
        </div>
    );
};