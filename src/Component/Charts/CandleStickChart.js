import React, { useContext } from "react";
import { GlobalContext } from "../../GlobalContext";
import dayjs from "dayjs";

import { 
    theme,
} from "antd";
import Chart from "react-apexcharts";

import { chartDefaultOptions } from "./chartDefaultOptions";

export const CandleStickChart = ({chartData}) => {
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
            zoom: {
                enabled: true
            }
        },
        title: {
            text: chartData.title,
            align: 'left',
            style: {
                fontSize: "18px"
            }
        },
        plotOptions: {
            bar: {
                borderRadius: 0,
                columnWidth: '20%',
                barHeight: '50%',
            }
        },
        xaxis: {
            type: "",
            labels: {
                show: true,
                rotate: -35,
                rotateAlways: false,
                formatter: (value) => {
                    return dayjs(value).format("DD MMM");
                }
            },
            title: {
                text: chartData.xAxisTitle
            }
        },
        yaxis: {
            title: {
                text: chartData.yAxisTitle
            }
        }
    };

    return (
        <Chart 
            type="candlestick"
            options={chartOptions}
            series={chartData.seriesData}
            height={"100%"}
        />
    );
};