import React, { useState } from "react";
import { 
    Badge,
    theme,
    Typography, 
} from "antd";

import { TransactionContent } from "./TabContent/TransactionContent";
import { UpdateContent } from "./TabContent/UpdateContent";

const { Text } = Typography;

export const CustomTabs = ({setOpenDD}) => {
    const [tabHeaderItems, setTabHeaderItems] = useState([
        {
            key: "1",
            label: "Transaction",
            hasBadge: false,
            isActive: true,
            content: (() => (
                <TransactionContent setOpenDD={setOpenDD} />
            ))()
        },
        {
            key: "2",
            label: "Update",
            hasBadge: true,
            isActive: false,
            content: (() => (
                <UpdateContent setOpenDD={setOpenDD} />
            ))()
            // content: <UpdateContent setOpenDD={setOpenDD} />
        }
    ]);
    // console.log(tabHeaderActiveKey);

    const {
        token: { 
            colorBgTextHover,
            colorPrimary
        },
    } = theme.useToken();

    return (
        <>
            <div 
                className="tab-header-container"
                style={{
                    "--borderColor": colorBgTextHover,
                }}
            >
                {
                    tabHeaderItems.map((data, index) => 
                        <div 
                            key={index}
                            className="tab-header"
                            onClick={() => {
                                setTabHeaderItems(
                                    tabHeaderItems.map((item, i) => ({
                                        ...item,
                                        isActive: i === index,
                                    }))
                                );
                            }}
                        >
                            <div className="tab-header-title-container">
                                <Text strong style={{ fontSize: "16px", color: data.isActive === true && colorPrimary }} >{data.label}</Text>
                                {
                                    data.hasBadge === true &&
                                    <Badge count={7} />
                                }
                            </div>
                            <div 
                                className={`tab-header-line${data.isActive === true ? "-active" : ""}`} 
                                style={{
                                    "--bgc": colorPrimary,
                                }}
                            />
                        </div>
                    )
                }
            </div>
            {
                tabHeaderItems.filter((item) => item.isActive === true).map((data, index) => 
                    <div key={index} className="tab-content">
                        {data.content}
                    </div>
                )
            }
        </>
    );
};