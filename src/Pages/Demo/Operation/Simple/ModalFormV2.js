import React, { useMemo } from "react";

import { 
    Modal, 
    Form,
    Button
} from "antd";
import { 
    ButtonSuccess, 
    SimpleInputForm,
    SimpleNumberForm,
    CurrencyForm,
} from "../../../../Component";

import { getMedicines, postMedicines, putMedicines, useMutateData } from "../../../../_services";
import { toTitleCase } from "../../../../_helper";

export const ModalFormV2 = ({isModalFormOpen, setIsModalFormOpen, httpMethod, formProps, editedDataRow}) => {

    const mutateData = useMutateData({
        actionType: httpMethod,
        mutateFn: httpMethod === "post" ? postMedicines : putMedicines,
        queryKey: ["medicinesAll"],
        refetchFn: () => getMedicines(),
        lsKey: undefined,
        formProps,
        setIsModalFormOpen: setIsModalFormOpen,
        routePath: undefined,
    });
    // console.log(httpMethod);

    const httpMethodTitleAlias = useMemo(() => {
        switch (httpMethod) {
            case "post":
                return "Add New User";
            case "put":
                return "Edit User";
            case "viewDetail":
                return "User Detail";
            default:
                break;
        }
    }, [httpMethod]);

    const onFinishForm = (values) => {
        const formData = {
            ...values,
            name: toTitleCase(values.name),
            manufacturer: toTitleCase(values.manufacturer),
            dosage: values.dosage.toString() + " mg",
            price: values.price.toString(),
        }

        mutateData.mutateAsync({payload: formData, dataID: editedDataRow.id});
        // console.log(formData);
    };
    // console.log(mutation.status);

    return (
        <Modal 
            title={httpMethodTitleAlias} 
            okText={"Save"}
            open={isModalFormOpen} 
            onCancel={() => setIsModalFormOpen(false)}
            footer={[
                <Button
                    key="back"
                    loading={mutateData?.status === "loading" ? true : false}
                    onClick={() => setIsModalFormOpen(false)}
                >
                    Cancel
                </Button>,
                httpMethod !== "viewDetail" &&
                <ButtonSuccess
                    loading={mutateData?.status === "loading" ? true : false}
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
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    layout="horizontal"
                    name="userProfile"
                    style={{
                        width: "auto",
                    }}
                    scrollToFirstError
                    disabled={httpMethod === "viewDetail" ? true : false}
                >

                    <SimpleInputForm 
                        name="name"
                        label="Medicine Name"
                    />
                    <SimpleInputForm 
                        name="manufacturer"
                        label="Manufacturer"
                    />
                    <SimpleNumberForm 
                        name="dosage"
                        label="Dosage"
                    />
                    <SimpleNumberForm 
                        name="quantity"
                        label="Quantity"
                    />
                    <CurrencyForm 
                        name="price"
                        label="Price"
                        prefix="$"
                    /> 
                    {/* 
                */}
                </Form>
            </div>
        </Modal>
    );
};