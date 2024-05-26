import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async';
import { RouterProvider} from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { router } from './Routes/Routes';
import './index.css'
import { Toaster } from 'react-hot-toast';
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
        <HelmetProvider >
          <div className="dark text-foreground bg-background">
            <RouterProvider router={router} />
            <Toaster position="bottom-right"/>
          </div>
        </HelmetProvider>
      </QueryClientProvider>
  </React.StrictMode>,
)
