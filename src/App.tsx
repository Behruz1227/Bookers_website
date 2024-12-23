import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./pages/test";
// import TermsOfUse from "./components/MenuBar";
// import StandartPlan from "./components/Accardion";
// import CalendarMultiSelect from "./components/Calendar";
// import TimePicker from "./components/Time";
import Home from "./page/home";
import Footer from "./components/footer/Footer";

//foooter links
import Условия from "./page/Условия использования"
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Условия использования" element={<Условия />} />
          <Route path="/" element={<Home />} />
          <Footer />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App;
