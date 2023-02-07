import React, { useEffect, useMemo } from "react";
import { Outlet, Navigate } from "react-router-dom";

export const PublicRoute = () => {
    
    const isUserExist = useMemo(() => {
        const getUser = localStorage.getItem("credentials");
        if (!getUser) return false;
        return true;
    }, []);

    useEffect(() => {
        localStorage.setItem("themeMode", "light");
    }, [])

    return (
        isUserExist ? <Navigate to={"/dashboard"} replace /> : <Outlet />
    );
};