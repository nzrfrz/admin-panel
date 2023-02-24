import axios from "axios";
import { openNotification } from "../Pages/_Component";

const BASE_PATH = "https://63a02d6524d74f9fe8305eed.mockapi.io";

export const postService = async (formData, apiNotif) => {
    openNotification(apiNotif, "responseHTTP", "info", 'Submitting Form Data', 'Please do not close, change, or refresh page !!');

    try {
        const response = await axios.post(`${BASE_PATH}/mockAPITest/company_info`, formData);
        console.log(response);
        openNotification(apiNotif, "responseHTTP", "success",'Succes', 'Success registering new corporate');
    } catch (error) {
        console.log(error.response);
        openNotification(apiNotif, "responseHTTP", "error", 'Error', 'Error registering new corporate');
    }
};