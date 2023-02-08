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

    RegistrationForms,
    UpdateForms, 
    SplitForm,

    ChatPage,
    DiscussionPage,
    ReviewPage,
    HelpPage,
    ComplainPages,

    Operation
} from "../Demo";

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
        key: "Forms",
        label: "Forms",
        path: "/forms",
        isIndex: false,
        element: null,
        icon: <FaWpforms />,
        children: [
            {
                key: "Registration Forms",
                label: <Link to="/forms/registration_forms" ><RxDot/>Registration Forms</Link>,
                path: "/forms/registration_forms",
                element: <RegistrationForms />,
                icon: null,
                children: null
            },
            // {
            //     key: "Update Forms",
            //     label: <Link to="/forms/update_forms" ><RxDot/>Update Forms</Link>,
            //     path: "/forms/update_forms",
            //     element: <UpdateForms />,
            //     icon: null,
            //     children: null
            // },
            {
                key: "Split Forms",
                label: <Link to="/forms/split_forms" ><RxDot/>Split Forms</Link>,
                path: "/forms/split_forms",
                element: <SplitForm />,
                icon: null,
                children: null
            },
        ],
    },
    {
        key: "Operation",
        label: <Link to="/operation" >Operation</Link>,
        path: "/operation",
        isIndex: false,
        element: <Operation />,
        icon: <RiKnifeLine />,
        children: [],
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