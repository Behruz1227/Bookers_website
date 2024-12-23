import { BrowserRouter, Route, Routes } from "react-router-dom";
// import TermsOfUse from "./components/MenuBar";
// import StandartPlan from "./components/Accardion";
// import CalendarMultiSelect from "./components/Calendar";
// import TimePicker from "./components/Time";
import Home from "./page/home";
import Footer from "./components/footer/Footer";

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
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
