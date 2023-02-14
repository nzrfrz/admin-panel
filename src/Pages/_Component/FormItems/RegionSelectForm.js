import React, { useEffect, useMemo, useState } from "react";
import { 
    Form,
    Select
} from 'antd';

import { getIndonesiaRegionData } from "../../../_services/regionData";

export const RegionSelectForm = ({formProps, fullRegion}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [regionData, setRegionData] = useState([]);
    const [parentData, setParentData] = useState([]);

    const [selectedProvince, setSelectedProvince] = useState(undefined);
    const [selectedRegency, setSelectedRegency] = useState(undefined);
    const [selectedSubDistrict, setSelectedSubDistrict] = useState(undefined);

    const regencyData = useMemo(() => {
        if (selectedProvince !== undefined) {
            return regionData.filter((data) => data.kodeProvinsi === selectedProvince)
                    .map((dataRegency) => {
                        return {
                            value: dataRegency.name,
                            label: dataRegency.name,
                            code: dataRegency.kode,
                            type: dataRegency.type,
                        }
                    });
        }
    }, [selectedProvince]);

    const subDistrictData = useMemo(() => {
        if (selectedRegency !== undefined) {
            return regionData.filter((data) => data.kodeKabupaten === selectedRegency)
                    .map((dataSubDistrict) => {
                        return {
                            value: dataSubDistrict.name,
                            label: dataSubDistrict.name,
                            code: dataSubDistrict.kode,
                            type: dataSubDistrict.type,
                        }
                    });
        }
    }, [selectedRegency]);

    const villageData = useMemo(() => {
        if (selectedSubDistrict !== undefined) {
            return regionData.filter((data) => data.kodeKecamatan === selectedSubDistrict)
                    .map((dataVillage) => {
                        return {
                            value: dataVillage.name,
                            label: dataVillage.name,
                            code: dataVillage.kode,
                            type: dataVillage.type,
                        }
                    });
        }
    }, [selectedSubDistrict]);

    // console.log(villageData);

    useEffect(() => {
        getIndonesiaRegionData(setIsLoading, setRegionData, setParentData);
    }, []);

    return (
        <>
        <Form.Item
            name="province"
            label="Province"
            rules={[
                {
                    required: true,
                    message: "Province can not be empty"
                }
            ]}
        >
            <Select
                showSearch
                allowClear
                options={parentData}
                placeholder="Select Province"
                optionFilterProp="children"
                filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                onClear={() => {
                    formProps.resetFields(["regency"]);
                    formProps.resetFields(["subDistrict"]);
                    formProps.resetFields(["village"]);
                    setSelectedProvince(undefined);
                    setSelectedRegency(undefined);
                    setSelectedSubDistrict(undefined);
                }}
                onChange={(value, data) => {
                    setSelectedProvince(data?.code);
                }}
            />
        </Form.Item>

        {
            fullRegion === true || fullRegion === undefined &&
            <>
            {/* regency */}
            <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) => prevValues.province !== currentValues.province}
            >
                {
                    (({getFieldValue}) => 
                        getFieldValue("province") !== undefined ?
                        <Form.Item
                            name="regency"
                            label="Regency"
                            rules={[
                                {
                                    required: true,
                                    message: "Regency can not be empty"
                                }
                            ]}
                        >
                            <Select
                                showSearch
                                allowClear
                                options={regencyData}
                                placeholder="Select Regency"
                                optionFilterProp="children"
                                filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                                onClear={() => {
                                    formProps.resetFields(["subDistrict"]);
                                    formProps.resetFields(["village"]);
                                    setSelectedRegency(undefined);
                                }}
                                onChange={(value, data) => {
                                    setSelectedRegency(data?.code);
                                }}
                            />
                        </Form.Item>
                        :
                        null
                    )
                }
            </Form.Item>
            {/* regency */}
    
            {/* sub district */}
            <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) => prevValues.regency !== currentValues.regency}
            >
                {
                    (({getFieldValue}) => 
                        getFieldValue("regency") !== undefined ?
                        <Form.Item
                            name="subDistrict"
                            label="Sub District"
                            rules={[
                                {
                                    required: true,
                                    message: "Sub District can not be empty"
                                }
                            ]}
                        >
                            <Select
                                showSearch
                                allowClear
                                options={subDistrictData}
                                placeholder="Select Sub District"
                                optionFilterProp="children"
                                filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                                onClear={() => {
                                    formProps.resetFields(["village"]);
                                    setSelectedSubDistrict(undefined);
                                }}
                                onChange={(value, data) => {
                                    setSelectedSubDistrict(data?.code);
                                }}
                            />
                        </Form.Item>
                        :
                        null
                    )
                }
            </Form.Item>
            {/* sub district */}
    
            {/* village */}
            <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) => prevValues.subDistrict !== currentValues.subDistrict}
            >
                {
                    (({getFieldValue}) => 
                        getFieldValue("subDistrict") !== undefined ?
                        <Form.Item
                            name="village"
                            label="Village"
                            rules={[
                                {
                                    required: true,
                                    message: "Village can not be empty"
                                }
                            ]}
                        >
                            <Select
                                showSearch
                                allowClear
                                options={villageData}
                                placeholder="Select Village"
                                optionFilterProp="children"
                                filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                            />
                        </Form.Item>
                        :
                        null
                    )
                }
            </Form.Item>
            {/* village */}
            </>
        }
        </>
    );
};