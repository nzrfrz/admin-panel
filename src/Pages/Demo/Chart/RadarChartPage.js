import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import dayjs from "dayjs";
import { 
    theme,
    Typography, 
    Select,
    Checkbox
} from "antd";
import { GlobalContext } from "../../../GlobalContext";

import { RadarChart } from "../../../Component";

const { Text, Title } = Typography;

export const RadarChartPage = () => {
    const { isDarkMode, windowDimension } = useContext(GlobalContext);

    const [seriesType, setSeriesType] = useState("single");
    const [showYaxisLabel, setShowYaxislabel] = useState(false);

    const categories = ['April', 'May', 'June', 'July', 'August', 'September'];

    const seriesData = useMemo(() => {
        if (seriesType === "single") {
            return [
                {
                    name: "Radar Series 1",
                    data: [45, 52, 38, 24, 33, 10]
                }
            ]
        }
        else {
            return [
                {
                    name: "Radar Series 1",
                    data: [45, 52, 38, 24, 33, 10]
                },
                {
                    name: "Radar Series 2",
                    data: [26, 21, 20, 6, 8, 15]
                }
            ]
        }
    }, [seriesType]);
    
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
                    <Text>Series Type</Text>
                    <Select
                        size="large"
                        placeholder="Select Series"
                        defaultValue={seriesType}
                        style={{ width: 150 }}
                        onChange={(e) => {
                            setSeriesType(e);
                        }}
                        options={[
                            { value: 'single', label: 'Single' },
                            { value: 'multiple', label: 'Multiple' },
                        ]}
                    />
                </div>
                <Checkbox 
                    style={{
                        alignSelf: "flex-end",
                    }}
                    onChange={(e) => {
                        setShowYaxislabel(e.target.checked);
                    }}
                >
                    Show Y Axis Label
                </Checkbox>
            </div>

            <div 
                className="fix-chart-container-dimension"
                style={{
                    "--fixChartHeight": `${windowDimension.height - 340}px`
                }}
            >
                <RadarChart 
                    categories={categories}
                    seriesData={seriesData}
                    showYaxisLabel={showYaxisLabel}
                />
            </div>

        </div>
    );
};