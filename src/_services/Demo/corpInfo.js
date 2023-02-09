import axios from "axios";

export const getCorpInfo = async (setCorporateData) => {
    try {
        const results = await axios.get(`https://63a02d6524d74f9fe8305eed.mockapi.io/mockAPITest/company_info`);
        setCorporateData(results.data.reverse());
        // console.log(results.data.reverse());
    } catch (error) {
        console.log(error);
    }
};