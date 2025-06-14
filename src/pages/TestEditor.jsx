import React, { useEffect, useState } from "react";
import FeedbackWidget from "../components/FeedbackWidget";
import GoogleFontSelector from "../components/GoogleFontSelector";
import sampleData from "../assets/sampleData.json";
import { Link as MotionLink } from "react-router-dom"; 
import { motion } from "framer-motion"; 

export default function TestEditor() {
  const [color, setColor] = useState("#ffffff");
  const [accentColor, setAccentColor] = useState("#f3f4f6");
  const [textColor, setTextColor] = useState("#111827");
  const [font, setFont] = useState("Inter");
  const [radius, setRadius] = useState("35px");
  const [boxRadius, setBoxRadius] = useState("35px");
  const [customTitle, setCustomTitle] = useState("Das sagen unsere Kunden");
  const [logoUrl, setLogoUrl] = useState("");
  const [logoSize, setLogoSize] = useState("60px");
  const [headingFontSize, setHeadingFontSize] = useState("29px");
  const [arrowColor, setArrowColor] = useState("#ffffff");
  const [arrowBgColor, setArrowBgColor] = useState("#111827");
  const [widgetStylePreset, setWidgetStylePreset] = useState("glass");
  const [stylePreset, setStylePreset] = useState("flat");
  const [backgroundImageUrl, setBackgroundImageUrl] = useState("");
  const [visibleCards, setVisibleCards] = useState(3);
  const [activeTab, setActiveTab] = useState("colors");
  const [textFontSize, setTextFontSize] = useState("15px");

  const [headingStyles, setHeadingStyles] = useState({
    bold: true,
    italic: false,
    underline: false,
    weight: 700,
    color: "#111827",
  });

  useEffect(() => {
    if (!font) return;
    const fontUrl = `https://fonts.googleapis.com/css2?family=${font.replace(/ /g, '+')}:wght@500;600;700;800;900&display=swap`;
    const existing = document.getElementById("dynamic-font");
    if (existing) existing.remove();
    const link = document.createElement("link");
    link.id = "dynamic-font";
    link.rel = "stylesheet";
    link.href = fontUrl;
    document.head.appendChild(link);
  }, [font]);

  const liveConfig = {
    color,
    accentColor,
    font,
    radius,
    logoUrl,
    logoSize,
    boxRadius,
    headingStyles,
    textColor,
    headingFontSize,
    customTitle,
    arrowColor,
    arrowBgColor,
    widgetStylePreset,
    stylePreset,
    backgroundImageUrl,
    visibleCards,
    textFontSize,
  };

  return (
     <div className="min-h-screen bg-gray-50 p-10 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-10 text-center">Feedbackwidget Testversion</h1>

      <div className="w-full max-w-2xl">
        <div className="flex justify-center space-x-4 mb-6 border-b">
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
            <label>Hintergrundbild-URL (empfohlen):<input type="text" className="w-full p-2 border" value={backgroundImageUrl} onChange={(e) => setBackgroundImageUrl(e.target.value)} /></label>
          </div>
        )}

        {activeTab === "font" && (
          <div className="grid gap-4">
            <label>Schriftart:<GoogleFontSelector font={font} setFont={setFont} /></label>
            <label>Schriftgröße Überschrift:<input type="number" min="8" max="60" className="w-full p-2 border" value={parseInt(headingFontSize)} onChange={(e) => setHeadingFontSize(`${e.target.value}px`)} /></label>
            <fieldset className="border p-4 rounded space-y-2">
              <legend className="font-semibold">Überschrift-Stil</legend>
              <label className="flex items-center gap-2"><input type="checkbox" checked={headingStyles.bold} onChange={(e) => setHeadingStyles({ ...headingStyles, bold: e.target.checked })} /> Fett</label>
              {headingStyles.bold && (<label>Schriftgewicht:<select className="w-full p-2 border" value={headingStyles.weight ?? 700} onChange={(e) => setHeadingStyles({ ...headingStyles, weight: parseInt(e.target.value) })}>{[500, 600, 700, 800, 900].map((w) => (<option key={w} value={w}>{w}</option>))}</select></label>)}
              <label className="flex items-center gap-2"><input type="checkbox" checked={headingStyles.italic} onChange={(e) => setHeadingStyles({ ...headingStyles, italic: e.target.checked })} /> Kursiv</label>
              <label className="flex items-center gap-2"><input type="checkbox" checked={headingStyles.underline} onChange={(e) => setHeadingStyles({ ...headingStyles, underline: e.target.checked })} /> Unterstrichen</label>
            </fieldset>
            <label>Schriftgröße Bewertungstext:
            <input
              type="number"
              min="8"
              max="40"
              className="w-full p-2 border"
              value={parseInt(textFontSize)}
              onChange={(e) => setTextFontSize(`${e.target.value}px`)}
            />
</label>

          </div>
        )}

        {activeTab === "layout" && (
          <div className="grid gap-4">
            <label>Widget-Stil:<select className="w-full p-2 border" value={widgetStylePreset} onChange={(e) => setWidgetStylePreset(e.target.value)}><option value="classic">Classic Shadow</option><option value="glass">Glass Look</option><option value="flat">Minimal Flat</option></select></label>
            <label>Box-Stil:<select className="w-full p-2 border" value={stylePreset} onChange={(e) => setStylePreset(e.target.value)}><option value="classic">Classic Shadow</option><option value="glass">Glass Look</option><option value="flat">Minimal Flat</option> <option value="transparent">Transparent</option> {/* ✅ NEU */}</select></label>
            <label>Widget-Abrundung:<input type="number" min="0" max="60" className="w-full p-2 border" value={parseInt(radius)} onChange={(e) => setRadius(`${e.target.value}px`)} /></label>
            <label>Box-Abrundung:<input type="number" min="0" max="60" className="w-full p-2 border" value={parseInt(boxRadius)} onChange={(e) => setBoxRadius(`${e.target.value}px`)} /></label>
            <label>Anzahl sichtbarer Bewertungen:<select className="w-full p-2 border" value={visibleCards} onChange={(e) => setVisibleCards(Number(e.target.value))}>{[1, 2, 3, 4].map((num) => (<option key={num} value={num}>{num}</option>))}</select></label>
          </div>
        )}

        {activeTab === "branding" && (
          <div className="grid gap-4">
            <label>Widget-Titel:<input type="text" className="w-full p-2 border" value={customTitle} onChange={(e) => setCustomTitle(e.target.value)} /></label>
            <label>Logo-URL:<input type="text" className="w-full p-2 border" value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} /></label>
            <label>Logo-Größe (px):<input type="number" min="10" max="200" className="w-full p-2 border" value={parseInt(logoSize)} onChange={(e) => setLogoSize(`${e.target.value}px`)} /></label>
          </div>
        )}
      </div>

      <div className="w-full overflow-x-auto mt-12">
        <h2 className="text-lg font-semibold mb-4 text-center">Live-Vorschau Ihres Widgets</h2>
        <div className="min-w-fit mx-auto">
          <FeedbackWidget config={liveConfig} feedback={sampleData} />
        </div>
        <p className="text-center text-yellow-600 mt-6">⚠️ Hinweis: Änderungen werden hier nur getestet und <strong>nicht gespeichert</strong>.</p>
      </div>
     <div className="mt-4 text-center">

  <motion.a
  href="https://buy.stripe.com/8wM00Rc7k7kT6Ri7sv"
  target="_blank"
  rel="noopener noreferrer"

    whileHover={{
      scale: 1.02,
      backgroundColor: "#1a237e",
    }}
    transition={{ duration: 0.3, ease: "easeOut" }}
    className="inline-block bg-[#283593] text-white px-6 py-3 rounded-full text-sm sm:text-base font-medium"
  >
    Jetzt kaufen & eigenes Widget sichern
  </motion.a>

  <div className="mt-4">
    <a
      href="/"
      className="text-sm text-gray-500 hover:text-gray-700 underline transition"
    >
      Zurück zur Startseite
    </a>
  </div>
</div>

    </div>
    
  );
}
