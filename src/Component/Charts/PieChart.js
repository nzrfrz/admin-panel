import React, { useContext } from "react";
import { GlobalContext } from "../../GlobalContext";

import { 
    theme,
} from "antd";
import Chart from "react-apexcharts";

import { chartDefaultOptions } from "./chartDefaultOptions";

export const PieChart = ({chartType = "pie", title, labels, series}) => {
    const { isDarkMode } = useContext(GlobalContext);
    
    const {
        token: { 
            fontFamily,
        },
    } = theme.useToken();

    const chartOptions = {
        ...chartDefaultOptions(isDarkMode),
        labels: labels,
        chart: {
            fontFamily: fontFamily,
            background: "transparent",
            toolbar: {
                show: true,
            },
        },
        title: {
            text: title,
            align: 'left',
            style: {
                fontSize: "18px"
            }
        },
        plotOptions: {
            pie: {
                expandOnClick: true,
                donut: {
                    labels: {
                        show: chartType !== "pie" ? true : false,
                        name: {
                            show: true,
                            color: undefined,
                            offsetY: -5,
                            formatter: function (val) {
                                return val
                            }
                        },
                        value: {
                            show: true,
                            fontSize: '16px',
                            fontWeight: 400,
                            color: undefined,
                            offsetY: 0,
                            formatter: function (val) {
                                return val
                            }
                        },
                        total: {
                            show: true,
                            showAlways: true,
                            label: 'Total',
                            fontSize: '22px',
                            fontWeight: 600,
                            color: undefined,
                            formatter: function (w) {
                                return w.globals.seriesTotals.reduce((a, b) => {
                                    return a + b
                                }, 0)
                            }
                        }
                    }
                }
            }
        },
        legend: {
            show: true,
            position: "bottom"
        }
    };

    return (
        <Chart 
            type={chartType}
            options={chartOptions}
            series={series}
            height={"100%"}
        />
    );
};