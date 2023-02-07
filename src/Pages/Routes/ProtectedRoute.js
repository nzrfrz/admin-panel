import React, { useEffect, useMemo } from "react";
import { Outlet, Navigate } from "react-router-dom";

export const ProtectedRoute = () => {
    
    const isUserExist = useMemo(() => {
        const getUser = localStorage.getItem("credentials");
        if (!getUser) return false;
        return true;
    }, []);

    return (
        isUserExist ? <Outlet /> : <Navigate to={"/login"} replace />
    );
};