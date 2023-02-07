import React from "react";
import { Button } from "antd";

export const DemoPlayground = () => {
    return (
        <div>
            <Button
                disabled
                type="ghost"
                style={{
                    backgroundColor: "silver"
                }}
            >
                PLAYGROUND
            </Button>
        </div>
    );
};