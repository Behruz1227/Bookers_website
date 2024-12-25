import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./app/home/index";
import Gallery from "./app/gallery";
import { AboutCompany } from "./app/AboutCompany/AboutCompany";
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
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </>
  );
}

export default App;
