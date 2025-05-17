// src/main.jsx oder src/index.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WidgetBotCode from "./pages/WidgetBotCode";
import Layout from "./components/Layout.jsx"; // <--- NEU
import Home from "./App.jsx";
import DankeSeite from "./pages/danke.jsx";
import DemoDanke from "./pages/demodanke.jsx";
import FeedbackPage from "./pages/FeedbackPage.jsx";
import UeberUns from "./pages/UeberUns.jsx";
import DokumentenAutomatisierung from "./pages/DokumentenAutomatisierung.jsx";
import Embed from "./pages/Embed.jsx";
import EmbedDemo from "./pages/EmbedDemo";
import Chatbots from "./pages/chatbots";
import ScrollToTop from "./components/ScrollToTop";
import "./index.css";
import Kundenfeedback from "./pages/Kundenfeedback.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <ScrollToTop />
      <Routes>

        {/* Seiten mit globalem Layout (Header) */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/ueberuns" element={<UeberUns />} />
          <Route path="/dokumenten-automatisierung" element={<DokumentenAutomatisierung />} />
          <Route path="/Kundenfeedback" element={<Kundenfeedback />} />
          <Route path="/chatbots" element={<Chatbots />} />
        </Route>

        {/* Sonderseiten ohne Header */}
        <Route path="/danke" element={<DankeSeite />} />
        <Route path="/demo-danke" element={<DemoDanke />} />
        <Route path="/feedback/:firmaId" element={<FeedbackPage />} />
        <Route path="/embed/:firmaId" element={<Embed />} />
        <Route path="/embed/demo" element={<EmbedDemo />} />
        <Route path="/widgetbot/:firmaId" element={<WidgetBotCode />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
