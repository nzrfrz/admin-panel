import React, { useContext } from "react";
import { GlobalContext } from "../../../../App";

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
} from "../../../_Component";

import { postUserProfile, putUserProfile, useMutateData } from "../../../../_services";
import { getAge, mobileNumberFormat, toTitleCase } from "../../../../_helper";

export const ModalForm = ({isModalFormOpen, setIsModalFormOpen, httpMethod, formProps, editedDataRow}) => {
    const { apiNotif } = useContext(GlobalContext);
    const mutation = useMutateData(httpMethod, httpMethod === "post" ? postUserProfile : putUserProfile, ["userProfile"], formProps, apiNotif, setIsModalFormOpen, undefined, undefined);

    const onFinishForm = (values) => {
        const formData = {
            ...values,
            name: toTitleCase(values.name),
            dateOfBirth: values.dateOfBirth.format('YYYY-MM-DD'),
            age: getAge(values.dateOfBirth.format('YYYY-MM-DD')),
            phone: `(${values.phone.areaCode}) ${mobileNumberFormat(values.phone.phoneNumber)}`,
            zipCode: values.zipCode.toString()
        }

        mutation.mutateAsync({payload: formData, dataID: editedDataRow.id});
        // console.log(formProps);
    };

    return (
        <Modal 
            title={`${httpMethod === "post" ? "Add New" : "Edit"} User`} 
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
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 16 }}
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