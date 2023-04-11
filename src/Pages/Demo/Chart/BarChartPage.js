import React, { useContext, useMemo, useState } from "react";
import dayjs from "dayjs";
import { 
    theme,
    Typography, 
    Select,
    Checkbox
} from "antd";
import { GlobalContext } from "../../../GlobalContext";

import { BarChart, RangeBarChart } from "../../../Component";

import stackedBarData from "../../../_assets/_dummySeriesBarStackedData.json";
import basicBarData from "../../../_assets/_dummySeriesBarBasicData.json";
import rangedBarData from "../../../_assets/_dummySeriesBarRangedData.json";

const { Text } = Typography;

export const BarChartPage = () => {
    const { isDarkMode, windowDimension } = useContext(GlobalContext);

    const [direction, setDirection] = useState("vertical");
    const [seriesType, setSeriesType] = useState("single");
    const [stackedBar, setStackedBar] = useState(false);
    const [showAxisTitle, setShowAxisTitle] = useState(false);

    const seriesData = useMemo(() => {
        if (seriesType === "single") {
            return basicBarData;
        }
        else if (seriesType === "multiple") {
            return stackedBarData;
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
                    <Text>Direction</Text>
                    <Select
                        size="large"
                        placeholder="Select Curve"
                        defaultValue={direction}
                        style={{ width: 150 }}
                        onChange={(e) => {
                            setDirection(e);
                        }}
                        options={[
                            { value: 'vertical', label: 'Vertical' },
                            { value: 'horizontal', label: 'Horizontal' },
                        ]}
                    />
                </div>
                <div className="filter-select-container">
                    <Text>Series Type</Text>
                    <Select
                        size="large"
                        placeholder="Select Series"
                        defaultValue={seriesType}
                        style={{ width: 150 }}
                        onChange={(e) => {
                            setSeriesType(e);
                            if (e === "ranged") {
                                setStackedBar(false);
                            }
                        }}
                        options={[
                            { value: 'single', label: 'Single' },
                            { value: 'ranged', label: 'Ranged' },
                            { value: 'multiple', label: 'Multiple' },
                        ]}
                    />
                </div>
                {
                    seriesType === "multiple" &&
                    <Checkbox 
                        style={{
                            alignSelf: "flex-end",
                        }}
                        onChange={(e) => {
                            setStackedBar(e.target.checked);
                        }}
                    >
                        Stacked Bar
                    </Checkbox>
                }
                <Checkbox 
                    style={{
                        alignSelf: "flex-end",
                    }}
                    onChange={(e) => {
                        setShowAxisTitle(e.target.checked);
                    }}
                >
                    Show Axis Title
                </Checkbox>
            </div>

            <div 
                className="fix-chart-container-dimension"
                style={{
                    "--fixChartHeight": `${windowDimension.height - 340}px`
                }}
            >
                {
                    seriesType !== "ranged" ? 
                    <BarChart 
                        direction={direction}
                        stackedBar={stackedBar}
                        showAxisTitle={showAxisTitle}
                        data={seriesData}
                    />
                    :
                    <RangeBarChart 
                        direction={direction}
                        stackedBar={stackedBar}
                        showAxisTitle={showAxisTitle}
                        data={rangedBarData}
                    />
                }
            </div>

        </div>
    );
};