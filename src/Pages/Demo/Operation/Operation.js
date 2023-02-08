import React from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../../App";
import { 
    Layout, 
    Menu, 
    Typography, 
    Breadcrumb, 
    Dropdown,
    Button,
    Divider,
    theme 
} from 'antd';

const { Text, Title } = Typography;

export const Operation = () => {
    return (
        <Title level={2}>
            OPERATION CRUD
        </Title>
    );
};