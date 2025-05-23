// feedback.js
import React from "react";
import { createRoot } from "react-dom/client";
import FeedbackWidget from './src/components/FeedbackWidget.jsx';


(function () {
  const script = document.currentScript;
  const container = document.createElement("div");
  script.parentNode.insertBefore(container, script.nextSibling);

  const firmaId = script.dataset.firmaid;
  const config = {
    color: script.dataset.color,
    accentColor: script.dataset.accentColor,
    textColor: script.dataset.textColor,
    font: script.dataset.font,
    radius: script.dataset.radius,
    boxRadius: script.dataset.boxRadius,
    logoUrl: script.dataset.logoUrl,
    customTitle: script.dataset.customTitle,
    headingFontSize: script.dataset.headingFontSize,
    arrowColor: script.dataset.arrowColor,
    arrowBgColor: script.dataset.arrowBgColor,
    widgetStylePreset: script.dataset.widgetStylePreset,
    stylePreset: script.dataset.stylePreset,
    footerBgColor: script.dataset.footerBgColor,
    headingStyles: {
      color: script.dataset.headingColor,
      bold: script.dataset.headingBold === "true",
      italic: script.dataset.headingItalic === "true",
      underline: script.dataset.headingUnderline === "true",
    }
  };
  

  const root = createRoot(container);
  root.render(React.createElement(FeedbackWidget, { firmaId, config }));

})();
