import React, { createContext, useEffect, useState } from 'react';
import { ConfigProvider, theme, notification } from 'antd';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { themeToken } from './themeToken';

import { MainRoutes } from './Routes';

export const GlobalContext = createContext();

const queryClient = new QueryClient();

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
        <QueryClientProvider client={queryClient}>
          {contextHolder}
          <MainRoutes />
        </QueryClientProvider>
      </GlobalContext.Provider>
    </ConfigProvider>
  );
}

export default App;