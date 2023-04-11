import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { 
    theme,
    Typography, 
    Select,
    Checkbox
} from "antd";
import { GlobalContext } from "../../../GlobalContext";

import { RadarChart } from "../../../Component";

const { Title } = Typography;

export const DemoPlayground = () => {
    const { isDarkMode, windowDimension } = useContext(GlobalContext);

    const {
        token: { 
            borderRadiusLG,
        },
    } = theme.useToken();

    return (
        <div 
            className="fix-height-chart-container"
            style={{
                "--bgc": isDarkMode === true ? "var(--contentContainerDarkMode)" : "var(--contentContainerLightMode)",
                borderRadius: borderRadiusLG
            }}
        >
            <div className="chart-page-title-container">
                <Title level={3}>PLAYGROUND</Title>
            </div>
            
            <div 
                className="fix-chart-container-dimension"
                style={{
                    "--fixChartHeight": `${windowDimension.height - 320}px`
                }}
            >
                <RadarChart />
            </div>
        </div>
    );
};