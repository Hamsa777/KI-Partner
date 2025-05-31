import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FeedbackWidget from "../components/FeedbackWidget";

export default function WidgetEditor() {
  const { firmaId } = useParams();

  const [color, setColor] = useState("#f8f8f8");
  const [accentColor, setAccentColor] = useState("#000000");
  const [textColor, setTextColor] = useState("#ffffff");
  const [font, setFont] = useState("Inter, sans-serif");
  const [radius, setRadius] = useState("30px");
  const [boxRadius, setBoxRadius] = useState("30px");
  const [customTitle, setCustomTitle] = useState("Unsere Kundenbewertungen");
  const [logoUrl, setLogoUrl] = useState("");
  const [headingFontSize, setHeadingFontSize] = useState("28px");
  const [arrowColor, setArrowColor] = useState("#000000");
  const [arrowBgColor, setArrowBgColor] = useState("#ffffff");
  const [widgetStylePreset, setWidgetStylePreset] = useState("classic");
  const [stylePreset, setStylePreset] = useState("classic");

  const [headingStyles, setHeadingStyles] = useState({
    bold: true,
    italic: false,
    underline: false,
    color: "#000000",
  });

  const [activeTab, setActiveTab] = useState("colors");

  useEffect(() => {
    if (font) {
      const fontName = font.split(",")[0].replace(/['"]/g, "").replace(/ /g, "+");
      const link = document.createElement("link");
      link.href = `https://fonts.googleapis.com/css2?family=${fontName}&display=swap`;
      link.rel = "stylesheet";
      document.head.appendChild(link);
      return () => {
        document.head.removeChild(link);
      };
    }
  }, [font]);

  const config = {
    color,
    accentColor,
    font,
    radius,
    logoUrl,
    boxRadius,
    headingStyles,
    textColor,
    headingFontSize,
    customTitle,
    arrowColor,
    arrowBgColor,
    widgetStylePreset,
    stylePreset,
  };

  const iframeCode = `<iframe 
  src="https://www.ki-partner24.de/embed/${firmaId}"
  width="100%"
  height="360"
  style="border: none; display: block;"
  loading="lazy"
  title="Kundenbewertungen Widget"
/>`;

  return (
    <div className="min-h-screen bg-gray-50 p-10 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-10 text-center">Ihr personalisierter Embed-Code</h1>

      <div className="w-full max-w-2xl">
        <div className="flex space-x-4 mb-6 border-b">
          {["colors", "font", "layout", "branding"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 ${activeTab === tab ? "border-b-2 border-black font-semibold" : "text-gray-500"}`}
            >
              {tab === "colors" ? "Farben" : tab === "font" ? "Schrift" : tab === "layout" ? "Layout" : "Branding"}
            </button>
          ))}
        </div>

        {activeTab === "colors" && (
          <div className="grid gap-4">
            <label>Hintergrundfarbe (Primär):<input type="color" className="w-full p-2 border" value={color} onChange={(e) => setColor(e.target.value)} /></label>
            <label>Bewertungsboxen-Farbe (Sekundär):<input type="color" className="w-full p-2 border" value={accentColor} onChange={(e) => setAccentColor(e.target.value)} /></label>
            <label>Überschrift-Farbe:<input type="color" className="w-full p-2 border" value={headingStyles.color} onChange={(e) => setHeadingStyles({ ...headingStyles, color: e.target.value })} /></label>
            <label>Schriftfarbe:<input type="color" className="w-full p-2 border" value={textColor} onChange={(e) => setTextColor(e.target.value)} /></label>
            <label>Pfeilfarbe:<input type="color" className="w-full p-2 border" value={arrowColor} onChange={(e) => setArrowColor(e.target.value)} /></label>
            <label>Pfeil-Hintergrundfarbe:<input type="color" className="w-full p-2 border" value={arrowBgColor} onChange={(e) => setArrowBgColor(e.target.value)} /></label>
          </div>
        )}

        {activeTab === "font" && (
          <div className="grid gap-4">
            <label>Schriftart:
              <select className="w-full p-2 border" value={font} onChange={(e) => setFont(e.target.value)}>
                {["Inter", "Roboto", "Open Sans", "Lato", "Montserrat", "Poppins", "Raleway", "Ubuntu", "Nunito", "Work Sans", "system-ui", "Segoe UI", "Helvetica", "Arial", "sans-serif"]
                  .map(f => <option key={f} value={`${f}, sans-serif`}>{f}</option>)}
              </select>
            </label>
            <label>Schriftgröße Überschrift:
              <input type="number" min="8" max="60" className="w-full p-2 border" value={parseInt(headingFontSize)} onChange={(e) => setHeadingFontSize(`${e.target.value}px`)} />
            </label>
            <fieldset className="border p-4 rounded space-y-2">
              <legend className="font-semibold">Überschrift-Stil</legend>
              <label className="flex items-center gap-2"><input type="checkbox" checked={headingStyles.bold} onChange={(e) => setHeadingStyles({ ...headingStyles, bold: e.target.checked })} /> Fett</label>
              <label className="flex items-center gap-2"><input type="checkbox" checked={headingStyles.italic} onChange={(e) => setHeadingStyles({ ...headingStyles, italic: e.target.checked })} /> Kursiv</label>
              <label className="flex items-center gap-2"><input type="checkbox" checked={headingStyles.underline} onChange={(e) => setHeadingStyles({ ...headingStyles, underline: e.target.checked })} /> Unterstrichen</label>
            </fieldset>
          </div>
        )}

        {activeTab === "layout" && (
          <div className="grid gap-4">
            <label>Widget-Stil:
              <select className="w-full p-2 border" value={widgetStylePreset} onChange={(e) => setWidgetStylePreset(e.target.value)}>
                <option value="classic">Classic</option>
                <option value="glass">Glass</option>
                <option value="flat">Minimal Flat</option>
              </select>
            </label>
            <label>Box-Stil:
              <select className="w-full p-2 border" value={stylePreset} onChange={(e) => setStylePreset(e.target.value)}>
                <option value="classic">Classic Shadow</option>
                <option value="glass">Glass Look</option>
                <option value="flat">Minimal Flat</option>
              </select>
            </label>
            <label>Widget-Abrundung:
              <input type="number" min="0" max="60" className="w-full p-2 border" value={parseInt(radius)} onChange={(e) => setRadius(`${e.target.value}px`)} />
            </label>
            <label>Box-Abrundung:
              <input type="number" min="0" max="60" className="w-full p-2 border" value={parseInt(boxRadius)} onChange={(e) => setBoxRadius(`${e.target.value}px`)} />
            </label>
          </div>
        )}

        {activeTab === "branding" && (
          <div className="grid gap-4">
            <label>Widget-Titel:
              <input type="text" className="w-full p-2 border" value={customTitle} onChange={(e) => setCustomTitle(e.target.value)} />
            </label>
            <label>Logo-URL:
              <input type="text" className="w-full p-2 border" value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} />
            </label>
          </div>
        )}
      </div>

      <div className="w-full max-w-5xl mt-12">
        <h2 className="text-lg font-semibold mb-4 text-center">Live-Vorschau Ihres Widgets</h2>
        <div className="relative">
          <FeedbackWidget firmaId={firmaId} config={config} />
        </div>
        <div className="mt-6 flex justify-center">
          <button className="px-6 py-2 bg-gray-200 text-sm rounded hover:bg-gray-300 transition"
            onClick={() => {
              setColor("#f8f8f8");
              setAccentColor("#ffffff");
              setTextColor("#000000");
              setFont("Inter, sans-serif");
              setRadius("16px");
              setBoxRadius("16px");
              setLogoUrl("");
              setHeadingStyles({ bold: false, italic: false, underline: false, color: "#000000" });
            }}>
            Zurücksetzen auf Standardwerte
          </button>
        </div>
      </div>

      <button
  className="mt-4 px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
  onClick={async () => {
    try {
      const response = await fetch(`https://feedback.ki-partner24.de/feedback-api/config-json/${firmaId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(config),
      });

      // ⛑ Falls keine JSON-Antwort zurückkommt (z. B. bei 500)
      let result = {};
      try {
        result = await response.json();
      } catch (e) {
        console.warn("⚠️ Antwort ist kein JSON:", e);
      }

      if (response.ok) {
        alert("✅ Konfiguration gespeichert!");
        console.log("✅ Server-Antwort:", result);
      } else {
        console.error("❌ Fehler vom Server:", result);
        alert("❌ Fehler beim Speichern: " + (result?.message || "Unbekannter Fehler"));
      }
    } catch (err) {
      console.error("❌ Netzwerkfehler:", err);
      alert("❌ Netzwerkfehler beim Speichern. Prüfe Serverstatus & CORS.");
    }
  }}
>
  Änderungen speichern
</button>




      <div className="w-full max-w-2xl bg-white p-6 mt-12 rounded-xl shadow-md text-center">
        <h2 className="text-lg font-semibold mb-4 text-center">Ihr Embed-Code</h2>
        <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto text-left">{iframeCode}</pre>
        <button
          className="mt-4 px-6 py-2 bg-black text-white font-semibold rounded-lg hover:bg-[#4F46E5] transition"
          onClick={() => {
            navigator.clipboard.writeText(iframeCode);
            alert("Embed-Code wurde kopiert!");
          }}
        >
          Embed-Code kopieren
        </button>
      </div>
    </div>
  );
}
