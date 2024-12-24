import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Index from "./pages/test";
// import TermsOfUse from "./components/MenuBar";
// import StandartPlan from "./components/Accardion";
// import CalendarMultiSelect from "./components/Calendar";
// import TimePicker from "./components/Time";
import Home from "./page/home";
import Services from "./app/services";
// import Footer from "./components/footer/Footer";

//foooter links
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          {/* <Route path="/" element={<TermsOfUse />} />
          <Route path="/accardion" element={<StandartPlan />} />
          <Route path="/calendar" element={<CalendarMultiSelect />} />
          <Route path="/time" element={<TimePicker />} /> */}
          {/* <Footer/> */}
          {/* <Route path="/" element={<Home />} />
          <Route path="/Условия использования" element={<Условия />} />
          <Route path="/" element={<Home />} /> */}
          <Route path="/services" element={<Services />} />
          {/* <Footer /> */}
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </>
  );
}

export default App;
