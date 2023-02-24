import React from "react";
import {
    Button,
    ConfigProvider,
} from "antd";

export const ButtonInfo = ({shape, style, text, htmlType, icon, onClick}) => {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#33b5e5',
                    colorPrimaryHover: '#0099CC',
                    colorPrimaryActive: "rgba(0, 153, 204, 0.5)"
                },
            }}
        >
            <Button
                className="button-info"
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