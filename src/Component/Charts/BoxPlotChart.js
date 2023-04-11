import React, { useContext } from "react";
import { GlobalContext } from "../../GlobalContext";

import { 
    theme,
} from "antd";
import Chart from "react-apexcharts";

import { chartDefaultOptions } from "./chartDefaultOptions";

export const BoxPlotChart = ({chartData}) => {
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
                enabled: false
            }
        },
        title: {
            text: "Box Plot",
            align: 'left',
            style: {
                fontSize: "18px"
            }
        },
        plotOptions: {
            bar: {
                borderRadius: 0,
                horizontal: false,
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
            },
            title: {
                text: "Box Plot X"
            }
        },
        yaxis: {
            title: {
                text: "Box Plot Y"
            }
        }
    };

    return (
        <Chart 
            type="boxPlot"
            options={chartOptions}
            series={chartData?.seriesData}
            height={"100%"}
        />
    );
};