import React, { createContext, useEffect, useState } from 'react';
import { ConfigProvider, theme, notification } from 'antd';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { themeToken } from './themeToken';

import { MainRoutes } from './Routes';

import { useParallelFetching } from './_services';

export const GlobalContext = createContext();

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       // staleTime: false,
//       // refetchOnMount: false,
//       refetchOnWindowFocus: false
//     }
//   }
// });

function App() {
  const { defaultAlgorithm, darkAlgorithm } = theme;

  const themeMode = localStorage.getItem("themeMode");

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [apiNotif, contextHolder] = notification.useNotification();

  // useQueryCache(["indonesiaRegionData"], getIndonesiaRegionData, apiNotif);
  // useQueryCache(["userProfile"], getUserProfile, apiNotif);

  // queryClient.fetchQuery({ queryKey: ["indonesiaRegionData"], queryFn: getIndonesiaRegionData })
  // .then((data) => {
  //   queryClient.setQueryData(["indonesiaRegionData"], data)
  //   console.log(data);
  // })

  useParallelFetching(apiNotif);

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
        {/* <QueryClientProvider client={queryClient}> */}
          {contextHolder}
          <MainRoutes />
        {/* </QueryClientProvider> */}
      </GlobalContext.Provider>
    </ConfigProvider>
  );
}

export default App;