// src/main.jsx oder src/index.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout.jsx"; // <--- NEU
import Home from "./App.jsx";
import DankeSeite from "./pages/danke.jsx";
import DemoDanke from "./pages/demodanke.jsx";
import FeedbackPage from "./pages/FeedbackPage.jsx";
import UeberUns from "./pages/UeberUns.jsx";
import DokumentenAutomatisierung from "./pages/DokumentenAutomatisierung.jsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>

        {/* Seiten mit globalem Layout (Header) */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/ueberuns" element={<UeberUns />} />
          <Route path="/dokumenten-automatisierung" element={<DokumentenAutomatisierung />} />
        </Route>

        {/* Sonderseiten ohne Header */}
        <Route path="/danke" element={<DankeSeite />} />
        <Route path="/demo-danke" element={<DemoDanke />} />
        <Route path="/feedback/:firmaId" element={<FeedbackPage />} />
        
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
