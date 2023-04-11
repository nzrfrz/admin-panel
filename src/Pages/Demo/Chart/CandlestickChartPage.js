import React, { useContext } from "react";
import { 
    theme,
} from "antd";
import { GlobalContext } from "../../../GlobalContext";

import { CandleStickChart } from "../../../Component";

import dummyCandlestickData from "../../../_assets/_dummySeriesCandleStickData.json";

export const CandlestickChartPage = () => {
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
                <CandleStickChart 
                    chartData={dummyCandlestickData}
                />
            </div>
        </div>
    );
};