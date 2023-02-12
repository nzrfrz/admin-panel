import axios from "axios";

export const getDialCode = async (setDialCode) => {
    const URL = 'https://raw.githubusercontent.com/nzrfrz/nzrfrz/main/master-data/phone-dial-code.json';

    try {
        const response = await axios.get(URL);
        setDialCode(response.data);
        // console.log(response.data);
    } catch (error) {
        console.log(error);
    }
};