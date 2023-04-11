import React, { useContext } from "react";
// import { GlobalContext } from "../App";
import { GlobalContext } from "../GlobalContext";
import { useNavigate } from "react-router-dom";

import { 
    theme,
    Typography, 
} from "antd";

import offIcon from "../_assets/demo/images/off.png";
import { useMutateData, userLogout } from "../_services";

const { Text } = Typography;

export const ButtonLogOut = () => {
    const { apiNotif } = useContext(GlobalContext);
    const navigateTo = useNavigate();

    const mutateLogout = useMutateData({
        actionType: "logout",
        mutateFn: userLogout,
        queryKey: undefined,
        lsKey: undefined,
        formProps: undefined,
        // apiNotif,
        // apiKey: "logout",
        setIsModalFormOpen: undefined,
        // navigate: navigateTo,
        routePath: ("/login"),
    });

    const {
        token: { 
            borderRadiusLG, 
            colorBgTextHover,
        },
    } = theme.useToken();

    return (
        <div className="button-logout-container">
            <button
                style={{
                    "--bgc": colorBgTextHover,
                    borderRadius: borderRadiusLG,
                }}
                onClick={() => {
                    mutateLogout.mutateAsync();
                }}
            >
                <Text style={{ fontSize: "14px" }}>Log Out</Text>
                <img src={offIcon} alt="icon" />
            </button>
        </div>
    );
};