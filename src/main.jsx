import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import DankeSeite from "./pages/danke.jsx"; // deine Danke-Seite
import "./index.css";
import DemoDanke from './pages/demodanke';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/danke" element={<DankeSeite />} />
        <Route path="/demo-danke" element={<DemoDanke />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
