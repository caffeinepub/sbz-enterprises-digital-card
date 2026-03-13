import { BrowserRouter, Route, Routes } from "react-router-dom";
import BusinessCard from "./pages/BusinessCard";
import Portfolio from "./pages/Portfolio";
import SmartLinks from "./pages/SmartLinks";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BusinessCard />} />
        <Route path="/links" element={<SmartLinks />} />
        <Route path="/portfolio" element={<Portfolio />} />
      </Routes>
    </BrowserRouter>
  );
}
