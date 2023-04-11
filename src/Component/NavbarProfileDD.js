import React, { useState } from "react";

import { 
    theme,
    Divider,
    Dropdown,
    Typography, 
} from "antd";
import {
    UserOutlined,
    SettingOutlined
} from '@ant-design/icons';

import { ButtonLogOut } from "./ButtonLogOut";
import { getUserProfile, useCachedData, useQueryData } from "../_services";
import { Spinner } from "./Spinner";

const { Text } = Typography;

export const NavbarProfileDD = ({windowWidth}) => {    
    const cachedData = useCachedData(["userProfile"]);
    useQueryData(
        ["userProfile"],
        cachedData?.data === undefined ? getUserProfile() : undefined,
        cachedData?.data === undefined ? true : false,
        cachedData?.data === undefined ? 1500 : 0,
    );
    // console.log("USER PROFILE: \n", cachedData);

    const [openDD, setOpenDD] = useState(false);

    const {
        token: { 
            colorBgContainer, 
            borderRadiusLG, 
            boxShadow,
            colorBgTextHover,
        },
    } = theme.useToken();

    return (
        <div
            className="navbar-profile-dd-container"
            style={{
                "--bgColor": colorBgTextHover
            }}
        >
            <Dropdown
                menu={{}}
                trigger="click"
                placement="bottomRight"
                open={openDD}
                onOpenChange={(flag) => setOpenDD(flag)}
                dropdownRender={() => (
                    <div
                        className="navbar-profile-dd-menu-container"
                        style={{
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                            boxShadow: boxShadow,
                        }}
                    >
                        <div 
                            className="link-button-container"
                            style={{
                                "--bgc": colorBgTextHover,
                                borderRadius: borderRadiusLG,
                            }}
                        >
                            <Text>Profile</Text>
                            <UserOutlined />
                        </div>
                        <div 
                            className="link-button-container"
                            style={{
                                "--bgc": colorBgTextHover,
                                borderRadius: borderRadiusLG,
                            }}
                        >
                            <Text>Setting</Text>
                            <SettingOutlined />
                        </div>
                        <Divider style={{ margin: 0, padding: 0 }} />
                        <ButtonLogOut />
                    </div>
                )}
            >
                <div className="navbar-profile-dd-title">
                    {
                        cachedData?.data?.data === undefined ?
                        <Spinner />
                        : 
                        <>
                        <img src={cachedData?.data?.data?.profilePic} alt="profile" />
                        {
                            windowWidth > 630 &&
                            <Text>{cachedData?.data?.data?.userName}</Text>
                        }
                        </>
                    }
                </div>
            </Dropdown>
        </div>
    );
};