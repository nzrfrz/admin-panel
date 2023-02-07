import React, { createContext, useEffect, useState } from 'react';
import { ConfigProvider, theme } from 'antd';
import { themeToken } from './themeToken';

import { MainRoutes } from './Pages/Routes';

export const ThemeContext = createContext();

function App() {
  const { defaultAlgorithm, darkAlgorithm } = theme;

  const themeMode = localStorage.getItem("themeMode");
  const [isDarkMode, setIsDarkMode] = useState(false);

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
      <ThemeContext.Provider value={{isDarkMode, setIsDarkMode}}>
        <MainRoutes />
      </ThemeContext.Provider>
    </ConfigProvider>
  );
}

export default App;