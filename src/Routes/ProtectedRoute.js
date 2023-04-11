import React, { useContext, useEffect, useMemo } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { queryClientInstance } from "../App";
import { GlobalContext } from "../GlobalContext";

import { getMedicines, useCachedData, useMasterDataFetching, useMutableDataFetching, useQueryData } from "../_services";
import { useAxiosIntercept } from "../_services/request";

export const ProtectedRoute = () => {
    const { ENVIRONTMENT, accessToken } = useContext(GlobalContext);

    // use axios intercepts for all request inside protected route
    useAxiosIntercept();

    // prefetch data before user specific page load
    // in other words like promise all to get all data needed
    useMutableDataFetching();

    const isUserExist = useMemo(() => {
        if (ENVIRONTMENT === "development") {
            const getUser = localStorage.getItem("authentication");
            if (!getUser) return false;
            return true;
        }
    }, [ENVIRONTMENT]);

    return (
        accessToken || isUserExist ? 
        <Outlet /> 
        : 
        <Navigate to={"/login"} replace />
    );
};