import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Login } from './app/Auth/Login.tsx'
import { LeaveFeedback } from './components/leave-feedback-controller/LeaveFeedback.tsx'
import { VacanciesModal } from './components/VacanciesModal/vacancies.tsx'

const queryClient = new QueryClient();
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <Login/>
      <LeaveFeedback/>
      <VacanciesModal/>
    </QueryClientProvider>
  </StrictMode>,
)
