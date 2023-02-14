import React, { createContext, useEffect, useState } from 'react';
import { ConfigProvider, theme, notification } from 'antd';
import { themeToken } from './themeToken';

import { MainRoutes } from './Routes';

export const GlobalContext = createContext();

function App() {
  const { defaultAlgorithm, darkAlgorithm } = theme;

  const themeMode = localStorage.getItem("themeMode");

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [apiNotif, contextHolder] = notification.useNotification();

  useEffect(() => {
    setIsDarkMode(themeMode === "dark" ? true : false);
  }, [themeMode]);

  // console.log(isDarkMode);

  return (
    <ConfigProvider
      theme={{ 
        algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
        token: themeToken(isDarkMode),
      }}
    >
      <GlobalContext.Provider 
        value={{
          isDarkMode, 
          setIsDarkMode,
          apiNotif
        }}
      >
        {contextHolder}
        <MainRoutes />
      </GlobalContext.Provider>
    </ConfigProvider>
  );
}

export default App;