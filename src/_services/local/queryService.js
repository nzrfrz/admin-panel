import { useEffect, useContext } from "react";
import { GlobalContext } from "../../GlobalContext";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { openNotification } from "../../Component";
import { authRequest, privateRequest, useAxiosIntercept } from "../request";

import { queryClientInstance } from "../../App";

// used to get access token, if not using local storage
// this will be use in case user refresh the page, 
// so we need to provide a way to get another refresh token
export const useAuthQuery = (queryKey, queryFn, setAccessToken) => {
    return useQuery({
        queryKey: queryKey,
        queryFn: () => queryFn,
        retry: 0,
        refetchInterval: false,
        onSuccess: (results) => {
            console.log("SUCCESS AUTH QUERY \n", results);
            setAccessToken(results?.data?.accessToken);
        },
        onError: (error) => {
            console.log("ERROR AUTH QUERY \n", error);
            localStorage.clear();
            localStorage.setItem("themeMode", "light");
        },
    });
};

// global fetch data
// use this inside component which need the data from server
// use alongside with useCachedData to prevent re-fetching on component re-render
// complete docs @ https://tanstack.com/query/latest/docs/react/reference/useQuery
export const useQueryData = (queryKey, queryFn, enabled, refetchInterval, getNotify = false) => {

    return useQuery({
        queryKey: queryKey, // query key from react query, to create a unique data identity
        queryFn: () => queryFn, // fetch function to called
        //staleTime: 10 * (60 * 1000), // 10 minutes until data is stale. See react query doc for more detail
        //staleTime: 480 * (60 * 1000), // 8 hours until stale
        retry: 0, // disable fetch retry, to get to error fetch directly
        enabled: enabled, // set to true to enable fetching
        refetchInterval: refetchInterval, // set to automatically refetch after a set of time, use ms
        onSuccess: (results) => {
            // console.log("SUCCESS QUERIES: \n", results);
            // if needed, pass the getNotify to true
            if (results?.data && getNotify === true) {
                openNotification("authorization", "success", "Success", "Access granted");
            }
        },
        onError: (error) => {
            console.log("ERROR QUERIES: \n", error);
            return;
        },
    });
};

// call this to get the data without fetching if global fetch data is successfull
// also use this alongside with useQueryData, otherwise cached data return undefined
// complete docs @ https://tanstack.com/query/latest/docs/react/reference/QueryClient
export const useCachedData = (queryKey) => {
    const query = queryClientInstance.getQueryState(queryKey);
    // console.log("CACHED DATA: ", query);

    return query;
};