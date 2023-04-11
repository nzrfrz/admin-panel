import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { 
  BrowserRouter, 
  Routes, 
  Route, 
} from "react-router-dom";
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './index.css';
import 'antd/dist/reset.css';
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import App from './App';
import { SuspenseFallback } from './Component';

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       staleTime: false,
//       refetchOnMount: false,
//       refetchOnWindowFocus: false
//     }
//   }
// });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      {/* <Suspense fallback={<SuspenseFallback />}> */}
        <Routes>
          <Route path='/*' element={<App />} />
        </Routes>
      {/* </Suspense> */}
    </BrowserRouter>
  // </QueryClientProvider>
);