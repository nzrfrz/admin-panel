import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
    theme,
    Divider,
    Dropdown,
    Typography, 
} from "antd";

// import { GlobalContext } from "../../../../App";
import { GlobalContext } from "../../../../GlobalContext";

import { 
    FaBell,
    FaCog,
} from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { AiOutlineRight } from "react-icons/ai";

import dummyProfile from "../../../../_assets/demo/images/dummy-image-profile.png";
import silverDiamond from "../../../../_assets/demo/images/silver-diamond.png";
import plus from "../../../../_assets/demo/images/plus1-130x55.png";
import wallet from "../../../../_assets/demo/images/wallet.png";
import money from "../../../../_assets/demo/images/money.png";
import circle from "../../../../_assets/demo/images/justCircle.png";
import off from "../../../../_assets/demo/images/off.png";

const { Text } = Typography;

export const TokpedProfileDD = () => {
    const navigate = useNavigate();
    const { setIsDarkMode } = useContext(GlobalContext);

    const [openDD, setOpenDD] = useState(false);

    const {
        token: { 
            colorBgContainer, 
            borderRadiusLG, 
            boxShadow,
            boxShadowCard,
            colorBgTextHover,
            colorError
        },
    } = theme.useToken();

    // console.log(theme.useToken());
    // console.log(window.innerWidth);

    return (
        <div 
            className="header-menu-dd-profile-container"
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
                        className="header-menu-dd-profile"
                        style={{
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                            boxShadow: boxShadow,
                        }}
                    >

                        {/* header title */}
                        <div 
                            className="dd-profile-header-title"
                            style={{
                                boxShadow: boxShadow,
                                "--borderColor": colorBgTextHover,
                                "--bgColor": colorBgTextHover,
                                borderTopLeftRadius: borderRadiusLG,
                                borderTopRightRadius: borderRadiusLG,
                            }}
                        >
                            <IoIosCloseCircleOutline style={{ fontSize: "30px", "--colorHover": colorError }} onClick={() => setOpenDD(false)} />
                            <Text strong style={{ fontSize: "18px" }} >Profile</Text>
                            <button
                                style={{
                                    "--bgc": colorBgTextHover,
                                    borderRadius: borderRadiusLG,
                                }}
                                onClick={() => {
                                    localStorage.clear();
                                    setIsDarkMode(false);
                                    navigate("/login");
                                }}
                            >
                                <Text style={{ fontSize: "14px" }}>Log Out</Text>
                                <img src={off} alt="profile" />
                            </button>
                        </div>
                        {/* header title */}

                        <div className="dd-profile-content">
                            <div className="dd-profile-button-container">
                                <button 
                                    className="dd-profile-top-section"
                                    style={{
                                        "--bgColor": colorBgTextHover,
                                        borderRadius: borderRadiusLG,
                                        borderColor: "transparent",
                                        "--boxShadow": boxShadowCard
                                    }}
                                    onClick={() => {
                                        console.log("GO TO MEMBER AREA");
                                        setOpenDD(false);
                                    }}
                                >
                                    <img src={"http://drive.google.com/uc?export=view&id=1DCruElbQ1qv6eqtLqyNL_rzrZ7egs-o2"} alt="profile" />
                                    <div className="top-section-left-side">
                                        <Text strong>User</Text>
                                        <div className="user-member-status">
                                            <img src={silverDiamond} alt="profile" />
                                            <Text style={{ fontSize: "12px" }}>Silver 2 Member</Text>
                                            <AiOutlineRight className="icon" />
                                        </div>
                                    </div>
                                </button>
                            </div>
                            <div className="dd-profile-below-section">
                                <div className="below-section-left-side">

                                    {/* plus feature */}
                                    <div 
                                        className="left-side-plus-feature"
                                        style={{
                                            "--bgc": colorBgTextHover,
                                            borderRadius: borderRadiusLG,
                                        }}
                                        onClick={() => {
                                            setOpenDD(false);
                                        }}
                                    >
                                        <div className="plus-feature-icon-wrapper">
                                            <img src={plus} alt="profile" />
                                            <Text strong>ButImus</Text>
                                        </div>
                                        <Text strong style={{ fontSize: "15px" }}>
                                            Sed ut perspiciatis unde omnis i
                                        </Text>
                                        <Text style={{ fontSize: "11px" }}>Sed ut perspiciatis u 50%, <span style={{ fontWeight: "bold" }}>$2,7.00/month</span></Text>
                                    </div>
                                    <Divider type="horizontal" style={{ position: "relative", margin: 0, backgroundColor: colorBgTextHover }} />
                                    {/* plus feature */}

                                    {/* e-wallet feature */}
                                    <div 
                                        className="left-side-eWallet-feature"
                                        style={{
                                            "--bgc": colorBgTextHover,
                                            borderRadius: borderRadiusLG,
                                        }}
                                        onClick={() => {
                                            setOpenDD(false);
                                        }}
                                    >
                                        <img src={wallet} alt="profile" />
                                        <div className="eWallet-list-balance">
                                            <div className="eWallet-currency">
                                                <Text strong>ZiPay</Text>
                                                <Text>$45,895.67</Text>
                                            </div>
                                            <div className="eWallet-coin">
                                                <Text strong style={{ fontSize: "12px" }}>ZiPay Coins</Text>
                                                <Text style={{ fontSize: "12px" }}>21,875</Text>
                                            </div>
                                        </div>
                                    </div>
                                    <Divider type="horizontal" style={{ position: "relative", margin: 0, backgroundColor: colorBgTextHover }} />
                                    {/* e-wallet feature */}

                                    {/* own balance feature */}
                                    <div 
                                        className="left-side-own-balance-feature"
                                        style={{
                                            "--bgc": colorBgTextHover,
                                            borderRadius: borderRadiusLG,
                                        }}
                                        onClick={() => {
                                            setOpenDD(false);
                                        }}
                                    >
                                        <img src={money} alt="profile" />
                                        <div className="own-balance">
                                            <div className="own-currency-balance">
                                                <Text strong>Balance</Text>
                                                <Text>$95.17</Text>
                                            </div>
                                        </div>
                                    </div>
                                    <Divider type="horizontal" style={{ position: "relative", margin: 0, backgroundColor: colorBgTextHover }} />
                                    {/* own balance feature */}

                                    {/* other balance feature */}
                                    <div 
                                        className="left-side-other-balance-feature"
                                        style={{
                                            "--bgc": colorBgTextHover,
                                            borderRadius: borderRadiusLG,
                                        }}
                                        onClick={() => {
                                            setOpenDD(false);
                                        }}
                                    >
                                        <img src={circle} alt="profile" />
                                        <div className="other-balance">
                                            <div className="other-currency-balance">
                                                <Text strong style={{ fontSize: "12px" }}>OTH Cash</Text>
                                                <Text strong style={{ fontSize: "12px" }}>Activate</Text>
                                            </div>
                                        </div>
                                    </div>
                                    <Divider type="horizontal" style={{ position: "relative", margin: 0, backgroundColor: colorBgTextHover }} />
                                    {/* other balance feature */}

                                    {/* other option 1 */}
                                    <div className="other-options-one-container">
                                        <div 
                                            className="other-options-one-feature"
                                            style={{
                                                "--bgc": colorBgTextHover,
                                                borderRadius: borderRadiusLG,
                                            }}
                                            onClick={() => {
                                                setOpenDD(false);
                                            }}
                                        >
                                            <Text>LoreMipsum</Text>
                                            <Text>4</Text>
                                        </div>
                                        <div 
                                            className="other-options-one-feature"
                                            style={{
                                                "--bgc": colorBgTextHover,
                                                borderRadius: borderRadiusLG,
                                            }}
                                            onClick={() => {
                                                setOpenDD(false);
                                            }}
                                        >
                                            <Text>LoreMipsum</Text>
                                            <Text>4</Text>
                                        </div>
                                        <div 
                                            className="other-options-one-feature"
                                            style={{
                                                "--bgc": colorBgTextHover,
                                                borderRadius: borderRadiusLG,
                                            }}
                                            onClick={() => {
                                                setOpenDD(false);
                                            }}
                                        >
                                            <Text>LoreMipsum</Text>
                                            <Text>4</Text>
                                        </div>
                                    </div>
                                    {/* other option 1 */}

                                </div>
                                <Divider type="vertical" style={{ backgroundColor: colorBgTextHover }}/>
                                <div className="below-section-right-side">

                                    {/* other option 2 */}
                                    <div className="other-options-two-container">
                                        <div className="other-options-two-container">
                                            <div 
                                                className="other-options-two-feature"
                                                style={{
                                                    "--bgc": colorBgTextHover,
                                                    borderRadius: borderRadiusLG,
                                                }}
                                                onClick={() => {
                                                    setOpenDD(false);
                                                }}
                                            >
                                                <Text>Purchase</Text>
                                            </div>
                                            <div 
                                                className="other-options-two-feature"
                                                style={{
                                                    "--bgc": colorBgTextHover,
                                                    borderRadius: borderRadiusLG,
                                                }}
                                                onClick={() => {
                                                    setOpenDD(false);
                                                }}
                                            >
                                                <Text>WishList</Text>
                                            </div>
                                            <div 
                                                className="other-options-two-feature"
                                                style={{
                                                    "--bgc": colorBgTextHover,
                                                    borderRadius: borderRadiusLG,
                                                }}
                                                onClick={() => {
                                                    setOpenDD(false);
                                                }}
                                            >
                                                <Text>LoreMipsum</Text>
                                            </div>
                                            <div 
                                                className="other-options-two-feature"
                                                style={{
                                                    "--bgc": colorBgTextHover,
                                                    borderRadius: borderRadiusLG,
                                                }}
                                                onClick={() => {
                                                    setOpenDD(false);
                                                }}
                                            >
                                                <Text>Setting</Text>
                                            </div>
                                        </div>
                                    </div>
                                    {/* other option 2 */}

                                </div>
                            </div>
                        </div>
                    </div>
                )}
            >
                <div className="header-menu-dd-profile-title">
                    <img src={"http://drive.google.com/uc?export=view&id=1DCruElbQ1qv6eqtLqyNL_rzrZ7egs-o2"} alt="profile" />
                    {/* <Text>User</Text> */}
                </div>
            </Dropdown>
        </div>
    );
};