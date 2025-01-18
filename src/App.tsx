import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./app/home/index";
import Gallery from "./app/gallery";
import { AboutCompany } from "./app/AboutCompany/AboutCompany";
import Conditions from "./app/conditions/conditions";
import Tariffs from "./app/tariffs/tariffs";
import { StandardsSafety } from "./app/StandardsSafety/StandardsSafety";
import { Vacancies } from "./app/Vacancies/Vacancies";
import { Partnership } from "./app/Partnership/Partnership";
import { getLocationPermission } from "./helpers/ForLocation/Location";
import { useEffect, useState } from "react";
import Services from "./app/services";
import MasterProfile from "./app/Profile/MasterProfile";
import { LeaveFeedback } from "./components/leave-feedback-controller/LeaveFeedback";
import './i18n';
import Header from "./components/Header/Header";
import { FaSearch } from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";

function App() {
  const [location, setLocation] = useState<any>();
  const [error, setError] = useState<any>();
  const userLocation: any = localStorage.getItem("userLocation");
  useEffect(() => {
    if (!userLocation) {
      getLocationPermission(
        (loc: any) => {
          setLocation(loc);
          setError(null);
        },
        (err) => {
          setError(err);
        }
      );
    }
  }, []);

  return (
    <div className="container">
      <ToastContainer />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/galereya" element={<Gallery />} />
          <Route path="/AboutCompany" element={<AboutCompany />} />
          <Route path="/conditions" element={<Conditions />} />
          <Route path="/Tariffs" element={<Tariffs />} />
          <Route path="/StandardsSafety" element={<StandardsSafety />} />
          <Route path="/Vacancies" element={<Vacancies />} />
          <Route path="/Partnership" element={<Partnership />} />
          <Route path="/Services/:id" element={<Services />} />
          <Route path="/Master/:id" element={<MasterProfile />} />
          <Route path="/otziv" element={<LeaveFeedback />} />
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
