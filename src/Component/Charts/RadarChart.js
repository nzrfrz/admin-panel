import React, { useContext } from "react";
import { GlobalContext } from "../../GlobalContext";

import { 
    theme,
} from "antd";
import Chart from "react-apexcharts";

import { chartDefaultOptions } from "./chartDefaultOptions";

export const RadarChart = ({categories, seriesData, showYaxisLabel = false}) => {
    const { isDarkMode } = useContext(GlobalContext);
    
    const {
        token: { 
            fontFamily,
        },
    } = theme.useToken();

    const chartOptions = {
        ...chartDefaultOptions(isDarkMode),
        chart: {
            fontFamily: fontFamily,
            background: "transparent",
            toolbar: {
                show: true,
            },
        },
        title: {
            text: "Radar Chart",
            align: 'left',
            style: {
                fontSize: "18px"
            }
        },
        xaxis: {
            categories: categories,
            labels: {
                show: true,
                style: {
                    colors: undefined,
                }
            }
        },
        yaxis: {
            show: showYaxisLabel,
        },
        markers: {
            size: 5,
            hover: {
                size: 7
            }
        }
    };

    const series = [
        {
            name: "Radar Series 1",
            data: [45, 52, 38, 24, 33, 10]
        },
        // {
        //     name: "Radar Series 2",
        //     data: [26, 21, 20, 6, 8, 15]
        // }
    ]

    return (
        <Chart 
            type="radar"
            options={chartOptions}
            series={seriesData}
            height={"100%"}
        />
    );
};