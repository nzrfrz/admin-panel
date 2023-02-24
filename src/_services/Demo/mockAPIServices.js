import axios from "axios";

export const getUserProfile = async () => {
    const response = await axios.get("https://63f81faf5b0e4a127de07431.mockapi.io/user/profile");
    const data = response.data;

    return data;
};

export const postUserProfile = async (formData) => {
    const response = await axios.post("https://63f81faf5b0e4a127de07431.mockapi.io/user/profile", formData);
    const data = response;

    return data;
};