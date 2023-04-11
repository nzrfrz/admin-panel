import React, { useContext, useMemo, useState } from "react";
import dayjs from "dayjs";
import { 
    theme,
    Typography, 
    Select,
    Checkbox
} from "antd";
import { GlobalContext } from "../../../GlobalContext";

import { BoxPlotChart } from "../../../Component";

import dummyBoxPlotData from "../../../_assets/_dummySeriesBoxPlotData.json";

const { Text, Title } = Typography;

export const BoxPlotChartPage = () => {
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
            <div 
                className="fix-chart-container-dimension"
                style={{
                    "--fixChartHeight": `${windowDimension.height - 270}px`
                }}
            >
                <BoxPlotChart 
                    chartData={dummyBoxPlotData}
                />
            </div>
        </div>
    );
};