import { useQueryData } from "./queryService";
import { 
    getIndonesiaRegionData, 
    getDialCode,
    getUserProfile 
} from "../http";

export const useParallelFetching = (apiNotif) => {
    console.log("FETCHING ALL DATA");
    // fetch master / immutable data first
    useQueryData(["indonesiaRegionData"], getIndonesiaRegionData, apiNotif);
    useQueryData(["phoneDialCode"], getDialCode, apiNotif);

    // then fetch mutable data
    useQueryData(["userProfile"], getUserProfile, apiNotif);
    console.log("FINIIISH");
};