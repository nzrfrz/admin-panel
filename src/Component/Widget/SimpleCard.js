import React, { useContext } from "react";
import { GlobalContext } from "../../../App";

import { 
    theme,
    Typography,
} from "antd";

const { Text, Title } = Typography;

export const SimpleCard = ({image, titleText, contentText, contentSuffixText}) => {
    const { isDarkMode } = useContext(GlobalContext);

    const {
        token: { 
            borderRadiusLG,
        },
    } = theme.useToken();

    return (
        <div 
            className="balance-card-container" 
            style={{ 
                "--brdr": `${borderRadiusLG}px`,
                "--bgc": isDarkMode === true ? "var(--contentContainerDarkMode)" : "var(--contentContainerLightMode)"
            }}
        >
            <div className="balance-card-image-container">
                <img src={image} alt="..." />
            </div>
            <div className="balance-card-content-container">
                <Text style={{ fontSize: "18px" }}>{titleText}</Text>
                <Text style={{ fontSize: "30px" }}>{contentSuffixText} {contentText}</Text>
            </div>
        </div>
    );
};