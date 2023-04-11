import { useContext, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useCachedData, useQueryData } from "./queryService";
import { GlobalContext } from "../../GlobalContext";

import { 
    getIndonesiaRegionData, 
    getDialCode,
    getUserProfile, 
    getMedicines,
    getMedicinesPaginated
} from "../http";
import { useAxiosIntercept } from "../request";
import { queryClientInstance } from "../../App";

// use to fetch data that doesn't need an authorization
// like master data, and this function can be called in starting page
// or before login, or you can use it anywhere depends on your need
export const useMasterDataFetching = async () => {
    await queryClientInstance.prefetchQuery(["indonesiaRegionData"], getIndonesiaRegionData);
    await queryClientInstance.prefetchQuery(["phoneDialCode"], getDialCode);
    // useQueryData(["indonesiaRegionData"], getIndonesiaRegionData(), apiNotif);
    // useQueryData(["phoneDialCode"], getDialCode(), apiNotif);
};

// fetching data where the request need the authorization
// this function use parallel fetching from tan-stack react query,
// call this function at home page, or page that render after login success
export const useMutableDataFetching = async () => {
    const { accessToken } = useContext(GlobalContext);

    const medicinesAllData = queryClientInstance.getQueryState(["medicinesAll"]);
    const medicinesPaginatedData = queryClientInstance.getQueryState(["medicines", 10, 1, ""]);
    // console.log("MUTABLE DATA FETCHING: \n", medicinesAllData?.data?.data);

    // useQueryData(["medicinesAll"], getMedicines(), true, undefined, undefined);
    if (accessToken !== undefined) {
        await queryClientInstance.prefetchQuery(["medicinesAll"], medicinesAllData?.data?.data === undefined ? getMedicines : () => { return {data: undefined}; });
        await queryClientInstance.prefetchQuery(
            ["medicines", 10, 1, ""], 
            medicinesPaginatedData?.data?.data === undefined ? 
            () => { return getMedicinesPaginated(10, 1, ""); } : () => { return {data: undefined}; }
        );
    }
};