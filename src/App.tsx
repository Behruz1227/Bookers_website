import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./app/home/index";
import { AboutCompany } from "./app/AboutCompany/AboutCompany";
import Conditions from "./app/conditions/conditions";
import Tariffs from "./app/tariffs/tariffs";
import { StandardsSafety } from "./app/StandardsSafety/StandardsSafety";
import { Vacancies } from "./app/Vacancies/Vacancies";
import { Partnership } from "./app/Partnership/Partnership";
import Services from "./app/services";
import MasterProfile from "./app/Profile/MasterProfile";

import './i18n';
import Header from "./components/Header/Header";

function App() {

  return (
    <div>
      <ToastContainer />
      <BrowserRouter>
        <Header />
        <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/AboutCompany" element={<AboutCompany />} />
          <Route path="/conditions" element={<Conditions />} />
          <Route path="/Tariffs" element={<Tariffs />} />
          <Route path="/StandardsSafety" element={<StandardsSafety />} />
          <Route path="/Vacancies" element={<Vacancies />} />
          <Route path="/Partnership" element={<Partnership />} />
          <Route path="/Services/:id" element={<Services />} />
          <Route path="/Master/:id" element={<MasterProfile />} />
        </Routes>
        </div>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
