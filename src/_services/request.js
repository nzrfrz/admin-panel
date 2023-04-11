import axios from "axios";
import { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { GlobalContext } from "../GlobalContext";

import { openNotification } from "../Component";

// see .env.example file for detail
const basePath = process.env.REACT_APP_BASE_PATH;
const localBasePath = process.env.REACT_APP_LOCAL_BASE_PATH;

// create an axios instance
// used for global request, without any authorization, and also can be use for login
// coz this has credentials if your server give you http only cookie
export const request = axios.create({
    baseURL: basePath,
    withCredentials: true,
    timeout: 60000,
});

// axios instance for private request.
// used for request with authorization
export const privateRequest = axios.create({
    baseURL: basePath,
    withCredentials: true,
    timeout: 60000,
});

// axios instance for auth request.
// used for generate and check refresh token inside privateRequest response interceptors
export const authRequest = axios.create({
    baseURL: basePath,
    withCredentials: true,
    timeout: 60000,
});

// using custom hook, and call it inside private route, so the rest of app can use interceptor when user is authorized
// in this app case, this interceptor hook is called inside PrivateRoute component
export const useAxiosIntercept = () => {
    const { ENVIRONTMENT, accessToken, setAccessToken, mutateRetryCount, setMutateRetryCount } = useContext(GlobalContext);

    const privateInterceptRequest = privateRequest.interceptors.request.use(
        async (config) => {
            // console.log("REQ INSTANCE: ", config);
            const token = await JSON.parse(localStorage.getItem("authentication"));
            if (!config.headers["Authorization"] && ENVIRONTMENT === "development") {
                config.headers["Authorization"] = `Bearer ${token?.accessToken}`;
            }
            else if (!config.headers["Authorization"] && ENVIRONTMENT !== "development") {
                config.headers["Authorization"] = `Bearer ${accessToken}`;
            }

            // actually this is the data returned after doing a request
            // either it success or error
            return config;
        },
        (error) => {
            console.log("REQ INSTANCE ERROR: ", error);
            return Promise.reject(error);
        }
    );

    const privateInterceptResponse = privateRequest.interceptors.response.use(
        (response) => {
            // console.log("AXIOS INSTACE RESPONSE: ", response);
            return response;
        },
        async (error) => {
            console.log("RESPONSE INTERCEPTORS ERROR: \n", error);
            openNotification("authorization", "warning", "Access Denied", "Requesting new access...");
            
            // used for request a new access token
            try {
                const getNewAccessToken = await authRequest.get("/auth/v2/access-token/generate/");
                if (ENVIRONTMENT === "development") {
                    localStorage.setItem("authentication", JSON.stringify(getNewAccessToken?.data?.data));
                }
                else {
                    setAccessToken(getNewAccessToken?.data?.data?.accessToken);
                }
                openNotification("authorization", "info", "Access Granted", "New access receive");
            } catch (errorRefresh) {
                console.log("RESPONSE INTERCEPTORS ERROR REFRESH: \n", errorRefresh);
                localStorage.clear();
                openNotification("authorization", "info", "Expired", "Your session has expired, redirecting to login...");
                setTimeout(() => {
                    window.location.reload();
                    localStorage.setItem("themeMode", "light");
                }, 500);
            }
            return Promise.reject(error);
        }
    );

    // uncomment this, if interceptors get infinite loop
    // return () => {
    //     privateRequest.interceptors.request.eject(privateInterceptRequest);
    //     privateRequest.interceptors.response.eject(privateInterceptResponse);
    // };
};