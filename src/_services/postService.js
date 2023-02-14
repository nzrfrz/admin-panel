import axios from "axios";
import { openInitialNotification, openResponseNotification } from "../Pages/_Component";

const BASE_PATH = "https://63a02d6524d74f9fe8305eed.mockapi.io";

export const postService = async (formData, apiNotif, keyNotif) => {
    apiNotif.open({
        key: "response",
        message: 'Submitting Form Data',
        description: 'Please do not close, change, or refresh page !!',
    });

    try {
        const response = await axios.post(`${BASE_PATH}/mockAPITest/company_info`, formData);
        console.log(response);
        apiNotif.open({
            key: "response",
            message: 'Succes',
            description: 'Succes registering new corporate',
        });
    } catch (error) {
        console.log(error.response);
        apiNotif.open({
            key: "response",
            message: 'Error',
            description: 'Error registering new corporate',
        });
    }
};