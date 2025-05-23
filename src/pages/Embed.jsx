import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FeedbackWidget from "../components/FeedbackWidget";

export default function EmbedPage() {
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
  const [stylePreset, setStylePreset] = useState("classic"); //cards
  

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

  const scriptCode = `<script 
  src="https://www.ki-partner24.de/feedback.js"
  data-firmaid="${firmaId}"
  data-color="${color}"
  data-accent-color="${accentColor}"
  data-font="${font}"
  data-text-color="${textColor}"
  data-heading-color="${headingStyles.color}"
  data-heading-bold="${headingStyles.bold}"
  data-heading-italic="${headingStyles.italic}"
  data-heading-underline="${headingStyles.underline}"
  data-heading-font-size="${headingFontSize}"
  data-custom-title="${customTitle}"
  data-radius="${radius}"
  data-box-radius="${boxRadius}"
  data-arrow-color="${arrowColor}"
  data-arrow-bg-color="${arrowBgColor}"
  data-widget-style-preset="${widgetStylePreset}"
  data-style-preset="${stylePreset}"
  data-logo-url="${logoUrl}"
  defer
></script>`;


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
  stylePreset, //cards
};


  return (
    <div className="min-h-screen bg-gray-50 p-10 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-10 text-center">Ihr personalisierter Embed-Code</h1>

      <div className="w-full max-w-2xl">
        <div className="flex space-x-4 mb-6 border-b">
          <button onClick={() => setActiveTab("colors")} className={`px-4 py-2 ${activeTab === "colors" ? "border-b-2 border-black font-semibold" : "text-gray-500"}`}>Farben</button>
          <button onClick={() => setActiveTab("font")} className={`px-4 py-2 ${activeTab === "font" ? "border-b-2 border-black font-semibold" : "text-gray-500"}`}>Schrift</button>
          <button onClick={() => setActiveTab("layout")} className={`px-4 py-2 ${activeTab === "layout" ? "border-b-2 border-black font-semibold" : "text-gray-500"}`}>Layout</button>
          <button onClick={() => setActiveTab("branding")} className={`px-4 py-2 ${activeTab === "branding" ? "border-b-2 border-black font-semibold" : "text-gray-500"}`}>Branding</button>
        </div>

        {activeTab === "colors" && (
          <div className="grid gap-4">
            <label>
              Hintergrundfarbe (Primär):
              <input type="color" className="w-full p-2 border" value={color} onChange={(e) => setColor(e.target.value)} />
            </label>

            <label>
              Bewertungsboxen-Farbe (Sekundär):
              <input type="color" className="w-full p-2 border" value={accentColor} onChange={(e) => setAccentColor(e.target.value)} />
            </label>

          

            <label>
              Überschrift-Farbe:
              <input type="color" className="w-full p-2 border" value={headingStyles.color} onChange={(e) => setHeadingStyles({ ...headingStyles, color: e.target.value })} />
            </label>
          

            <label>
              Schriftfarbe (für Name, Kommentar, Datum):
             <input type="color" className="w-full p-2 border" value={textColor} onChange={(e) => setTextColor(e.target.value)} />
            </label>
            <label>
            Pfeilfarbe:
            <input
              type="color"
              className="w-full p-2 border"
              value={arrowColor}
              onChange={(e) => setArrowColor(e.target.value)}
            />
            </label>
            <label>
            Pfeil-Hintergrundfarbe:
            <input
              type="color"
              className="w-full p-2 border"
              value={arrowBgColor}
              onChange={(e) => setArrowBgColor(e.target.value)}
            />
          </label>

          </div>
        )}

        {activeTab === "font" && (
          <div className="grid gap-4">
            <label>
              Schriftart:
              <select
  className="w-full p-2 border"
  value={font}
  onChange={(e) => setFont(e.target.value)}
>
  <option value="Inter, sans-serif">Inter</option>
  <option value="Roboto, sans-serif">Roboto</option>
  <option value="Open Sans, sans-serif">Open Sans</option>
  <option value="Lato, sans-serif">Lato</option>
  <option value="Montserrat, sans-serif">Montserrat</option>
  <option value="Poppins, sans-serif">Poppins</option>
  <option value="Raleway, sans-serif">Raleway</option>
  <option value="Ubuntu, sans-serif">Ubuntu</option>
  <option value="Nunito, sans-serif">Nunito</option>
  <option value="Work Sans, sans-serif">Work Sans</option>
  {/* ⬇️ NEU: System Fonts */}
  <option value="system-ui, sans-serif">System UI</option>
  <option value="Segoe UI, sans-serif">Segoe UI</option>
  <option value="Helvetica, sans-serif">Helvetica</option>
  <option value="Arial, sans-serif">Arial</option>
  <option value="sans-serif">Standard Sans-Serif</option>
</select>

            </label>
            <label>
  Schriftgröße der Überschrift (in px):
  <input
    type="number"
    min="8"
    max="60"
    className="w-full p-2 border"
    value={parseInt(headingFontSize)}
    onChange={(e) => setHeadingFontSize(`${e.target.value}px`)}
  />
</label>


            <fieldset className="border p-4 rounded space-y-2">
            
              <legend className="font-semibold">Überschrift-Stil</legend>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={headingStyles.bold}
                  onChange={(e) => setHeadingStyles({ ...headingStyles, bold: e.target.checked })}
                />
                Fett
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={headingStyles.italic}
                  onChange={(e) => setHeadingStyles({ ...headingStyles, italic: e.target.checked })}
                />
                Kursiv
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={headingStyles.underline}
                  onChange={(e) => setHeadingStyles({ ...headingStyles, underline: e.target.checked })}
                />
                Unterstrichen
              </label>
            </fieldset>
          </div>
        )}

        {activeTab === "layout" && (
          <div className="grid gap-4">
            <label>
            Design-Stil-Widget:
            <select
              className="w-full p-2 border"
              value={widgetStylePreset}
              onChange={(e) => setWidgetStylePreset(e.target.value)}
            >
              <option value="classic">Classic</option>
              <option value="glass">Glass Look</option>
              <option value="flat">Minimal Flat</option>
            </select>
          </label>
            <label>
            Design-Stil-Cards:
            <select className="w-full p-2 border" value={stylePreset} onChange={(e) => setStylePreset(e.target.value)}>
              <option value="classic">Classic Shadow</option>
              <option value="glass">Glass Look</option>
              <option value="flat">Minimal Flat</option>
            </select>
          </label>

          <label>
  Widget-Abrundung (in px):
  <input
    type="number"
    min="0"
    max="60"
    className="w-full p-2 border"
    value={parseInt(radius)}
    onChange={(e) => setRadius(`${e.target.value}px`)}
  />
</label>

<label>
  Bewertungsboxen-Abrundung (in px):
  <input
    type="number"
    min="0"
    max="60"
    className="w-full p-2 border"
    value={parseInt(boxRadius)}
    onChange={(e) => setBoxRadius(`${e.target.value}px`)}
  />
</label>

          </div>
        )}

        {activeTab === "branding" && (
          <div className="grid gap-4">
            <label>
  Widget-Titel:
  <input
    type="text"
    className="w-full p-2 border"
    value={customTitle}
    onChange={(e) => setCustomTitle(e.target.value)}
    placeholder="Unsere Kundenbewertungen"
  />
</label>

            <label>
              Logo-URL:
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
  <button
    className="px-6 py-2 bg-gray-200 text-sm rounded hover:bg-gray-300 transition"
    onClick={() => {
      setColor("#f8f8f8");
      setAccentColor("#ffffff");
      setTextColor("#000000");
      setFont("Inter, sans-serif");
      setRadius("16px");
      setBoxRadius("16px");
      setLogoUrl("");
      setHeadingStyles({ bold: false, italic: false, underline: false, color: "#000000" });
    }}
  >
    Zurücksetzen auf Standardwerte
  </button>
</div>


    </div>

    <div className="w-full max-w-2xl bg-white p-6 mt-12 rounded-xl shadow-md text-center">
        <h2 className="text-lg font-semibold mb-4 text-center">Ihr Embed-Code</h2>
        <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto text-left">{scriptCode}</pre>
        <button
          className="mt-4 px-6 py-2 bg-black text-white font-semibold rounded-lg hover:bg-[#4F46E5] transition"
          onClick={() => {
            navigator.clipboard.writeText(scriptCode);
            alert("Embed-Code wurde kopiert!");
          }}
        >
          Embed-Code kopieren
        </button>
      </div>
    </div>
  );
}
