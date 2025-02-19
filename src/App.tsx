import {Route, Routes, useLocation} from "react-router-dom";
import Home from "./app/home/index";
import {AboutCompany} from "./app/AboutCompany/AboutCompany";
import Conditions from "./app/conditions/conditions";
import Tariffs from "./app/tariffs/tariffs";
import {StandardsSafety} from "./app/StandardsSafety/StandardsSafety";
import {Vacancies} from "./app/Vacancies/Vacancies";
import {Partnership} from "./app/Partnership/Partnership";
import Services from "./app/services";
import MasterProfile from "./app/Profile/MasterProfile";

import './i18n';
import Header from "./components/Header/Header";
import Order from "@/app/order/order.tsx";

function App() {
    const {pathname} = useLocation();
    return (
        <div>

            {!pathname.startsWith('/link/order') && <Header/>}
            <div className="container">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/AboutCompany" element={<AboutCompany/>}/>
                    <Route path="/conditions" element={<Conditions/>}/>
                    <Route path="/Tariffs" element={<Tariffs/>}/>
                    <Route path="/StandardsSafety" element={<StandardsSafety/>}/>
                    <Route path="/Vacancies" element={<Vacancies/>}/>
                    <Route path="/Partnership" element={<Partnership/>}/>
                    <Route path="/Services/:id" element={<Services/>}/>
                    <Route path="/Master/:id" element={<MasterProfile/>}/>
                    <Route path="/link/order/:id" element={<Order/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;
