import React from "react";
import {
    Button,
    ConfigProvider,
} from "antd";

export const ButtonError = ({shape, style, text, htmlType, icon, onClick}) => {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#ff4444',
                    colorPrimaryHover: '#CC0000',
                    colorPrimaryActive: "rgba(204, 0, 0, 0.5)"
                },
            }}
        >
            <Button
                className="button-error"
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