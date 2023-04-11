import axios from "axios";
import { useEffect, useState } from "react";
import { request, authRequest, privateRequest } from "../request";
import { useQueryData } from "../local/queryService";
import { useNavigate } from "react-router-dom";

export const userLogin = async (payloadData) => {
    const { payload } = payloadData;
    const response = await request.post("/auth/v2/user/login/", payload);
    return response.data;
};

export const getAccessTokenV2 = async () => {
    const response = await authRequest.get("/auth/v2/access-token/generate/");
    console.log("GET ACCESS TOKEN:");
    return response.data;
};

export const getUserProfile = async () => {
    const response = await privateRequest.get("/auth/user/profile/");
    console.log("GET USER PROFILE: ");
    return response.data;
};

export const userLogout = async () => {
    const response = await privateRequest.post("/auth/v2/user/logout/");
    return response;
};

export const getNewAccesToken = async () => {
    const response = await privateRequest.get("/auth/v2/access-token/generate/");
    return response;
};