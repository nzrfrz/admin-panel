import React, { useContext, useMemo, useState } from "react";
import dayjs from "dayjs";
import { 
    theme,
    Typography, 
    Select,
    Checkbox
} from "antd";
import { GlobalContext } from "../../../GlobalContext";

import { LineChart } from "../../../Component";

import dummySeriesData from "../../../_assets/_dummySeriesData.json";

const { Text, Title } = Typography;

export const LineChartPage = () => {
    const { isDarkMode, windowDimension } = useContext(GlobalContext);

    const [curveType, setCurveType] = useState("straight");
    const [seriesType, setSeriesType] = useState("single");
    const [showMarker, setShowMarker] = useState(false);

    const seriesData = useMemo(() => {
        if (seriesType === "single") {
            const xAxisCategories = dummySeriesData.map((data) => dayjs(new Date(data.x)).format("MMM YY"));
            const seriesData = dummySeriesData.map((data) => data.y);
            return {
                chartTitle: "Nifty 50 Index",
                xAxisCategories,
                data: [
                    {
                        name: "Price",
                        data: seriesData
                    }
                ]
            }
        }
        else {
            return {
                chartTitle: "Number Of New Customer",
                xAxisCategories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
                data: [
                    {
                        name: "2016",
                        data: [155, 150, 152, 148, 142, 150, 146, 149, 153, 158, 154, 150]
                    },
                    {
                        name: "2017",
                        data: [172, 173, 175, 172, 162, 165, 172, 168, 175, 170, 165, 169]
                    }
                ]
            }
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
                    <Text>Curve Type</Text>
                    <Select
                        size="large"
                        placeholder="Select Curve"
                        defaultValue={curveType}
                        style={{ width: 150 }}
                        onChange={(e) => {
                            setCurveType(e);
                        }}
                        options={[
                            { value: 'smooth', label: 'Smooth' },
                            { value: 'straight', label: 'Straight' },
                            { value: 'stepline', label: 'Step Line' },
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
                        setShowMarker(e.target.checked);
                    }}
                >
                    Show Marker
                </Checkbox>
            </div>
            
            <div 
                className="fix-chart-container-dimension"
                style={{
                    "--fixChartHeight": `${windowDimension.height - 340}px`
                }}
            >
                <LineChart 
                    curveType={curveType}
                    showMarker={showMarker}
                    data={seriesData}
                />
            </div>

        </div>
    );
};