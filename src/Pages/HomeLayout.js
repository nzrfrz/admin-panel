import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

import { 
    Layout, 
    Menu, 
    Typography, 
    Breadcrumb, 
    Dropdown,
    Button,
    Divider,
    theme 
} from 'antd';
import {
    HomeOutlined,
    UserOutlined,
} from '@ant-design/icons';

// import { GlobalContext } from "../App";
import { GlobalContext } from "../GlobalContext";

import { MenuBurger, NavbarProfileDD } from "../Component";

import { toTitleCase } from "../_helper";

import dummyLogo from "../_assets/demo/images/iBoost-logo-fix.png";

import { 
    TokpedProfileDD,
    MultiInboxDD,
    TokpedNotifDD,
    TokpedCartDD
} from "../Pages/Demo/_Component";

import { sidebarItems, sidebarItemKeys, BreadCrumb } from "../Routes";
import { useCacehdQueriesData, useCachedData, useMutableDataFetching, useMasterDataFetching, useQueryData, getMedicines } from "../_services";

const { Header, Sider, Content, Footer } = Layout;
const { Text } = Typography;

export const HomeLayout = () => {
    const location = useLocation();
    const { 
        isDarkMode, 
        setIsDarkMode, 
        windowDimension, 
        setWindowDiemnsion
    } = useContext(GlobalContext);

    const [collapsed, setCollapsed] = useState(false);
    const [isShrink, setIsShrink] = useState(false);
    const [openKeys, setOpenKeys] = useState(["Dashboard"]);
    // const [windowDimension, setWindowDiemnsion] = useState({
    //     width: window.innerWidth,
    //     height: window.innerHeight,
    // });

    const currentMenuKeys = useMemo(() => {
        const splitPath = location.pathname.replace(new RegExp("_", "g"), " ");
        const lastPath = splitPath.split("/").pop();

        // console.log(toTitleCase(lastPath));
        return toTitleCase(lastPath);
    }, [location]);

    const openChangeSidebarItem = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);

        if (sidebarItemKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };

    const getSize = () => {
        setWindowDiemnsion({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    };

    useEffect(() => {
        window.addEventListener('resize', getSize);
        return () => {
            window.removeEventListener('resize', getSize);
        };
    }, [windowDimension.width]);

    // const cachedData = useCachedData(["userProfile"]);
    // console.log(windowDimension.width);

    const {
        token: { 
            colorBgContainer,
            colorBgTextHover
        },
    } = theme.useToken();

    return (
        <Layout
            style={{
                height: window.innerHeight,
            }}
        >
            <Sider 
                collapsible
                collapsed={collapsed}
                trigger={null}
                breakpoint="lg"
                collapsedWidth={windowDimension.width >= 768 ? "70" : "0"}
                width={230}
                style={{
                    position: windowDimension.width < 768 ? "absolute" : "relative",
                    zIndex: windowDimension.width < 768 ? 9999 : 1,
                    display: "flex",
                    height: windowDimension.width < 768 ? "100vh" : "none",
                    flexDirection: "column",
                    backgroundColor: colorBgContainer
                }}
                onBreakpoint={(broken) => {
                    setIsShrink(broken);
                }}
                onCollapse={(collapsed) => {
                    setCollapsed(collapsed);
                }}
            >
                {/* logo and burger button */}
                <div 
                    className="sidebar-header-container"
                    style={{
                        "--justify": collapsed === true ? "center" : "space-between",
                    }}
                >
                    <MenuBurger 
                        collapsed={collapsed}
                        setCollapsed={setCollapsed}
                        innerWidth={windowDimension.width}
                    />

                    {/* site logo */}
                    <div 
                        className="logo-container" 
                        style={{
                            "--left": windowDimension.width < 768 ? "25%" : "none",
                            "--width": collapsed === true ? "0px" : "150px",  
                            "--marginLeft": collapsed === true ? "0px" : "15px",
                        }}
                    >
                        <Text 
                        style={{ 
                                fontSize: "22px", 
                                "--opacity": collapsed === true ? 0 : 1, 
                                "--delay": collapsed === true ? "0" : "0.2s",
                            }}
                        >
                            Admin Panel
                        </Text>
                        {/* <img src={dummyLogo} alt="profile" /> */}
                    </div>
                    {/* site logo */}

                </div>
                {/* logo and burger button */}

                {/* sidebar items */}
                <Menu
                    theme="light"
                    mode="inline"
                    defaultSelectedKeys={currentMenuKeys}
                    style={{
                        height: "87%",
                        overflow: "auto",
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                        backgroundColor: colorBgContainer,
                    }}
                    openKeys={openKeys}
                    items={sidebarItems()}
                    onOpenChange={openChangeSidebarItem}
                    onClick={() => {
                        collapsed === false && isShrink === true && setCollapsed(true);
                    }}
                />
                {/* sidebar items */}
            </Sider>
            <Layout className="site-layout">
                <Header
                    className="layout-header-menu"
                    style={{
                        paddingInline: 0,
                        paddingRight: "6px",
                        background: colorBgContainer,
                        borderBottomLeftRadius: windowDimension.width < 768 ? "16px" : "0",
                        borderBottomRightRadius: windowDimension.width < 768 ? "16px" : "0"
                    }}
                >
                    {/* navbar items */}
                    <TokpedCartDD />
                    <TokpedNotifDD 
                        innerWidth={windowDimension.width}
                    />
                    <MultiInboxDD />
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            marginTop: "12px",
                            marginBottom: "12px",
                        }}
                    >
                        <Divider type="vertical" style={{ display: "flex", height: '100%', backgroundColor: colorBgTextHover }}/>
                    </div>
                    <div 
                        className="toggle-theme-container"
                        style={{
                            "--bgColor": colorBgTextHover
                        }}
                    >
                        <input 
                            id="toggle" 
                            className={isDarkMode === true ? "dark-mode" : "light-mode"} 
                            type="checkbox" 
                            onChange={() => {
                                setIsDarkMode(!isDarkMode);
                                const themeMode = localStorage.getItem("themeMode");
                                localStorage.setItem("themeMode", themeMode === "light" ? "dark" : "light");
                            }} 
                        />
                    </div>
                    <NavbarProfileDD 
                        windowWidth={windowDimension.width}
                    />
                    {/* <TokpedProfileDD /> */}
                    {/* navbar items */}
                </Header>
                {
                    currentMenuKeys !== "Dashboard" &&
                    <BreadCrumb />
                }
                <Content
                    style={{
                        // width: "500px",
                        margin: '16px 24px',
                        background: "transparent",
                        overflowY: "auto",
                        // overflowX: "hidden",
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                        transition: "all 0.5s",
                    }}
                >
                    <Outlet />
                </Content>
                <Footer
                    style={{
                        display: "flex",
                        alignSelf: "flex-end",
                        padding: 0,
                        bottom: 0,
                        marginBottom: "12px",
                        marginRight: "12px",
                        textAlign: 'right',
                    }}
                    >
                        React Ant Design V5 ©2023 by nzrfrz
                </Footer>
            </Layout>
        </Layout>
    );
};