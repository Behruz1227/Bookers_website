import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {QueryClient, QueryClientProvider} from 'react-query'
import {Login} from './app/Auth/Login.tsx'
import {LeaveFeedback} from './components/leave-feedback-controller/LeaveFeedback.tsx'
import {VacanciesModal} from './components/VacanciesModal/vacancies.tsx'
import {MasterClassModal} from './components/MasterClassModal/MasterClass.tsx'
import {BrowserRouter} from "react-router-dom";
import {ToastContainer} from "react-toastify";

const queryClient = new QueryClient();
createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <ToastContainer/>
                <App/>
                <Login/>
                <LeaveFeedback/>
                <VacanciesModal/>
                <MasterClassModal/>
            </QueryClientProvider>
        </BrowserRouter>
    </StrictMode>,
)
