import { privateRequest } from "../request";

// use privateRequest instance to make request with authorization
export const getMedicines = async () => {
    console.log("GET MEDICINES");
    const response = await privateRequest.get(`/playground/medicines/`);
    // console.log(response);
    return response.data;
};

export const getMedicinesPaginated = async (limitPerPage, page, querySearch) => {
    // console.log("FETCH FN \n", limitPerPage, page, querySearch);
    // console.log("FETCH MEDICINES PAGINATED");
    const response = await privateRequest.get(`/playground/medicines/?limit=${limitPerPage}&page=${page}&per_page=${limitPerPage}&q=${querySearch}`);
    // console.log("FETCH MEDICINES", response.data.data);
    return response.data;
};

export const postMedicines = async (args) => {
    // console.log(args?.payload);
    const response = await privateRequest.post("/playground/medicine/add/", args?.payload);
    return response;
};

export const putMedicines = async (args) => {
    // console.log(args?.payload, args?.dataID);
    const response = await privateRequest.put(`/playground/medicine/edit=${args?.dataID}/`, args?.payload);
    return response;
};

export const deleteMedicines = async (args) => {
    // console.log(args);
    const response = await privateRequest.delete(`/playground/medicine/delete=${args}/`);
    return response;
};