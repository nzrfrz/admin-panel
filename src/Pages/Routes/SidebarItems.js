import { protectedRouteList } from "./RouteRegistry";

const setSidebarMenuItems = (label, key, icon, children) => {
    return { label, key, icon, children };
};

export const sidebarItems = () => {

    return protectedRouteList.map((data) => {
        if (data.children.length === 0) {
            return (
                setSidebarMenuItems(
                    data.label, 
                    data.key, 
                    data.icon, 
                    null
                )
            )
        } else {
            return (
                setSidebarMenuItems(
                    data.label, 
                    data.key, 
                    data.icon, 
                    data.children.map((dataChildren) => 
                        setSidebarMenuItems(dataChildren.label, dataChildren.key, null, null),
                    )
                )
            )
        }
    })
};

export const sidebarItemKeys = protectedRouteList.map((data) => data.key);