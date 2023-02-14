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
import { GlobalContext } from "../../../App";

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
    UserNameForm
} from "../../_Component";

const { Text, Title } = Typography;

export const OperationForm = () => {
    const {state} = useLocation(); // get value passing from navigateTo() in other page inside "state" object
    const lastContainerRef = useRef(); // ref to pass in last container div
    const { isDarkMode, apiNotif, keyNotif } = useContext(GlobalContext); // get site theme mode from App.js

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

    // console.log(notificationOpen());
    // function to get or filter or further manipulation form data
    const onFinish = (values) => {
        const temp = {
            ...values,
            "contactNumber": values.contactNumber.areaCode.toString() + values.contactNumber.phoneNumber.toString(),
            "startDate": values.rangePicker[0].format("YYYY-MM-DD"),
            "endDate": values.rangePicker[1].format("YYYY-MM-DD"),
            "currency": values.currency.toString(),
        }

        const { rangePicker, password, ...newTemp } = temp;
        console.log("FORM VALUE: ", values);
        console.log("TEMP VALUE: ", temp);
        console.log("NEW TEMP VALUE: ", newTemp);
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
                    <ContactForm 
                        name="contactNumber"
                        label="Phone Number"
                        isMobileNumber={false}
                    /> 
                    <PasswordForm 
                        withConfirmPassword={false}
                    />
                    <DateRangeForm 
                        name="rangePicker"
                        label="Range Picker"
                    />
                    <RegionSelectForm 
                        formProps={form}
                    />
                    <CurrencyForm 
                        name="currency"
                        label="Harga"
                        prefix="IDIN"
                    />
                    <SimpleSelectForm 
                        name="fruit"
                        label="Select Fruit"
                        optionSelect={[
                            {
                                label: "Mangga",
                                value: "mangga",
                            },
                            {
                                label: "Jambu",
                                value: "jambu"
                            },
                            {
                                label: "Duren",
                                value: "duren"
                            }
                        ]}
                    />
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
                    
                    <Form.Item
                        style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            marginBottom: 0,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Update
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};