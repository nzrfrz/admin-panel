import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
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
    Input,
    Space
} from 'antd';
import { ThemeContext } from "../../../App";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

import { 
    DOBForm,
    GenderSelectForm,
    PersonalNameForm ,
    PersonalPositionForm,

    CompanyNameForm
} from "./CorpInfoFormItems";

import { 
    AddressForm, 
    ContactForm, 
    CurrencyForm, 
    DateRangeForm, 
    RegionSelectForm,
    SimpleNumberForm,
    SimpleSelectForm,
    UserNameForm,
} from "./FormItems";
import { CustomDynamicForm } from "../Operation/OperationForms/CustomDynamicForm";

const { Text, Title } = Typography;

export const SplitForm = () => {
    const lastContainerRef = useRef();
    const { isDarkMode } = useContext(ThemeContext);

    const [form] = Form.useForm();

    const [lastContainerWidth, setLastContainerWidth] = useState(0);
    // console.log(lastContainerWidth);

    const onFinish = (values) => {
        // const contractList = values.channelDeals.map((data) => {
        //     return {
        //         platform: data.platform,
        //         price: data.price,
        //         effectiveStartDate: data.specificDate[0].format('YYYY-MM-DD'),
        //         effectiveEndDate: data.specificDate[1].format('YYYY-MM-DD'),
        //     }
        // });
        const formData = {
            ...values,
            // 'dateOfBirth': values['dateOfBirth'].format('YYYY-MM-DD'),
            // 'contactNumber': values.contactNumber.areaCode.toString().replace('+', '') + values.contactNumber.phoneNumber.toString(),
            // 'contractActiveDate': [values['contractActiveDate'][0].format('YYYY-MM-DD'), values['contractActiveDate'][1].format('YYYY-MM-DD')],
            // 'contractActiveStartDate': values['contractActiveDate'][0].format('YYYY-MM-DD'),
            // 'contractActiveEndDate': values['contractActiveDate'][1].format('YYYY-MM-DD'),
        };

        const { contractActiveDate, ...newFormData } = formData;
        
        // form.resetFields();
        // console.log('CUSTOM FORM DATA: ', newFormData);
        console.log('Received values of form: ', values);
    };

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

    useEffect(() => {
        const observer = new ResizeObserver(entries => {
            setLastContainerWidth(entries[0].contentRect.width);
        })
        observer.observe(lastContainerRef.current)
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
                <Title level={4}>Person In Charge Info</Title>
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
                    {/* <PersonalNameForm />
                    <PersonalPositionForm />
                    <DOBForm />
                    <GenderSelectForm />
                    <AddressForm 
                        name="personalAddress"
                        label="Personal Address"
                    />
                    <RegionSelectForm 
                        form={form}
                        fullRegion={true}
                    />
                    <ContactForm
                        label="Phone Number"
                        name="contactNumber"
                        isMobileNumber={false}
                    /> */}
                    {/* <UserNameForm /> */}
                    {/* <SimpleNumberForm 
                        name="postalCode"
                        label="Postal Code"
                    /> */}
                    {/* <DateRangeForm 
                        name="contractActiveDate"
                        label="Contract Active Date"
                    /> */}
                    {/* <CustomDynamicForm /> */}
                </Form>
            </div>
            <div className="corp-info-container">
                <Title level={4}>Corporate Info</Title>
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
                    <CompanyNameForm />
                </Form>
            </div>
            <div 
                ref={lastContainerRef}
                className="contract-info-container"
            >
                <Title level={4}>Contract Info</Title>
                <Form
                    form={form}
                    labelCol={{ span: lastContainerWidth >= 500 ? 8 : 0 }}
                    wrapperCol={{ span: lastContainerWidth >= 500 ? 12 : 0 }}
                    // wrapperCol={{ span: wrapperCol }}
                    layout={lastContainerWidth >= 500 ? "horizontal" : "vertical"}
                    onFinish={onFinish}
                    initialValues={{ channelDeals: [{"platform": undefined}] }}
                    style={{
                        width: "auto",
                    }}
                    scrollToFirstError
                >
                    <CustomDynamicForm 
                        formProps={form}
                        lastContainerWidth={lastContainerWidth}
                    />

                    <Form.Item
                        style={{
                            display: "flex",
                            justifyContent: "flex-end"
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