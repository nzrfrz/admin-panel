import { notification } from "antd";

export const openNotification = (notifKey, iconType, responseTitleMessage, responseDescMessage) => {
    // iconType = success, error, info, warning
    const iconTypeBGColor = () => {
        switch (iconType) {
            case "info":
                return "#C8C8FF";
            case "error":
                return "#FFD2D2";
            case "success":
                return "#C8FCC8";
            case "warning":
                return "#FFFBC8";
            default:
                break;
        };
    };

    notification[iconType]({
        key: notifKey,
        message: responseTitleMessage,
        description: responseDescMessage,
        placement: "bottomRight",
        style: {
            backgroundColor: iconTypeBGColor(),
            fontSize: "30px"
        }
    });
};