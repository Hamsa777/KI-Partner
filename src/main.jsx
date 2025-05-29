import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import ScrollToTop from "./components/ScrollToTop";
import "./index.css";
import EmbedWidget1 from "./components/EmbedWidget1";
// Seiten mit Layout
import Home from "./App.jsx";
import UeberUns from "./pages/UeberUns.jsx";
import DokumentenAutomatisierung from "./pages/DokumentenAutomatisierung.jsx";
import Kundenfeedback from "./pages/Kundenfeedback.jsx";
import Chatbots from "./pages/chatbots.jsx";

// Sonderseiten (ohne Header)
import DankeSeite from "./pages/danke.jsx";
import DemoDanke from "./pages/demodanke.jsx";
import FeedbackPage from "./pages/FeedbackPage.jsx";
import EmbedDemo from "./pages/EmbedDemo.jsx";
import EmbedPage from "./pages/EmbedPage.jsx";
import WidgetEditor from "./pages/WidgetEditor.jsx";
import WidgetBotCode from "./pages/WidgetBotCode.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Seiten mit globalem Layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/ueberuns" element={<UeberUns />} />
          <Route path="/dokumenten-automatisierung" element={<DokumentenAutomatisierung />} />
          <Route path="/kundenfeedback" element={<Kundenfeedback />} />
          <Route path="/chatbots" element={<Chatbots />} />
        </Route>

        {/* Sonderseiten ohne Header */}
        <Route path="/danke" element={<DankeSeite />} />
        <Route path="/demo-danke" element={<DemoDanke />} />
        <Route path="/feedback/:firmaId" element={<FeedbackPage />} />
        <Route path="/embed/:firmaId" element={<EmbedWidget1 />} />
        <Route path="/editor/:firmaId" element={<WidgetEditor />} />
        <Route path="/embed/demo" element={<EmbedDemo />} />
        <Route path="/widgetbotcode/:firmaId" element={<WidgetBotCode />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
