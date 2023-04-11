import React, { useContext, useEffect } from "react";
import { 
    Layout, 
    Menu, 
    Typography, 
    Breadcrumb, 
    Dropdown,
    theme 
} from 'antd';
import { GlobalContext } from "../../../GlobalContext";

// import lineChart

// import balanceImage from "../../../_assets/balance-image.png";
// import megaPhoneImage from "../../../_assets/megaphone.png";
// import mailImage from "../../../_assets/mailSuccess.png";
// import { useQueryData, getMedicines, useCachedData, useTokenChecker } from "../../../_services";
// import { queryClientInstance } from "../../../App";

const { Text, Title } = Typography;

export const DemoDashboard = () => {
    const { isDarkMode } = useContext(GlobalContext);

    const {
        token: { 
            borderRadiusLG,
        },
    } = theme.useToken();

    return (
        <div 
            className="fix-height-center-content-no-scroll" 
            style={{
                "--bgc": isDarkMode === true ? "var(--contentContainerDarkMode)" : "var(--contentContainerLightMode)",
                borderRadius: borderRadiusLG
            }}
        >
            <Title>
                DASHBOARD
            </Title>
            {/* <SimpleCard 
                image={balanceImage}
                titleText="Balance"
                contentText="456,897.15"
                contentSuffixText="$"
            />
            <SimpleCard
                image={megaPhoneImage}
                titleText="Message Sent"
                contentText="3.459.867" 
            />
            <SimpleCard 
                image={mailImage}
                titleText="Message Receive"
                contentText="2.564.654" 
            /> */}
            {/* <LineChart /> */}
        </div>
    );
};

// export default DemoDashboard;