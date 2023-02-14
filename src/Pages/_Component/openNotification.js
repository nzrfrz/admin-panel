export const openInitialNotification = (apiNotif, keyNotif, initialTitleMessage, initialDescMessage) => {
    apiNotif.open({
        keyNotif,
        message: initialTitleMessage,
        description: initialDescMessage,
        placement: "bottomRight",
    });
};

export const openResponseNotification = (apiNotif, keyNotif, responseTitleMessage, responseDescMessage) => {
    setTimeout(() => {
        apiNotif.open({
            keyNotif,
            message: responseTitleMessage,
            description: responseDescMessage,
            placement: "bottomRight"
        });
    }, 1000);
};