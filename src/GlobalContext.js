import React, { createContext, useEffect, useMemo, useState } from 'react';
import { ConfigProvider, theme } from 'antd';
import { themeToken } from './themeToken';

import { useQueryData, getAccessTokenV2, useGetAccessToken, useMutableDataFetching, useAuthQuery } from './_services';
import { Spinner } from './Component';
import { privateRequest } from './_services/request';
import { QueryErrorResetBoundary } from '@tanstack/react-query';

export const GlobalContext = createContext();

const ENVIRONTMENT = process.env.REACT_APP_ENVIRONTMENT;

export const GlobalContextProvider = ({children}) => {
    // used to switch theme from antd
    const { defaultAlgorithm, darkAlgorithm } = theme;
  
    const themeMode = localStorage.getItem("themeMode");
  
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [accessToken, setAccessToken] = useState(undefined);
    const [windowDimension, setWindowDiemnsion] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    // fetching access token in case user refresh the page
    // this is use on production, see .env and package.json
    const fetchAccessToken = useAuthQuery(
        ["accessToken"], 
        accessToken === undefined ? getAccessTokenV2() : undefined, 
        setAccessToken,
    );

    // console.log("GLOBAL CONTEXT ENV: ", ENVIRONTMENT);
    // console.log("GLOBAL CONTEXT ACCESS: ", accessToken);
  
    // use to get saved theme in case user refresh app
    useEffect(() => {
        setIsDarkMode(themeMode === "dark" ? true : false);
    }, [themeMode]);

    // pool all context value to be used in other children component
    const contextValue = {
        ENVIRONTMENT,
        isDarkMode, 
        setIsDarkMode, 
        accessToken, 
        setAccessToken, 
        windowDimension, 
        setWindowDiemnsion
    };

    return (
        <ConfigProvider
            theme={{ 
                algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
                token: themeToken(isDarkMode),
            }}
        >
            <GlobalContext.Provider
                value={contextValue}
            >
            {
                fetchAccessToken?.isFetching ? 
                <div 
                    style={{
                        display: "flex",
                        width: "100vw",
                        height: "100vh",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <Spinner />
                </div>
                :
                children
            }
                {/* {children} */}
            </GlobalContext.Provider>
        </ConfigProvider>
    );
};