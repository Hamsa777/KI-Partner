import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import KIPartnerLanding from "./KIPartnerLanding.jsx";
import DankeSeite from "./pages/danke.jsx"; // bleibt in /src/pages

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<KIPartnerLanding />} />
        <Route path="/danke" element={<DankeSeite />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
