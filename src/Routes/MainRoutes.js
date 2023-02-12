import React from "react";
import { 
    Navigate, 
    Route, 
    Routes, 
} from "react-router-dom";

import { PublicRoute } from "./PublicRoute";
import { ProtectedRoute } from "./ProtectedRoute";

import { 
    AuthLayout, 
    LoginPage, 
    RegistrationPage 
} from "../Pages/Auth";

import { HomeLayout } from "../Pages/HomeLayout";
import { sidebarRouteList, otherRouteList } from "./RouteRegistry";

export const MainRoutes = ({isDarkMode, setIsDarkMode}) => {

    return (
        <Routes>

            {/* PUBLIC ROUTES */}
            <Route path="/" element={<PublicRoute />} >
                <Route path="/" element={<AuthLayout />} >
                    <Route index path={"/login"} element={<LoginPage />} />
                    <Route path={"/register"} element={<RegistrationPage />} />
                    <Route path="/" element={<Navigate to={"/login"} replace />} />
                </Route>
            </Route>
            {/* PUBLIC ROUTES */}

            {/* PROTECTED ROUTES */}
            <Route path="/" element={<ProtectedRoute />} >
                <Route path="/" element={<HomeLayout />} >

                    {/* sidebar routes */}
                    {
                        sidebarRouteList?.map((data, index) => {
                            if (data.children.length === 0) {
                                return (
                                    <Route key={index} {...data.isIndex === true ? index : null} path={data.path} element={data.element} />
                                )
                            } else {
                                return (
                                    data.children.map((data, index) =>
                                        <Route key={index} path={data.path} element={data.element} />
                                    )
                                )
                            }
                        })
                    }
                    {/* sidebar routes */}

                    {/* other route */}
                    {
                        otherRouteList.map((data, index) => 
                            <Route key={index} path={data.path} element={data.element} />
                        )
                    }
                    {/* other route */}
                    <Route path="/" element={<Navigate to={"/dashboard"} replace />} />
                </Route>
            </Route>
            {/* PROTECTED ROUTES */}

        </Routes>
    );
};