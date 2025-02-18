import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './App.jsx'
import './css/index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { UserProvider } from './components/UserProvider.jsx'
import { NotificationProvider } from './components/NotificationProvider.jsx'
import SubmitProvider from './components/SubmitProvider.jsx'
const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(

  <StrictMode>
    <BrowserRouter>
      <SubmitProvider>
        <NotificationProvider>
          <QueryClientProvider client={queryClient}>
            <UserProvider>
              <App />
            </UserProvider>
          </QueryClientProvider>
        </NotificationProvider>
      </SubmitProvider>
    </BrowserRouter>
  </StrictMode>
)
