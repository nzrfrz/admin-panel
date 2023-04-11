import React, { useContext, useState } from "react";
// import { GlobalContext } from "../../App";
import { GlobalContext } from "../../GlobalContext";
import { useNavigate } from "react-router-dom";

import { 
    Form, 
    Typography
} from "antd";
import { 
    ButtonSuccess, 
    PasswordForm, 
    SimpleInputForm 
} from "../../Component";

import { 
    userLogout,
    userLogin, 
    useMutateData, 
    useDependentQueryData, 
    getUserProfile, 
    useQueryData, 
    getAccessTokenV2, 
    useMutableDataFetching
} from "../../_services";

const { Title, Text } = Typography

export const LoginPage = () => {
    const [form] = Form.useForm();

    const mutateLogin = useMutateData({        
        actionType: "login",
        mutateFn: userLogin,
        refetchFn: undefined,
        queryKey: undefined,
        lsKey: "authentication",
        formProps: undefined,
        setIsModalFormOpen: undefined,
        routePath: "/dashboard",
    });

    const onFinish = (values) => {
        mutateLogin.mutateAsync({payload: values});
    };

    return (
        <div className="login-page-container">
            <div 
                className="login-page-title-container"
                style={{
                    display: "flex",
                    flexDirection: 'column',
                    alignItems: "center"
                }}
            >
                <Title level={3} style={{ color: "white" }} >L O G I N</Title>
                <Text>
                    admin:password
                </Text>
            </div>
            <Form
                form={form}
                wrapperCol={{ span: 24 }}
                layout="vertical"
                onFinish={onFinish}
                style={{
                    width: "100%",
                }}
                scrollToFirstError
            >
                <SimpleInputForm 
                    name="user"
                    label="User"
                    placeholder="Input user name or email"
                    validateStatus={mutateLogin?.error?.response?.data === undefined ? undefined : "error"}
                    help={mutateLogin?.error?.response?.data === undefined ? undefined : mutateLogin?.error?.response?.data?.message}
                />
                <PasswordForm 
                    withConfirmPassword={false}
                    validateStatus={mutateLogin?.error?.response?.data === undefined ? undefined : "error"}
                    help={mutateLogin?.error?.response?.data === undefined ? undefined : mutateLogin?.error?.response?.data?.message}
                />
                <Form.Item
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: 0,
                    }}
                >
                    <ButtonSuccess 
                        loading={mutateLogin?.isLoading}
                        text="L O G I N"
                        htmlType="submit"
                    />
                </Form.Item>
            </Form>
        </div>
    );
};