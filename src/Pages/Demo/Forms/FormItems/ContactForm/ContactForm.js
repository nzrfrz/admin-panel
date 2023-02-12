import React, { useEffect, useMemo, useState } from "react";
import { 
    theme, 
    Form,
    Input,
    Typography,
    Select
} from 'antd';

import { MobileNumber } from "./MobileNumber";
import { OtherNumber } from "./OtherNumber";

export const ContactForm = ({name, label, isMobileNumber}) => {

    switch (isMobileNumber) {
        case true:
            return (
                <MobileNumber 
                    label={label}
                    name={name}
                />
            )
        case false:
            return (
                <OtherNumber
                    label={label}
                    name={name}
                />
            )
        case undefined:
            return (
                <MobileNumber 
                    label={label}
                    name={name}
                />
            )
        default:
            return null;
    }
};