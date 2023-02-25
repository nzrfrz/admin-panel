import { useQuery } from "@tanstack/react-query";

import { openNotification } from "../Pages/_Component";

export const useQueryData = (queryKey, queryFn, apiNotif) => {
    return useQuery({
        queryKey,
        queryFn,
        staleTime: 60000,
        onError: (error) => {
            openNotification(apiNotif, queryKey.toString(), "error", error.response.data, "User Profile data couldn't be load, please refresh your browser");
        }
    });
};