import React from "react";
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

import clock from "../../../../../_assets/demo/images/clock.png";
import sync from "../../../../../_assets/demo/images/sync.png";
import truck from "../../../../../_assets/demo/images/truck.png";
import placeMarker from "../../../../../_assets/demo/images/place-marker.png";
import cat from "../../../../../_assets/demo/images/cat-sleep.png";

const { Header, Sider, Content, Footer } = Layout;
const { Text } = Typography;

const trackingItemList = [
    {
        key: "1",
        label: "Waiting Confirmation",
        img: clock,
    },
    {
        key: "2",
        label: "Order Processed",
        img: sync,
    },
    {
        key: "3",
        label: "Sending",
        img: truck,
    },
    {
        key: "3",
        label: "Arrived",
        img: placeMarker,
    },
];

export const TransactionContent = ({setOpenDD}) => {

    const {
        token: { 
            colorBgTextHover,
            borderRadiusLG,
            colorSuccessText
        },
    } = theme.useToken();

    return (
        <div className="transaction-content-container">
            <div className="transaction-content-top-section-container">
                <div 
                    className="purchase-content"
                    onClick={() => {
                        setOpenDD(false);
                    }}
                >
                    <Text strong>Purchase</Text>
                    <Text style={{ color: "#067481" }}>See All</Text>
                </div>
                <div 
                    className="payment-awaits-content" 
                    style={{ 
                        "--bgc": colorBgTextHover, 
                        borderRadius: borderRadiusLG 
                    }}
                    onClick={() => {
                        setOpenDD(false);
                    }}
                >
                    <Text strong>Waiting for payment</Text>
                </div>
                <div className="purchase-tracking-content">
                    {
                        trackingItemList.map((data, index) => 
                            <div 
                                key={index} 
                                className="purchase-tracking-item-container"
                                style={{
                                    "--bgc": colorBgTextHover,
                                    borderRadius: borderRadiusLG,
                                }}
                                onClick={() => {
                                    setOpenDD(false);
                                }}
                            >
                                <img src={data.img} alt="profile" />
                                <Text>{data.label}</Text>
                            </div>
                        )
                    }
                </div>
            </div>
            <Divider type="horizontal" style={{ position: "relative", backgroundColor: colorBgTextHover }} />
            <div className="transaction-content-below-section-container">
                <Text strong >For You</Text>
                <img src={cat} alt="profile" />
                <Text strong >No Notification Yet</Text>
                <Text style={{ fontSize: "12px", color: "gray" }}>Notifications regarding your transaction will appear here</Text>
                <div className="button-container">
                    <Button
                        block
                        type="primary"
                        style={{
                            backgroundColor: colorSuccessText
                        }}
                        onClick={() => {
                            setOpenDD(false);
                        }}
                    >
                        Start Shopping
                    </Button>
                </div>
            </div>
        </div>
    );
};