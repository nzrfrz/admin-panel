import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import dayjs from "dayjs";
import { 
    theme,
    Typography, 
    Select,
    Checkbox
} from "antd";
import { GlobalContext } from "../../../GlobalContext";

import { PieChart } from "../../../Component";

import dummyPieData from "../../../_assets/_dummySeriesPieData.json";

const { Text, Title } = Typography;

export const PieChartPage = () => {
    const { isDarkMode, windowDimension } = useContext(GlobalContext);

    const [type, setType] = useState("pie");

    const chartLabels = useMemo(() => {
        return dummyPieData.seriesData.data.map((data) => data.label);
    }, [dummyPieData]);

    const chartSeries = useMemo(() => {
        return dummyPieData.seriesData.data.map((data) => data.series);
    }, [dummyPieData]);

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
                <div className="filter-select-container">
                    <Text>Select Type</Text>
                    <Select
                        size="large"
                        placeholder="Select Type"
                        defaultValue={type}
                        style={{ width: 150 }}
                        onChange={(e) => {
                            setType(e);
                        }}
                        options={[
                            { value: 'pie', label: 'Pie' },
                            { value: 'donut', label: 'donut' },
                        ]}
                    />
                </div>
            </div>

            <div 
                className="fix-chart-container-dimension"
                style={{
                    "--fixChartHeight": `${windowDimension.height - 340}px`
                }}
            >
                <PieChart 
                    chartType={type}
                    title={dummyPieData.title}
                    labels={chartLabels}
                    series={chartSeries}
                />
            </div>

        </div>
    );
};