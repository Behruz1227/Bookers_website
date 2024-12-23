import { BrowserRouter, Route, Routes } from "react-router-dom";
<<<<<<< HEAD
=======
import Index from "./pages/test";
>>>>>>> a24381c8e8f99f97bf16c713f576e0aba46f3fee
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
          <Route path="/" element={<Home/>}/>
          {/* <Route path="/" element={<TermsOfUse />} />
          <Route path="/accardion" element={<StandartPlan />} />
          <Route path="/calendar" element={<CalendarMultiSelect />} />
          <Route path="/time" element={<TimePicker />} /> */}
         <Footer/>
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
