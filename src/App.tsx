import { BrowserRouter, Route, Routes } from "react-router-dom";


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
          <Route path="/Условия использования" element={<Условия/>}/>
        
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App;
