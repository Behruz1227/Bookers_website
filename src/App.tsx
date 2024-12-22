import { BrowserRouter, Route, Routes } from "react-router-dom";
import TermsOfUse from "./components/MenuBar";
import StandartPlan from "./components/Accardion";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TermsOfUse />} />
          <Route path="/accardion" element={<StandartPlan />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
