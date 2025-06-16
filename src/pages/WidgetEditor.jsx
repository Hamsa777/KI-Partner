import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FeedbackWidget from "../components/FeedbackWidget";
import GoogleFontSelector from "../components/GoogleFontSelector"; // Pfad ggf. anpassen

export default function WidgetEditor() {
  const { firmaId } = useParams();
  const navigate = useNavigate();
  const [color, setColor] = useState("#ffffff");
  const [accentColor, setAccentColor] = useState("#f3f4f6");
  const [textColor, setTextColor] = useState("#111827");
  const [font, setFont] = useState("Inter");
  const [textFontSize, setTextFontSize] = useState("16px");
  const [radius, setRadius] = useState("35px");
  const [boxRadius, setBoxRadius] = useState("35px");
  const [customTitle, setCustomTitle] = useState("Das sagen unsere Kunden");
  const [logoUrl, setLogoUrl] = useState("");
  const [headingFontSize, setHeadingFontSize] = useState("29px");
  const [arrowColor, setArrowColor] = useState("#ffffff");
  const [arrowBgColor, setArrowBgColor] = useState("#111827");
  const [widgetStylePreset, setWidgetStylePreset] = useState("glass");
  const [stylePreset, setStylePreset] = useState("flat");
  const [backgroundImageUrl, setBackgroundImageUrl] = useState("");
  const [visibleCards, setVisibleCards] = useState(3);
  const [serverConfig, setServerConfig] = useState(null);
  const [logoSize, setLogoSize] = useState("60px");
  const [backgroundImagePosition, setBackgroundImagePosition] = useState({ x: 50, y: 50 });
  const [mobileHeadingFontSize, setMobileHeadingFontSize] = useState("23px");
  const [mobileLogoSize, setMobileLogoSize] = useState("40px");
  const [mobileCustomTitle, setMobileCustomTitle] = useState("");
  const [logoPosition, setLogoPosition] = useState("right");       // Desktop
const [mobileLogoPosition, setMobileLogoPosition] = useState("right"); // Mobile
const [cardLayout, setCardLayout] = useState("default");



  const [headingStyles, setHeadingStyles] = useState({
    bold: true,
    italic: false,
    underline: false,
    weight: 700,
    color: "#111827",
  });

  const [activeTab, setActiveTab] = useState("colors");

  // Google Font dynamisch nachladen
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

  // Config von Server laden
  useEffect(() => {
    if (!firmaId) return;

    fetch(`https://feedback.ki-partner24.de/feedback-api/config-json/${firmaId}.json`)
      .then((res) => {
        if (!res.ok) {
          navigate("/404");
          throw new Error("Firma nicht gefunden");
        }
        return res.json();
      })
      .then((data) => {
        if (!data) return;
        setServerConfig(data);
        setLogoSize(data.logoSize ?? "60px");
        setColor(data.color ?? "#ffffff");
        setAccentColor(data.accentColor ?? "#f3f4f6");
        setTextColor(data.textColor ?? "#111827");
        setFont(typeof data.font === "string" ? data.font : "Inter");
        setRadius(data.radius ?? "35px");
        setBoxRadius(data.boxRadius ?? "35px");
        setCustomTitle(data.customTitle ?? "Das sagen unsere Kunden");
        setLogoUrl(data.logoUrl ?? "");
        setHeadingFontSize(data.headingFontSize ?? "29px");
        setArrowColor(data.arrowColor ?? "#ffffff");
        setArrowBgColor(data.arrowBgColor ?? "#111827");
        setWidgetStylePreset(data.widgetStylePreset ?? "glass");
        setStylePreset(data.stylePreset ?? "flat");
        setBackgroundImageUrl(data.backgroundImageUrl ?? "");
        setBackgroundImagePosition(data.backgroundImagePosition ?? { x: 50, y: 50 });
        setVisibleCards(data.visibleCards ?? 3);
        setMobileHeadingFontSize(data.mobileHeadingFontSize ?? "23px");
        setMobileLogoSize(data.mobileLogoSize ?? "40px");
        setMobileCustomTitle(data.mobileCustomTitle ?? "");
        setLogoPosition(data.logoPosition ?? "right");
        setMobileLogoPosition(data.mobileLogoPosition ?? "right");
        setCardLayout(data.cardLayout ?? "default");



        setHeadingStyles({
          bold: data.headingStyles?.bold ?? true,
          italic: data.headingStyles?.italic ?? false,
          underline: data.headingStyles?.underline ?? false,
          color: data.headingStyles?.color ?? "#111827",
          weight: data.headingStyles?.weight ?? 700,
        });
      })
      .catch((err) => {
        console.error("❌ Fehler beim Laden der Config:", err);
      });
  }, [firmaId, navigate]);

  // Vorschau-Logik für visibleCards: Nur für die Live-Vorschau im Editor manipulieren!
  const liveVisibleCards = activeTab === "mobile" ? 1 : visibleCards;

  const liveConfig = {
    color,
    accentColor,
    font,
    textFontSize,
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
    backgroundImagePosition,
    visibleCards: liveVisibleCards, // <--- nur Vorschau, State bleibt erhalten!
    setBackgroundImagePosition,
    mobileHeadingFontSize,
    mobileLogoSize,
    mobileCustomTitle,
    logoPosition,
  mobileLogoPosition,
  cardLayout,
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
      <h1 className="text-2xl font-bold mb-10 text-center">Ihr personalisiertes Feedbackwidget</h1>

      <div className="w-full max-w-2xl">
        <div className="flex justify-center space-x-4 mb-6 border-b">
          {["colors", "font", "layout", "branding", "mobile"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 ${activeTab === tab ? "border-b-2 border-black font-semibold" : "text-gray-500"}`}
            >
              {{
                colors: "Farben",
                font: "Schrift",
                layout: "Layout",
                branding: "Branding",
                mobile: "Mobilgerät",
              }[tab]}
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
            <label>Hintergrundbild-URL (empfohlen):
              <input
                type="text"
                className="w-full p-2 border"
                placeholder="https://example.com/bg.jpg"
                value={backgroundImageUrl}
                onChange={(e) => setBackgroundImageUrl(e.target.value)}
              />
            </label>
          </div>
        )}

        {activeTab === "font" && (
          <div className="grid gap-4">
            <label>Schriftart:
              <GoogleFontSelector font={font} setFont={setFont} />
            </label>
            <label>Schriftgröße Überschrift:
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
                  onChange={(e) =>
                    setHeadingStyles({ ...headingStyles, bold: e.target.checked })
                  }
                />
                Fett
              </label>
              {headingStyles.bold && (
                <label>Schriftgewicht:
                  <select
                    className="w-full p-2 border"
                    value={headingStyles.weight ?? 700}
                    onChange={(e) =>
                      setHeadingStyles({
                        ...headingStyles,
                        weight: parseInt(e.target.value),
                      })
                    }
                  >
                    {[500, 600, 700, 800, 900].map((w) => (
                      <option key={w} value={w}>{w}</option>
                    ))}
                  </select>
                </label>
              )}
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={headingStyles.italic}
                  onChange={(e) =>
                    setHeadingStyles({ ...headingStyles, italic: e.target.checked })
                  }
                />
                Kursiv
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={headingStyles.underline}
                  onChange={(e) =>
                    setHeadingStyles({ ...headingStyles, underline: e.target.checked })
                  }
                />
                Unterstrichen
              </label>
            </fieldset>
            <label className="block font-medium mb-1">
              Schriftgröße für Text (px):
              <input
                type="number"
                min="10"
                max="20"
                className="w-full p-2 border"
                value={parseInt(textFontSize)}
                onChange={(e) => setTextFontSize(`${e.target.value}px`)}
              />
            </label>
          </div>
        )}

        {activeTab === "layout" && (
          <div className="grid gap-4">
            <label>Widget-Stil:
              <select className="w-full p-2 border" value={widgetStylePreset} onChange={(e) => setWidgetStylePreset(e.target.value)}>
                <option value="classic">Classic Shadow</option>
                <option value="glass">Glass Look</option>
                <option value="flat">Minimal Flat</option>
              </select>
            </label>
            <label>Box-Stil:
              <select
                className="w-full p-2 border"
                value={stylePreset}
                onChange={(e) => setStylePreset(e.target.value)}
              >
                <option value="classic">Classic Shadow</option>
                <option value="glass">Glass Look</option>
                <option value="flat">Minimal Flat</option>
                <option value="transparent">Transparent</option>
              </select>
            </label>
            <label>Design der Feedback-Karten:
              <select
                className="w-full p-2 border"
                value={cardLayout}
                onChange={(e) => setCardLayout(e.target.value)}
              >
                <option value="default">Standard (klassisch)</option>
      
                <option value="review-modern">Review Modern</option>
                <option value="social-style">Social Style</option>
              </select>
            </label>
            <label>Widget-Abrundung:
              <input type="number" min="0" max="60" className="w-full p-2 border" value={parseInt(radius)} onChange={(e) => setRadius(`${e.target.value}px`)} />
            </label>
            <label>Box-Abrundung:
              <input type="number" min="0" max="60" className="w-full p-2 border" value={parseInt(boxRadius)} onChange={(e) => setBoxRadius(`${e.target.value}px`)} />
            </label>
            <label>Anzahl sichtbarer Bewertungen:
              <select
                className="w-full p-2 border"
                value={visibleCards}
                onChange={(e) => setVisibleCards(Number(e.target.value))}
              >
                {[1, 2, 3, 4].map((num) => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </label>
          </div>
        )}

        {activeTab === "branding" && (
          <div className="grid gap-4">
            <label>Widget-Titel:
              <input type="text" className="w-full p-2 border" value={customTitle} onChange={(e) => setCustomTitle(e.target.value)} />
            </label>
            <label>Logo-URL:
              <input
                type="text"
                className="w-full p-2 border"
                value={logoUrl}
                onChange={(e) => setLogoUrl(e.target.value)}
              />
            </label>
            <label>Logo-Position (Desktop):
      <select
        className="w-full p-2 border"
        value={logoPosition}
        onChange={e => setLogoPosition(e.target.value)}
      >
        <option value="left">Links</option>
        <option value="center">Zentriert</option>
        <option value="right">Rechts</option>
      </select>
    </label>
            <label>Logo-Größe (px):
              <input
                type="number"
                min="10"
                max="200"
                className="w-full p-2 border"
                value={parseInt(logoSize)}
                onChange={(e) => setLogoSize(`${e.target.value}px`)}
              />
            </label>
          </div>
        )}

        {activeTab === "mobile" && (
          <div className="grid gap-4">
            <label>Mobile Überschrift:
      <input
        type="text"
        className="w-full p-2 border"
        value={mobileCustomTitle}
        onChange={(e) => setMobileCustomTitle(e.target.value)}
        placeholder="Mobile Überschrift (optional)"
      />
    </label>
            <label>Mobilgröße Überschrift:
              <input
                type="number"
                min="10"
                max="40"
                name="mobileHeadingFontSize"
                autoComplete="off"
                className="w-full p-2 border"
                value={parseInt(mobileHeadingFontSize)}
                onChange={(e) => setMobileHeadingFontSize(`${e.target.value}px`)}
              />
            </label>
            <label>Mobilgröße Logo:
              <input
                type="number"
                min="10"
                max="100"
                name="mobileLogoSize"
                autoComplete="off"
                className="w-full p-2 border"
                value={parseInt(mobileLogoSize)}
                onChange={(e) => setMobileLogoSize(`${e.target.value}px`)}
              />
            </label>
             <label>Logo-Position (Mobil):
      <select
        className="w-full p-2 border"
        value={mobileLogoPosition}
        onChange={e => setMobileLogoPosition(e.target.value)}
      >
        <option value="left">Links</option>
        <option value="center">Zentriert</option>
        <option value="right">Rechts</option>
      </select>
    </label>
          </div>
        )}
      </div>

      <div className="w-full overflow-x-auto mt-12">
        <h2 className="text-lg font-semibold mb-4 text-center">Live-Vorschau Ihres Widgets</h2>
        <div className="min-w-fit mx-auto">
          <FeedbackWidget firmaId={firmaId} config={liveConfig} editorMode={true} activeTab={activeTab} cardLayout="Standard (klassisch)"  />
        </div>
        <div className="mt-6 flex justify-center">
          <button
            className="px-6 py-2 bg-gray-200 text-sm rounded hover:bg-gray-300 transition"
            onClick={async () => {
              try {
                const res = await fetch(`https://feedback.ki-partner24.de/feedback-api/config-json/${firmaId}.json`);
                if (!res.ok) throw new Error("Fehler beim Laden der Serverdaten");
                const data = await res.json();
                setLogoSize(data.logoSize ?? "60px");
                setColor(data.color ?? "#ffffff");
                setAccentColor(data.accentColor ?? "#f3f4f6");
                setTextColor(data.textColor ?? "#111827");
                setFont(typeof data.font === "string" ? data.font : "Inter");
                setRadius(data.radius ?? "35px");
                setBoxRadius(data.boxRadius ?? "35px");
                setCustomTitle(data.customTitle ?? "Das sagen unsere Kunden");
                setLogoUrl(data.logoUrl ?? "");
                setHeadingFontSize(data.headingFontSize ?? "29px");
                setArrowColor(data.arrowColor ?? "#ffffff");
                setArrowBgColor(data.arrowBgColor ?? "#111827");
                setWidgetStylePreset(data.widgetStylePreset ?? "glass");
                setStylePreset(data.stylePreset ?? "flat");
                setBackgroundImageUrl(data.backgroundImageUrl ?? "");
                setVisibleCards(data.visibleCards ?? 3);
                setHeadingStyles({
                  bold: data.headingStyles?.bold ?? true,
                  italic: data.headingStyles?.italic ?? false,
                  underline: data.headingStyles?.underline ?? false,
                  color: data.headingStyles?.color ?? "#111827",
                  weight: data.headingStyles?.weight ?? 700,
                });
                setBackgroundImagePosition(data.backgroundImagePosition ?? { x: 50, y: 50 });
                alert("✅ Server-Konfiguration wurde geladen!");
              } catch (error) {
                console.error("Fehler beim Zurücksetzen:", error);
                alert("❌ Fehler beim Zurücksetzen auf Serverdaten");
              }
            }}
          >
            Zurücksetzen auf zuletzt gespeichert
          </button>
        </div>
      </div>

      <button
        className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-900 transition"
        onClick={async () => {
          try {
            const configToSave = {
              color,
              accentColor,
              font,
              textFontSize,
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
              visibleCards, // nur der echte Wert!
              backgroundImagePosition,
              mobileHeadingFontSize,
              mobileLogoSize,
              mobileCustomTitle,
              logoPosition,
              mobileLogoPosition,
              cardLayout
            };
            const response = await fetch(`https://feedback.ki-partner24.de/feedback-api/config-json/${firmaId}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(configToSave),
            });
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
