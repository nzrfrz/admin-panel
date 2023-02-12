import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { 
    Typography, 
    Breadcrumb 
} from "antd";
import {
    HomeOutlined,
    UserOutlined,
} from '@ant-design/icons';

import { sidebarRouteList } from "./RouteRegistry";

import { toTitleCase } from "../_helper";

const { Text } = Typography;

export const BreadCrumb = () => {
    const location = useLocation();

    const breadCrumbData = useMemo(() => {
        const tempBreadcrumbData = location.pathname
            .replace(new RegExp("_", "g"), " ")
            .split("/")
            .filter((data) => data)
            .map((data) => toTitleCase(data));

        const data = tempBreadcrumbData.map((data) => {
            return {
                path: data,
                icon: sidebarRouteList.filter((routeItem) => routeItem.key === data).map((data) => data.icon)[0]
            }
        });

        // console.log(data);
        return data;
    }, [location])

    return (
        <Breadcrumb
            style={{
                display: "flex",
                marginTop: "12px",
                marginLeft: "16px",
            }}
        >
            {
                breadCrumbData.map((data, index) => 
                    <Breadcrumb.Item key={index} className="bc-item">
                        {data.icon}
                        <span>
                            {data.path}
                        </span>
                    </Breadcrumb.Item>
                )
            }
        </Breadcrumb>
    );
};

