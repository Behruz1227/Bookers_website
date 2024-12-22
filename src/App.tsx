import { BrowserRouter, Route, Routes } from "react-router-dom";
// import OTPModal from "./components/Modals/OTPModal";
import TermsOfUse from "./components/MenuBar";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TermsOfUse />} />
          {/* <Route path="" element={<OTPModal />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
