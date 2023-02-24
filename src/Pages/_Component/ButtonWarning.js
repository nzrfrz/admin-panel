import React from "react";
import {
    Button,
    ConfigProvider,
} from "antd";

export const ButtonWarning = ({shape, style, text, htmlType, icon, onClick}) => {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#ffbb33',
                    colorPrimaryHover: '#FF8800',
                    colorPrimaryActive: "rgba(255, 136, 0, 0.5)"
                },
            }}
        >
            <Button
                className="button-warning"
                shape={shape}
                type="primary"
                htmlType={htmlType}
                icon={icon}
                style={style}
                onClick={onClick}
            >
                {text}
            </Button>
        </ConfigProvider>
    );
};