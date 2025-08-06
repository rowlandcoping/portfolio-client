import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css';
import { RouterProvider } from '@tanstack/react-router';
import { router } from './app/router';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import { queryClient } from './app/queryClient';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'

export const asyncStoragePersister = createAsyncStoragePersister({
  storage: AsyncStorage,
})

if (import.meta.env.MODE === "production") disableReactDevTools();

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error("Root element not found");
const root = ReactDOM.createRoot(rootElement);

function AppWrapper() {
  React.useEffect(() => {
    document.body.classList.remove('preload');
  }, []);

  return <RouterProvider router={router} />;
}

root.render(
    <React.StrictMode>
        <PersistQueryClientProvider
            client={queryClient}
            persistOptions={{ persister: asyncStoragePersister }}
        >            
            <AppWrapper />
        </PersistQueryClientProvider>
    </React.StrictMode>
);
document.body.classList.remove('preload');
