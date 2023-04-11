import { useEffect, useContext, useState } from "react";
import { GlobalContext } from "../../GlobalContext";
import { Navigate, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { openNotification } from "../../Component";
import { authRequest, privateRequest, useAxiosIntercept } from "../request";

import { queryClientInstance } from "../../App";

const httpMethodAlias = (actionType) => {
    switch (actionType) {
        case "login":
            return {
                messageInfo: "Logging In",
                successDescription: "Login successfully !!!",
                errorDescription: "Failed to Login, please try again later !!!"
            };
        case "logout":
            return {
                messageInfo: "Logging Out",
                successDescription: "Logout success !!!",
                errorDescription: "Failed to Logout, please try again later !!!"
            };
        case "post":
            return {
                messageInfo: "Adding new data",
                successDescription: "New data created successfully !!!",
                errorDescription: "Failed to create new data, please try again later !!!"
            };
        case "put" || "patch":
            return {
                messageInfo: "Editing data",
                successDescription: "Data edited successfully !!!",
                errorDescription: "Failed to edit existing data, please try again later !!!"
            };
        case "delete":
            return {
                messageInfo: "Deleting data",
                successDescription: "Data deleted successfully !!!",
                errorDescription: "Failed to delete existing data, please try again later !!!"
            };
        case "get":
            return {
                messageInfo: "Performing",
                successDescription: "Operation successfully !!!",
                errorDescription: "Operation failed, please try again later !!!"
            };
        default:
            break;
    }
};

// used for mutating data, or preform any operation to server
// this feature include auto update data after mutation
// complete docs @ https://tanstack.com/query/latest/docs/react/reference/useMutation
export const useMutateData = (
    {
        actionType = undefined, // use to identify what http method is actually used, then it convert to response return message either success or error
        mutateFn = () => {}, // http request function
        refetchFn = () => {}, // function need to be passed after performing a success request to update the data
        queryKey = [], // use to connect or update the data from useQueryData function, if you wish to update the data after mutating, provide the same key as in useQueryData
        lsKey = undefined, // localStorage key, or you can adjust with cookies or other storage key
        formProps = undefined, // form class from antd to clear form field after success request
        setIsModalFormOpen = undefined, // use to close modal if form is inside modal
        routePath = undefined // path or url to redirect, after success request
    }
) => {
    const navigateTo = useNavigate();
    const { ENVIRONTMENT, setAccessToken } = useContext(GlobalContext);

    return useMutation({
        mutationFn: mutateFn,
        retry: 1,
        onMutate: () => {
            openNotification("authorization", "info", httpMethodAlias(actionType).messageInfo, "Please do not close, change, or refresh the page !!");
        },
        onSuccess: async (data) => {
            console.log("MUTATE SUCCESS: \n", data?.data);
            const message = data.message === undefined ? httpMethodAlias(actionType).successDescription : data.message;
            switch (true) {
                case actionType === "login" && lsKey !== undefined:
                    if (ENVIRONTMENT === "development") {
                        localStorage.setItem(lsKey, JSON.stringify(data.data));
                    }
                    else {
                        setAccessToken(data?.data?.accessToken);
                    }
                    openNotification("authorization", "success", "Success", message);
                    navigateTo(routePath);
                    break;
                case actionType === "logout" && data?.data === "cookie cleared":
                    localStorage.clear();
                    localStorage.setItem("themeMode", "light");
                    openNotification("authorization", "success", "Success", "Logout success, redirecting to login...");
                    setTimeout(() => {
                        window.location.reload();
                    }, 500);
                    break;
                case (actionType === "post" || actionType === "put") && setIsModalFormOpen !== undefined:
                    await queryClientInstance.fetchQuery({
                        queryKey, 
                        queryFn: () => refetchFn()
                    });
                    await queryClientInstance.invalidateQueries(queryKey);
                    setIsModalFormOpen(false);
                    openNotification("authorization", "success", "Success", message);
                    break;
                case actionType === "delete" && queryKey.length > 0:
                    await queryClientInstance.fetchQuery({
                        queryKey, 
                        queryFn: () => refetchFn()
                    });
                    await queryClientInstance.invalidateQueries(queryKey);
                    openNotification("authorization", "success", "Success", message);
                    break;
                case formProps !== undefined:
                    formProps?.resetFields();
                    break;
                default:
                    break;
            }
        },
        onError: (error) => {
            console.log("MUTATE ERROR: \n", error);
            if (error?.message !== undefined) {
                openNotification("authorization", "error", "Error", error?.message + ", try again later...");
            }
            return;
        }
    });
};


// copy this to set mutateData default props
/*
const defaultMutateProps = 
{
    actionType: undefined,
    mutateFn: () => {},
    refetchFn = () => {},
    queryKey: undefined,
    lsKey: undefined,
    formProps: undefined,
    setIsModalFormOpen: undefined,
    routePath: undefined,
};
*/