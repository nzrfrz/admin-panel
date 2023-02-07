import React, { useState } from "react";
import { 
    theme,
    Tabs,
    Badge,
    Divider,
    Dropdown,
    Typography, 
} from "antd";
import { 
    FaBell,
    FaCog,
} from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";

import { CustomTabs } from "../TabsCustom/CustomTabs";

const { Text } = Typography;

export const TokpedNotifDD = ({innerWidth}) => {
    const [openDD, setOpenDD] = useState(false);
    const [tabHeaderActiveKey, setTabHeaderActiveKey] = useState("1");
    const [tabHeaderItems, setTabHeaderItems] = useState([
        {
            key: "1",
            label: "Transaction",
            isActive: true,
            content: <Text>TRANSACTION CONTENT</Text>
        },
        {
            key: '2',
            label: "Update",
            isActive: false,
            content: <Text>UPDATE CONTENT</Text>
        }
    ]);
    // console.log(tabHeaderActiveKey);

    const {
        token: { 
            colorBgContainer, 
            borderRadiusLG, 
            boxShadow,
            colorBgTextHover,
            colorError
        },
    } = theme.useToken();
    // console.log(openDD);

    return (
        <div 
            className="header-menu-dd-notif-container"
            style={{
                "--bgColor": colorBgTextHover
            }}
            // onClick={() => {
            //     setOpenDD(!openDD);
            // }}
        >
            <Dropdown
                menu={{}}
                trigger="click"
                placement="bottomRight"
                open={openDD}
                onOpenChange={(flag) => setOpenDD(flag)}
                dropdownRender={() => (
                    <div 
                        className="header-menu-dd-notif"
                        style={{
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                            boxShadow: boxShadow,
                        }}
                    >
                        <div 
                            className="dd-notif-header-title"
                            style={{
                                boxShadow: boxShadow,
                                "--borderColor": colorBgTextHover,
                                "--bgColor": colorBgTextHover,
                                borderTopLeftRadius: borderRadiusLG,
                                borderTopRightRadius: borderRadiusLG,
                            }}
                        >
                            <IoIosCloseCircleOutline style={{ fontSize: "30px", "--colorHover": colorError }} onClick={() => setOpenDD(false)} />
                            <Text strong style={{ fontSize: "18px" }} >Notification</Text>
                            <FaCog style={{ fontSize: "30px" }} />
                        </div>
                        <div className="dd-notif-content-container">
                            <CustomTabs 
                                setOpenDD={setOpenDD}
                            />
                        </div>
                        <div className="dd-notif-footer-container">
                            <Text 
                                strong 
                                style={{ color: "#067481", fontSize: "16px" }}
                                onClick={() => {
                                    console.log("MARK ALL READ");
                                    setOpenDD(false);
                                }}
                            >
                                Mark All Read
                            </Text>
                            <Text 
                                strong 
                                style={{ color: "#067481", fontSize: "16px" }}
                                onClick={() => {
                                    console.log("VIEW MORE");
                                    setOpenDD(false);
                                }}
                            >
                                View More
                            </Text>
                        </div>
                    </div>
                )}
            >
                <div className="header-menu-dd-notif-title" onClick={(e) => e.preventDefault()}>
                    <Badge count={7}>
                        <FaBell style={{ fontSize: "25px" }} />
                    </Badge>
                </div>
            </Dropdown>
        </div>
    );
};