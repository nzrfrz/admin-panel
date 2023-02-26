import { useMutation, useQueryClient } from "@tanstack/react-query";

import { openNotification } from "../../Pages/_Component";

export const useMutateData = (httpMethod, fetchFn, queryKey, formProps, apiNotif, setIsModalFormOpen = undefined, navigate = undefined, routePath = undefined) => {
    const httpMethodAlias = () => {
        switch (httpMethod) {
            case "post":
                return {
                    messageInfo: "Adding new data",
                    successDescription: "New data created successfully !!!",
                    errorDescription: "Failed to create new data, please try again later !!!"
                };
            case "put":
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
            default:
                break;
        }
    };

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: fetchFn,
        onMutate: () => {
            console.log("POSTING DATA: ");
            openNotification(apiNotif, queryKey.toString(), "info", httpMethodAlias().messageInfo, "Please do not close, change, or refresh the page !!");
        },
        onSuccess: (data) => {
            console.log("POST SUCCESS: ", data);
            formProps?.resetFields();
            queryClient.invalidateQueries(queryKey, {exact: true});
            openNotification(apiNotif, queryKey.toString(), "success", "Success", httpMethodAlias().successDescription);
            if (navigate !== undefined) {
                return navigate(routePath); 
            }
            else if (setIsModalFormOpen !== undefined) {
                return setIsModalFormOpen(false);
            }
        },
        onError: (data) => {
            console.log("POST ERROR: ", data);
            openNotification(apiNotif, queryKey.toString(), "error", "Error", httpMethodAlias().errorDescription);
        }
    });
};