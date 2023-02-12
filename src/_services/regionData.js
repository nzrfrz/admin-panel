import axios from "axios";

export const getIndonesiaRegionData = async (setIsLoading, setRegionData, setParentData) => {
    setIsLoading(true);

    try {
        const response = await axios.get(`https://raw.githubusercontent.com/nzrfrz/indonesiaRegionsDatas/main/listAllGeo.json`);
        
        const provinceData = response.data.filter((data) => data.type === "Provinsi")
                            .map((dataProvince) => {
                                return {
                                    value: dataProvince.name,
                                    label: dataProvince.name,
                                    code: dataProvince.kode,
                                    type: dataProvince.type,
                                }
                            });

        setRegionData(response.data);
        setParentData(provinceData);
        setIsLoading(false);
        // console.log("CASCADE DATA: : ", response.data);
    } catch (error) {
        console.log(error);
    }
};