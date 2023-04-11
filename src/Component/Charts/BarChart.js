import React, { useContext } from "react";
import { GlobalContext } from "../../GlobalContext";

import { 
    theme,
} from "antd";
import Chart from "react-apexcharts";

import { chartDefaultOptions } from "./chartDefaultOptions";

export const BarChart = ({stackedBar = false, direction = "vertical", showAxisTitle = false, data}) => {
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
            stacked: stackedBar,
            toolbar: {
                show: true,
            },
            zoom: {
                enabled: false
            }
        },
        title: {
            text: data.title,
            align: 'left',
            style: {
                fontSize: "18px"
            }
        },
        dataLabels: {
            enabled: true,
        },
        plotOptions: {
            bar: {
                borderRadius: 0,
                horizontal: direction === "horizontal" ? true : false,
            }
        },
        xaxis: {
            type: "",
            labels: {
                show: true,
                rotate: -35,
                rotateAlways: false,
            },
            title: {
                text: showAxisTitle === true ? direction === "horizontal" ? data.xAxisTitle : data.yAxisTitle : ""
            }
        },
        yaxis: {
            title: {
                text: showAxisTitle === true ? direction === "horizontal" && showAxisTitle === true ? data.yAxisTitle : data.xAxisTitle : ""
            }
        }
    };

    return (
        <Chart 
            type="bar"
            options={chartOptions}
            series={data.seriesData}
            height={"100%"}
        />
    );
};