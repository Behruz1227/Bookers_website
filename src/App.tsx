import { BrowserRouter, Route, Routes } from "react-router-dom";
<<<<<<< HEAD
import Index from "./pages/test";
=======
// import TermsOfUse from "./components/MenuBar";
// import StandartPlan from "./components/Accardion";
// import CalendarMultiSelect from "./components/Calendar";
// import TimePicker from "./components/Time";
import Home from "./page/home";
import Footer from "./components/footer/Footer";
>>>>>>> e6bb0c034aa9ddcdafd60133861da32890cef221

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
<<<<<<< HEAD
          <Route path="/" element={<Index />} />
=======
          <Route path="/" element={<Home/>}/>
          {/* <Route path="/" element={<TermsOfUse />} />
          <Route path="/accardion" element={<StandartPlan />} />
          <Route path="/calendar" element={<CalendarMultiSelect />} />
          <Route path="/time" element={<TimePicker />} /> */}
         <Footer/>
>>>>>>> e6bb0c034aa9ddcdafd60133861da32890cef221
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
