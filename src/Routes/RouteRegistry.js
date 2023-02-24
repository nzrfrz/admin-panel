import React from "react";
import { Link } from "react-router-dom";
import {
    HomeOutlined,
} from "@ant-design/icons";
import { 
    AiFillCode, 
    AiFillLayout
} from "react-icons/ai";
import { RxDot } from "react-icons/rx";
import { FaWpforms } from "react-icons/fa";
import { RiKnifeLine } from "react-icons/ri"


import { 
    DemoDashboard,
    DemoPlayground,

    LayoutOne,
    LayoutTwo,
    LayoutThree,

    ChatPage,
    DiscussionPage,
    ReviewPage,
    HelpPage,
    ComplainPages,

    SimpleOperation,
    ComplexOperation,
    ComplexOperationForm,
} from "../Pages/Demo";

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
            {
                key: "Complex",
                label: <Link to="/operation/complex" ><RxDot/>Complex Operation</Link>,
                path: "/operation/complex",
                element: <ComplexOperation />,
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
    {
        key: "Operation Registration",
        label: null,
        path: "/operation/complex/:method",
        isIndex: false,
        element: <ComplexOperationForm />,
        icon: null,
        children: [],
    },
];