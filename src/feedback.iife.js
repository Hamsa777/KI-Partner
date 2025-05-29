console.log("🟢 RICHTIGE VERSION GELADEN – Build von 22:52");

import React from "react";
import ReactDOM from "react-dom/client";
import FeedbackWidget from "./components/FeedbackWidget";

(function () {
  const scriptTag = document.currentScript;
  const firmaId = scriptTag?.getAttribute("data-firmaid");

  if (!firmaId) {
    console.error("❌ Keine firmaId gefunden!");
    return;
  }

  const rootId = "widget-root";
  let root = document.getElementById(rootId);

  if (!root) {
    root = document.createElement("div");
    root.id = rootId;
    scriptTag.parentNode.insertBefore(root, scriptTag.nextSibling);
  }

  ReactDOM.createRoot(root).render(
    React.createElement(FeedbackWidget, { firmaId })
  );
})();
