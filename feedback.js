import React from "react";
import { createRoot } from "react-dom/client";
import FeedbackWidget from "./src/components/FeedbackWidget";

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
    headingColor: script.dataset.headingColor,
    headingBold: script.dataset.headingBold === "true",
    headingItalic: script.dataset.headingItalic === "true",
    headingUnderline: script.dataset.headingUnderline === "true",
    headingFontSize: script.dataset.headingFontSize,
    customTitle: script.dataset.customTitle,
    radius: script.dataset.radius,
    boxRadius: script.dataset.boxRadius,
    logoUrl: script.dataset.logoUrl,
    arrowColor: script.dataset.arrowColor,
    arrowBgColor: script.dataset.arrowBgColor,
    widgetStylePreset: script.dataset.widgetStylePreset,
    stylePreset: script.dataset.stylePreset,
  };

  const root = createRoot(container);
  root.render(React.createElement(FeedbackWidget, { firmaId, config }));
})();
