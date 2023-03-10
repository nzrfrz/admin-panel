import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
        count: 5,
        path: "/chat"
    },
    {
        label: "Discussion",
        count: 3,
        path: "/discussion"
    },
    {
        label: "Review",
        count: 7,
        path: "/review"
    },
    {
        label: "Help Message",
        count: 2,
        path: "/help"
    },
    {
        label: "Order Complained",
        count: 2,
        path: "/complain"
    },
];

export const MultiInboxDD = () => {
    const navigate = useNavigate();
    const [openDD, setOpenDD] = useState(false);

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
                open={openDD}
                trigger="click"
                placement="bottomRight"
                onOpenChange={(flag) => setOpenDD(flag)}
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
                                    onClick={() => {
                                        setOpenDD(false);
                                        navigate(data.path);
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