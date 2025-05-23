// 📁 feedback.js
import React from "react";
import { createRoot } from "react-dom/client";
import FeedbackWidget from "./src/components/FeedbackWidget"; // ggf. Pfad anpassen

(function () {
  // CSS laden (z. B. Tailwind-Build)
  const style = document.createElement("link");
  style.rel = "stylesheet";
  style.href = "https://www.ki-partner24.de/feedback.css";
  document.head.appendChild(style);

  // Font dynamisch laden
  const font = document.currentScript.dataset.font || "Inter";
  const fontName = font.split(",")[0].replace(/['"]/g, "").replace(/ /g, "+");
  const fontLink = document.createElement("link");
  fontLink.rel = "stylesheet";
  fontLink.href = `https://fonts.googleapis.com/css2?family=${fontName}&display=swap`;
  document.head.appendChild(fontLink);

  const container =
  document.querySelector("#widget-root") || document.createElement("div");

if (!document.querySelector("#widget-root")) {
  script.parentNode.insertBefore(container, script.nextSibling);
}



  const firmaId = script.dataset.firmaid;
  const config = {
    color: script.dataset.color,
    accentColor: script.dataset.accentColor,
    textColor: script.dataset.textColor,
    font: script.dataset.font,
    headingColor: script.dataset.headingColor,
    headingBold: script.dataset.headingBold === "true",
    headingItalic: script.dataset.headingItalic === "true",
    headingUnderline: script.dataset.headingUnderline === "true",
    headingFontSize: script.dataset.headingFontSize,
    customTitle: script.dataset.customTitle,
    radius: script.dataset.radius,
    boxRadius: script.dataset.boxRadius,
    arrowColor: script.dataset.arrowColor,
    arrowBgColor: script.dataset.arrowBgColor,
    footerBgColor: script.dataset.footerBgColor,
    widgetStylePreset: script.dataset.widgetStylePreset,
    stylePreset: script.dataset.stylePreset,
    logoUrl: script.dataset.logoUrl
  };

  const root = createRoot(container);
  root.render(<FeedbackWidget firmaId={firmaId} config={config} />);
})();
