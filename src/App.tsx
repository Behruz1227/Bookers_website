import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./app/home/index";
import Gallery from "./app/gallery";
import { AboutCompany } from "./app/AboutCompany/AboutCompany";
import Conditions from "./app/conditions/conditions";
import Tariffs from "./app/tariffs/tariffs";
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
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </>
  );
}

export default App;
