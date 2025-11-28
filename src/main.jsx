import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import ScrollToTop from "./components/ScrollToTop";
import "./index.css";

// Seiten mit Layout
import Home from "./App.jsx";
import UeberUns from "./pages/UeberUns.jsx";
import DokumentenAutomatisierung from "./pages/DokumentenAutomatisierung.jsx";
import Kundenfeedback from "./pages/Kundenfeedback.jsx";
import Chatbots from "./pages/chatbots.jsx";
import Datenschutz from "./pages/Datenschutz.jsx";
import Impressum from "./pages/Impressum.jsx";
// Sonderseiten (ohne Header)
import DankeSeite from "./pages/danke.jsx";
import DemoDanke from "./pages/demodanke.jsx";
import FeedbackPage from "./pages/FeedbackPage.jsx";

import EmbedPage from "./pages/EmbedPage.jsx";
import WidgetEditor from "./pages/WidgetEditor.jsx";
import WidgetBotCode from "./pages/WidgetBotCode.jsx";
import TestEditor from "./pages/TestEditor.jsx";
import ChatBotEditor from "./pages/ChatBotEditor";
import WidgetVorschau from "./components/WidgetVorschau";
import NotFound from "./pages/NotFound.jsx";
import DankeOnboarding from "./pages/DankeOnboarding.jsx";


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
          <Route path="datenschutz" element={<Datenschutz />} />
          <Route path="impressum" element={<Impressum />} />
          <Route path="/widgetvorschau" element={<WidgetVorschau />} />

        </Route>

        {/* Sonderseiten ohne Header */}
        <Route path="/danke" element={<DankeSeite />} />
        <Route path="/demo-danke" element={<DemoDanke />} />
        <Route path="/feedback/:firmaId" element={<FeedbackPage />} />
        <Route path="/embed/:firmaId" element={<EmbedPage />} /> {/* ✅ wichtig */}
        <Route path="/editor/:firmaId" element={<WidgetEditor />} />
     
        <Route path="/widgetbotcode/:firmaId" element={<WidgetBotCode />} />
        <Route path="/TestEditor/" element={<TestEditor />} />
        <Route path="/chatboteditor/:firmaId" element={<ChatBotEditor />} />
        <Route path="/widgetvorschau" element={<WidgetVorschau />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/dankeonboarding" element={<DankeOnboarding service="feedback"/>} />
        <Route path="/danke-dokumente" element={<DankeOnboarding service="document" />} />



      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
