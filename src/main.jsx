import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import DankeSeite from "./pages/danke.jsx";
import DemoDanke from "./pages/demodanke.jsx";
import FeedbackPage from "./pages/FeedbackPage.jsx"; 
import WidgetBot from "./components/WidgetBot.jsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/danke" element={<DankeSeite />} />
        <Route path="/demo-danke" element={<DemoDanke />} />
        <Route path="/feedback/:firmaId" element={<FeedbackPage />} /> 


      </Routes>
    </BrowserRouter>
    <WidgetBot />
  </React.StrictMode>
);
