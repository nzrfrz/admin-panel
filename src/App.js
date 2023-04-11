import { MainRoutes } from './Routes';

import { GlobalContextProvider } from './GlobalContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useTokenChecker } from './_services';

export const queryClientInstance = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: false,
      // refetchOnMount: false,
      refetchOnWindowFocus: false
    }
  }
});

function App() {
  return (
    <QueryClientProvider client={queryClientInstance}>
      <GlobalContextProvider>
        <MainRoutes />
      </GlobalContextProvider>
    </QueryClientProvider>
  );
}

export default App;