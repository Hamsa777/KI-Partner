console.log("📦 feedback.js geladen");

(function () {
  console.log("✅ Feedback-Widget initialisiert");

  const script = document.querySelector('script[data-firmaid]');
  if (!script) {
    console.error("❌ Kein <script> mit data-firmaid gefunden!");
    return;
  }

  // ✅ CSS laden (lokal oder extern)
  const style = document.createElement("link");
  style.rel = "stylesheet";
  style.href = "./feedback.css"; // lokal im public-Ordner
  document.head.appendChild(style);

  // ✅ Google Font laden
  const font = script.dataset.font || "Inter";
  const fontLink = document.createElement("link");
  fontLink.rel = "stylesheet";
  fontLink.href = `https://fonts.googleapis.com/css2?family=${font.replace(/ /g, "+")}&display=swap`;
  document.head.appendChild(fontLink);

  // ✅ Widget-Container erzeugen (falls nicht vorhanden)
  const container = document.querySelector("#widget-root") || document.createElement("div");
  if (!document.querySelector("#widget-root")) {
    container.id = "widget-root";
    script.parentNode.insertBefore(container, script.nextSibling);
  }

  // ✅ Konfig auslesen
  
  

  const firmaId = script.dataset.firmaid;

  // ✅ React root mounten (CDN-Variante)
  const root = ReactDOM.createRoot(container);
  root.render(React.createElement(FeedbackWidget, { firmaId, config }));
})();
