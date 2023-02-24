import React, { useContext } from "react";
import { GlobalContext } from "../../../../App";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { 
    Modal, 
    Form,
    Button
} from "antd";
import { 
    DOBForm,
    ButtonSuccess, 
    SimpleInputForm,
    AddressForm,
    SimpleNumberForm,
    EmailForm,
    ContactForm,
    openNotification
} from "../../../_Component";

import { postUserProfile } from "../../../../_services";
import { getAge, mobileNumberFormat } from "../../../../_helper";

export const ModalForm = ({isModalFormOpen, setIsModalFormOpen, httpMethod, formProps}) => {
    const { apiNotif } = useContext(GlobalContext);
    const queryClient = useQueryClient();

    const postNewUser = useMutation({
        mutationFn: postUserProfile,
        onMutate: () => {
            openNotification(apiNotif, "newUser", "info", "Adding new user", "Please do not close, change, or refresh page !!");
        },
        onSuccess: (data) => {
            console.log("POST SUCCESS: ", data);
            setIsModalFormOpen(false);
            // use to directly fetch data after successfully post, with "userProfile" queryKey
            queryClient.invalidateQueries(["userProfile"], {exact: true});
            openNotification(apiNotif, "newUser", "success", "Success", "New user added successfully !!!");
        },
        onError: (data) => {
            console.log("POST ERROR: ", data);
            openNotification(apiNotif, "newUser", "error", "Error", "New user has not been added, please try again later !!!");
        }
    });

    const onFinishForm = (values) => {
        const formData = {
            ...values,
            dateOfBirth: values.dateOfBirth.format('YYYY-MM-DD'),
            age: getAge(values.dateOfBirth.format('YYYY-MM-DD')),
            phone: `(${values.phone.areaCode}) ${mobileNumberFormat(values.phone.phoneNumber)}`,
            zipCode: values.zipCode.toString()
        }
        postNewUser.mutateAsync({...formData});
        console.log(formData);
    };

    // console.log(formProps.getFieldValue());
    // const number = "(+213) 435-654-364";
    // console.log(number.replace(/[\(\)]/g, "").split(" "));

    return (
        <Modal 
            title={`${httpMethod} User`} 
            okText={"Save"}
            open={isModalFormOpen} 
            onCancel={() => setIsModalFormOpen(false)}
            footer={[
                <Button
                    key="back"
                    onClick={() => setIsModalFormOpen(false)}
                >
                    Cancel
                </Button>,
                <ButtonSuccess
                    key="save" 
                    text="Save"
                    onClick={() => {
                        formProps.validateFields()
                            .then((values) => {
                                // form.resetFields();
                                onFinishForm(values);
                            })
                            .catch((info) => {
                                console.log('Validate Failed:', info);
                            });
                    }}
                />
            ]}
        >
            <div className="modal-form-container" style={{ paddingTop: "24px" }}>
                <Form
                    form={formProps}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                    name="userProfile"
                    style={{
                        width: "auto",
                    }}
                    scrollToFirstError
                >
                    <SimpleInputForm 
                        name="name"
                        label="Full Name"
                    />
                    <DOBForm />
                    <AddressForm 
                        name="address"
                        label="Address"
                    />
                    <SimpleInputForm 
                        name="city"
                        label="City"
                    />
                    <SimpleInputForm 
                        name="state"
                        label="State"
                    />
                    <SimpleNumberForm 
                        name="zipCode"
                        label="ZIP Code"
                    />
                    <SimpleInputForm 
                        name="userName"
                        label="User Name"
                    />
                    <EmailForm 
                        name="email"
                        label="Email"
                    />
                    <ContactForm 
                        name="phone"
                        label="Phone"
                    /> 
                    {/* 
                */}
                </Form>
            </div>
        </Modal>
    );
};