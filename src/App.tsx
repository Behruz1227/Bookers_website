import { BrowserRouter, Route, Routes } from "react-router-dom";
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

function App() {
  const [location, setLocation] = useState<any>();
  const [error, setError] = useState<any>();
  const userLocation: any = sessionStorage.getItem("userLocation");
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
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/galereya" element={<Gallery />} />
          <Route path="/AboutCompany" element={<AboutCompany />} />
          <Route path="/conditions" element={<Conditions />} />
          <Route path="/Tariffs" element={<Tariffs />} />
          <Route path="/StandardsSafety" element={<StandardsSafety />} />
          <Route path="/Vacancies" element={<Vacancies />} />
          <Route path="/Partnership" element={<Partnership />} />
          <Route path="/Services" element={<Services />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
