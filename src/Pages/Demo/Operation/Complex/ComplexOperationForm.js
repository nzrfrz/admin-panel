import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { 
    Outlet, 
    useNavigate, 
    useLocation,
    useParams,
} from "react-router-dom";
import { 
    theme,
    Layout, 
    Menu, 
    Typography, 
    Breadcrumb, 
    Dropdown,
    Button,
    Divider,
    Form,
} from 'antd';
import { GlobalContext } from "../../../../App";

import { 
    AddressForm,
    ContactForm,
    CurrencyForm,
    DateRangeForm,
    DOBForm,
    EmailForm,
    GenderSelectForm,
    PasswordForm,
    RegionSelectForm,
    SimpleInputForm, 
    SimpleNumberForm, 
    SimpleSelectForm, 
    UserNameForm,
    ButtonSuccess
} from "../../../_Component";

import { ContractForm } from "./ContractInfoForm/ContractForm";

import { postService } from "../../../../_services/postService";
import { useMutateData } from "../../../../_services";

const { Text, Title } = Typography;

const channelData = [
    {
        id: 1,
        name: "POP UP",
        value: "simAds",
    },
    {
        id: 2,
        name: "Flash SMS",
        value: "smsFlash",
    },
    {
        id: 3,
        name: "WhatsApp",
        value: "whatsApp",
    },
    {
        id: 4,
        name: "MMS",
        value: "mms",
    },
    {
        id: 5,
        name: "SMS",
        value: "sms",
    }
];

export const ComplexOperationForm = () => {
    const navigateTo = useNavigate();
    const {state} = useLocation(); // get value passing from navigateTo() in other page inside "state" object
    const lastContainerRef = useRef(); // ref to pass in last container div
    const { isDarkMode, apiNotif } = useContext(GlobalContext); // get site theme mode from App.js

    const [lastContainerWidth, setLastContainerWidth] = useState(0); // storing last container div client width when browser shrink or grow

    const [form] = Form.useForm(); // class from antd form to store all form data

    const channelDealsInitialValue = [
        {
            "platform": undefined,
            "price": undefined,
            "contractType": undefined,
            "specificDate": undefined
        }
    ];

    // function to get or filter or further manipulation form data
    const onFinish = (values) => {
        // const personalFormInfo = {
        //     ...values,
        //     'dateOfBirth': values['dateOfBirth'].format('YYYY-MM-DD'),
        //     'personalNumber': values.personalNumber.areaCode.toString().replace('+', '') + values.personalNumber.phoneNumber.toString(),
        //     "province": values.personalProvince,
        //     "regency": values.personalRegency,
        //     "subDistrict": values.personalSubDistrict,
        //     "village": values.personalVillage
        // };

        // const { 
        //     confirmPassword, 
        //     personalProvince,
        //     personalRegency,
        //     personalSubDistrict,
        //     personalVillage,
        //     ...finalPersonalFormInfo } = personalFormInfo;

        // const corporateFormInfo = {
        //     ...values,
        //     'officeNumber': values.officeNumber.areaCode.toString().replace('+', '') + values.officeNumber.phoneNumber.toString(),
        //     "postalCode": values.postalCode.toString(),
        // };

        // const contractInfo = {
        //     contractActiveStartDate: values['contractActiveDate'][0].format('YYYY-MM-DD'),
        //     contractActiveEndDate: values['contractActiveDate'][1].format('YYYY-MM-DD'),
        //     contractValue: values.contractValue.toString(),
        //     channelDeals: values.channelDeals.map((item) => {
        //         return {
        //             platform: channelData.filter((data) => item.platform === data.name).map((data) => data.value).toString(),
        //             price: item.price.toString(),
        //             effectiveStartDate: item.specificDate[0].format('YYYY-MM-DD'),
        //             effectiveEndDate: item.specificDate[1].format('YYYY-MM-DD'),
        //         }
        //     }),
        // } 

        // console.log(contractInfo);
        // const { contractActiveDate, ...newFormData } = formData;
        // postService(values, apiNotif);
        // useMutateData(values, form, apiNotif, undefined, navigateTo);
    };

    /**
     * variable to check last container div value and return it to container width
     * this use to styling component inside last container div
    */
    const wrapperCol = useMemo(() => {
        switch (true) {
            case lastContainerWidth >= 400 && lastContainerWidth >= 530:
                return 10;    
            case lastContainerWidth >= 530:
                return 20;
            default:
                return 0;
        }
    }, [lastContainerWidth]);

    /**
     * function to update lastContainerWidth hook when browser shrink or grow
     * because lastContainerRef won't update the value it self when shrinking or growing the browser
    */
    useEffect(() => {
        const observer = new ResizeObserver(entries => {
            setLastContainerWidth(entries[0].contentRect.width);
        })
        observer.observe(lastContainerRef.current);
        return () => lastContainerRef.current && observer.unobserve(lastContainerRef.current)
    }, []);

    const {
        token: { 
            borderRadiusLG,
        },
    } = theme.useToken();

    return (
        <div
            className="corporate-forms-container"
            style={{
                "--brRd": `${borderRadiusLG}px`,
                "--bgc": isDarkMode === true ? "var(--contentContainerDarkMode)" : "var(--contentContainerLightMode)"
            }}
        >
            <div className="pic-container">
                <Title level={5}>Person In Charge Info {state.method}</Title>
                <Form
                    form={form}
                    wrapperCol={{ span: 24 }}
                    layout="vertical"
                    onFinish={onFinish}
                    style={{
                        width: "auto",
                    }}
                    scrollToFirstError
                >
                    {/*
                    <SimpleInputForm 
                        name="personalName"
                        label="Personal Name"
                    />
                    <SimpleInputForm 
                        name="position"
                        label="Position"
                    />
                    <DOBForm />
                    <GenderSelectForm />
                    <AddressForm 
                        name="personalAddress"
                        label="Personal Address"
                    />
                    <RegionSelectForm 
                        formProps={form}
                        name="personal"
                    />
                    <EmailForm 
                        name="personalEmail"
                        label="Personal Email"
                    />
                    <ContactForm 
                        name="personalNumber"
                        label="Personal Number"
                        isMobileNumber={true}
                    />
                    <UserNameForm />
                    <PasswordForm 
                        withConfirmPassword={true}
                    />
                    */}
                </Form>
            </div>
            <div  className="corp-info-container">
                <Title level={5}>Corporate Info {state.method}</Title>
                <Form
                    form={form}
                    wrapperCol={{ span: 24 }}
                    layout="vertical"
                    onFinish={onFinish}
                    style={{
                        width: "auto",
                    }}
                    scrollToFirstError
                >
                <RegionSelectForm 
                    formProps={form}
                />
                <ContactForm 
                    name="officeNumber"
                    label="Office Number"
                    isMobileNumber={true}
                />
                    {/*
                    <SimpleInputForm 
                        name="corporateName"
                        label="Corporate Name"
                    />
                    <SimpleInputForm 
                        name="corporateSector"
                        label="Corporate Sector"
                    />
                    <SimpleSelectForm 
                        name="businessScale"
                        label="Business Scale"
                        optionSelect={[
                            {
                                label: "Domestic",
                                value: "domestic",
                            },
                            {
                                label: "International",
                                value: "international",
                            },
                        ]}
                    />
                    <EmailForm 
                        name="officeEmail"
                        label="Office Email"
                    />
                    <ContactForm 
                        name="officeNumber"
                        label="Office Number"
                        isMobileNumber={false}
                    />
                    <AddressForm 
                        name="officeAddress"
                        label="Office Address"
                    />
                    <RegionSelectForm 
                        formProps={form}
                    />
                    <SimpleNumberForm 
                        name="postalCode"
                        label="Postal Code"
                    />
                    */}
                   
                </Form>
            </div>
            <div
                ref={lastContainerRef}
                className="contract-info-container"  
            >
                <Title level={5}>Contract Info {state.method}</Title>
                <Form
                    form={form}
                    labelCol={{ span: lastContainerWidth >= 500 ? 8 : 0 }}
                    wrapperCol={{ span: lastContainerWidth >= 500 ? 12 : 0 }}
                    layout={lastContainerWidth >= 500 ? "horizontal" : "vertical"}
                    onFinish={onFinish}
                    initialValues={{ 
                        channelDeals: [...channelDealsInitialValue]
                    }}
                    style={{
                        width: "auto",
                    }}
                    scrollToFirstError
                >
                    {/*
                    <ContractForm
                        formProps={form}
                        channelData={channelData}
                        channelDealsInitialValue={channelDealsInitialValue}
                        lastContainerWidth={lastContainerWidth}
                    />
                    */}
                    
                    <Form.Item
                        style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            marginBottom: 0,
                        }}
                    >
                        <ButtonSuccess 
                            text="Register Corporate"
                            htmlType="submit"
                        />
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};