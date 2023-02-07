import React from "react";
import { 
    theme,
    Badge,
    Divider,
    Dropdown,
    Typography, 
} from "antd";

import { RiErrorWarningFill } from "react-icons/ri";
import { FaEnvelope } from "react-icons/fa";

const { Text } = Typography;

const inboxType = [
    {
        label: "Chat",
        count: 5
    },
    {
        label: "Discussion",
        count: 3
    },
    {
        label: "Review",
        count: 7
    },
    {
        label: "Help Message",
        count: 2
    },
    {
        label: "Order Complained",
        count: 2
    },
];

export const MultiInboxDD = () => {

    const {
        token: { 
            colorBgContainer, 
            borderRadiusLG, 
            boxShadow,
            colorBgTextHover
        },
    } = theme.useToken();

    return (
        <div 
            className="header-menu-dd-multi-inbox-container"
            style={{
                "--bgColor": colorBgTextHover
            }}
        >
            <Dropdown
                menu={{}}
                trigger="click"
                placement="bottomRight"
                dropdownRender={() => (
                    <div
                        className="header-menu-dd-multi-inbox"
                        style={{
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                            boxShadow: boxShadow,
                        }}
                    >
                        {
                            inboxType.map((data, index) => 
                                <div
                                    key={index}
                                    className="multi-inbox"
                                    style={{
                                        "--bgc": colorBgTextHover,
                                        borderRadius: borderRadiusLG,
                                    }}
                                >
                                    <Text>{data.label}</Text>
                                    <Badge count={data.count} />
                                </div>
                            )
                        }
                    </div>
                )}
            >
                <div className="header-menu-dd-multi-inbox-title">
                    <Badge count={<RiErrorWarningFill style={{ fontSize: "25px", color: "gold" }} />}>
                        <FaEnvelope style={{ fontSize: "25px" }} />
                    </Badge>
                </div>
            </Dropdown>
        </div>
    );
};