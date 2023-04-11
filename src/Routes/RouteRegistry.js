import React, { lazy } from "react";
import { Link } from "react-router-dom";
import {
    HomeOutlined,
    AreaChartOutlined
} from "@ant-design/icons";
import { 
    AiFillCode, 
    AiFillLayout
} from "react-icons/ai";
import { RxDot } from "react-icons/rx";
import { FaWpforms } from "react-icons/fa";
import { RiKnifeLine } from "react-icons/ri";
import { IoMapOutline } from "react-icons/io5";

// import { 
//     DemoDashboard,
// } from "./LazyLoading";

import { 
    DemoDashboard,
    DemoPlayground,

    LayoutOne,
    LayoutTwo,
    LayoutThree,
    LayoutFour,

    ChatPage,
    DiscussionPage,
    ReviewPage,
    HelpPage,
    ComplainPages,

    SimpleOperation,

    LineChartPage,
    AreaChartPage,
    BarChartPage,
    BoxPlotChartPage,
    CandlestickChartPage,
    PieChartPage,
    RadarChartPage,

    LeafletMap,
} from "../Pages/Demo";

// const DemoDashboard = lazy(() => import("../Pages/Demo/Dashboard/DemoDashboard"));

// Edit here to create new sidebar route
export const sidebarRouteList = [
    {
        key: "Dashboard",
        label: <Link to="/dashboard" >Dashboard</Link>,
        path: "/dashboard",
        isIndex: true,
        element: <DemoDashboard />,
        icon: <HomeOutlined />,
        children: [],
    },
    {
        key: "Playground",
        label: <Link to="/playground" >Playground</Link>,
        path: "/playground",
        isIndex: false,
        element: <DemoPlayground />,
        icon: <AiFillCode />,
        children: [],
    },
    {
        key: "Content Layout",
        label: "Content Layout",
        path: "/content_layout",
        isIndex: false,
        element: null,
        icon: <AiFillLayout />,
        children: [
            {
                key: "Layout One",
                label: <Link to="/content_layout/layout_one" ><RxDot/>Layout One</Link>,
                path: "/content_layout/layout_one",
                element: <LayoutOne />,
                icon: null,
                children: null
            },
            {
                key: "Layout Two",
                label: <Link to="/content_layout/layout_two" ><RxDot/>Layout Two</Link>,
                path: "/content_layout/layout_two",
                element: <LayoutTwo />,
                icon: null,
                children: null
            },
            {
                key: "Layout Three",
                label: <Link to="/content_layout/layout_three" ><RxDot/>Layout Three</Link>,
                path: "/content_layout/layout_three",
                element: <LayoutThree />,
                icon: null,
                children: null
            },
            {
                key: "Layout Four",
                label: <Link to="/content_layout/layout_four" ><RxDot/>Layout Four</Link>,
                path: "/content_layout/layout_four",
                element: <LayoutFour />,
                icon: null,
                children: null
            },
        ]
    },
    {
        key: "Operation",
        label: "Operation",
        path: "/operation",
        isIndex: false,
        element: null,
        icon: <RiKnifeLine />,
        children: [
            {
                key: "Simple",
                label: <Link to="/operation/simple" ><RxDot/>Simple Operation</Link>,
                path: "/operation/simple",
                element: <SimpleOperation />,
                icon: null,
                children: null
            },
        ],
    },
    {
        key: "Chart",
        label: "Chart",
        path: "/chart",
        isIndex: false,
        element: null,
        icon: <AreaChartOutlined />,
        children: [
            {
                key: "Line",
                label: <Link to="/chart/line" ><RxDot/>Line</Link>,
                path: "/chart/line",
                element: <LineChartPage />,
                icon: null,
                children: null
            },
            {
                key: "Area",
                label: <Link to="/chart/area" ><RxDot/>Area</Link>,
                path: "/chart/area",
                element: <AreaChartPage />,
                icon: null,
                children: null
            },
            {
                key: "Bar",
                label: <Link to="/chart/bar" ><RxDot/>Bar</Link>,
                path: "/chart/bar",
                element: <BarChartPage />,
                icon: null,
                children: null
            },
            {
                key: "Box Plot",
                label: <Link to="/chart/box_plot" ><RxDot/>Box Plot</Link>,
                path: "/chart/box_plot",
                element: <BoxPlotChartPage />,
                icon: null,
                children: null
            },
            {
                key: "Candlestick",
                label: <Link to="/chart/candlestick" ><RxDot/>Candlestick</Link>,
                path: "/chart/candlestick",
                element: <CandlestickChartPage />,
                icon: null,
                children: null
            },
            {
                key: "Pie",
                label: <Link to="/chart/pie" ><RxDot/>Pie</Link>,
                path: "/chart/pie",
                element: <PieChartPage />,
                icon: null,
                children: null
            },
            {
                key: "Radar",
                label: <Link to="/chart/radar" ><RxDot/>Radar</Link>,
                path: "/chart/radar",
                element: <RadarChartPage />,
                icon: null,
                children: null
            },
        ],
    },
];

export const otherRouteList = [
    {
        key: "Chat",
        label: null,
        path: "/chat",
        isIndex: false,
        element: <ChatPage />,
        icon: null,
        children: [],
    },
    {
        key: "Discussion",
        label: null,
        path: "/discussion",
        isIndex: false,
        element: <DiscussionPage />,
        icon: null,
        children: [],
    },
    {
        key: "Review",
        label: null,
        path: "/review",
        isIndex: false,
        element: <ReviewPage />,
        icon: null,
        children: [],
    },
    {
        key: "Help",
        label: null,
        path: "/help",
        isIndex: false,
        element: <HelpPage />,
        icon: null,
        children: [],
    },
    {
        key: "Complain",
        label: null,
        path: "/complain",
        isIndex: false,
        element: <ComplainPages />,
        icon: null,
        children: [],
    },
];