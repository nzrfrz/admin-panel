import React, { useContext, useEffect, useMemo } from "react";
import { Outlet, Navigate } from "react-router-dom";

import { GlobalContext } from "../GlobalContext";
import { useQueryData, getAccessTokenV2, useMasterDataFetching } from "../_services";

export const PublicRoute = () => {
    const { ENVIRONTMENT, accessToken } = useContext(GlobalContext);

    useMasterDataFetching();
    
    const isUserExist = useMemo(() => {
        if (ENVIRONTMENT === "development") {
            const getUser = localStorage.getItem("authentication");
            if (!getUser) return false;
            return true;
        }
    }, [ENVIRONTMENT]);

    useEffect(() => {
        const initialTheme = localStorage.getItem("themeMode");
        if (initialTheme === null) {
            localStorage.setItem("themeMode", "light");
        }
    }, []);

    return (
        accessToken || isUserExist ? <Navigate to={"/dashboard"} replace /> : <Outlet />
    );
};