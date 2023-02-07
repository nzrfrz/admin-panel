import axios from "axios";

export const mockAPIGetUser = async (setUserData) => {
    try {
        const response = await axios.get("https://63a02d6524d74f9fe8305eed.mockapi.io/mockAPITest/testMockAPI");
        setUserData(response.data);
        // console.log(response.data);
    } catch (error) {
        console.log(error.response);
    }
};