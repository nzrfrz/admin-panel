import React from "react";
import { 
    theme,
    Badge,
    Divider,
    Dropdown,
    Typography, 
} from "antd";
import { FaShoppingCart } from "react-icons/fa";

import { cartData } from "../../../../_assets/demo/data/cartData";

const { Text } = Typography;

export const TokpedCartDD = () => {

    const {
        token: { 
            colorBgContainer, 
            borderRadiusLG, 
            boxShadow,
            colorBgTextHover,
            colorPrimary,
        },
    } = theme.useToken();

    return (
        <div 
            className="header-menu-dd-cart-container"
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
                        className="header-menu-dd-cart"
                        style={{
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                            boxShadow: boxShadow,
                        }}
                    >
                        <div className="cart-item-header">
                            <Text>Cart</Text>
                            <Badge count={cartData().length} />
                            <Text style={{ color: "#067481" }}>See Now</Text>
                        </div>
                        <div className="divider-container">
                            <Divider type="horizontal" style={{ position: "relative", margin: 0, backgroundColor: colorBgTextHover }} />
                        </div>
                        <div className="cart-item-list-container">

                            {
                                cartData().map((data, index) => 
                                <div key={index}>
                                    <div className="cart-item" style={{ "--colorHover": colorPrimary }}>
                                        <div className="cart-item-image">
                                            <img src={data.image} alt="profile" />
                                        </div>
                                        <div className="cart-item-title">
                                            <Text strong>{data.productName}</Text>
                                            <Text style={{ fontSize: "12px", color: "gray" }}>{data.amount} {data.amount === "1" ? "item" : "items"} ({data.heigt})</Text>
                                        </div>
                                        <div className="cart-item-price">
                                            <Text>{data.price}</Text>
                                        </div>
                                    </div>
                                    {
                                        cartData().length - 1 !== index ?
                                        <div className="divider-container">
                                            <Divider type="horizontal" style={{ position: "relative",margin: "8px 0px 8px 0px", backgroundColor: colorBgTextHover }} />
                                        </div>
                                        :
                                        <div style={{ marginBottom: "12px" }} />
                                    }
                                </div>
                                )
                            }

                        </div>
                    </div>
                )}
            >
                <div className="header-menu-dd-multi-inbox-title">
                    <Badge count={cartData().length}>
                        <FaShoppingCart style={{ fontSize: "25px" }} />
                    </Badge>
                </div>
            </Dropdown>
        </div>
    );
};