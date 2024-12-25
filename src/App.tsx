import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./app/home/index";
import Gallery from "./app/gallery";
import { AboutCompany } from "./app/AboutCompany/AboutCompany";
import Conditions from "./app/conditions/conditions";
import Tariffs from "./app/tariffs/tariffs";
import { StandardsSafety } from "./app/StandardsSafety/StandardsSafety";
import { Vacancies } from "./app/Vacancies/Vacancies";
import { Partnership } from "./app/Partnership/Partnership";
// import Footer from "./components/footer/Footer";

//foooter links
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/galereya" element={<Gallery />} />
          <Route path="/AboutCompany" element={<AboutCompany />} />
          <Route path="/conditions" element={<Conditions/>}/>
          <Route path="/Tariffs" element={<Tariffs/>} />
          <Route path="/StandardsSafety" element={<StandardsSafety/>}/>
          <Route path="/Vacancies" element={<Vacancies/>} />
          <Route path="/Partnership" element={<Partnership/>} />
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </>
  );
}

export default App;
