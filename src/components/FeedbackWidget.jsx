import React, { useEffect, useState, useRef } from "react";
import FeedbackCard from "./feedbackwidget/FeedbackCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function FeedbackWidget({ firmaId, config: propConfig }) {
  const [config, setConfig] = useState(null);
  const [bewertungen, setBewertungen] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fontLoaded, setFontLoaded] = useState(false);
  const containerRef = useRef(null);
  
  
  useEffect(() => {
  if (propConfig) {
    setConfig(propConfig); // Wenn vom Editor übergeben → Vorrang!
  } else if (firmaId) {
    const url = `https://feedback.ki-partner24.de/feedback-api/config-json/${firmaId}.json?t=${Date.now()}`;
    fetch(url)
      .then((res) => res.json())
      .then(setConfig)
      .catch((err) => console.error("❌ Fehler beim Laden der Config:", err));
  }
}, [propConfig, firmaId]);


  // 👉 Font dynamisch laden
  useEffect(() => {
    if (!config?.font) return;

    const cleanFont = config.font.trim().replace(/['"]/g, "").split(",")[0];
    const fontName = cleanFont.replace(/ /g, "+");
    const href = `https://fonts.googleapis.com/css2?family=${fontName}&display=swap`;

    if (document.querySelector(`link[href="${href}"]`)) {
      setFontLoaded(true);
      return;
    }

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    link.onload = () => setFontLoaded(true);
    document.head.appendChild(link);
  }, [config?.font]);

  // 👉 Bewertungen laden
  useEffect(() => {
    if (!firmaId) return;
    const url = `https://feedback.ki-partner24.de/api/feedback/${firmaId}`;

    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        const parsed = json.map((entry) => ({
          date: new Date(entry.date).toLocaleDateString("de-DE", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }),
          name: entry.name,
          rating: parseInt(entry.rating),
          comment: entry.comment,
        }));
        // Doppelte Bewertungen entfernen (nach name + comment + date)
const unique = [];
const seen = new Set();

for (const fb of parsed) {
  const key = `${fb.name}-${fb.comment}-${fb.date}`;
  if (!seen.has(key)) {
    seen.add(key);
    unique.push(fb);
  }
}

setBewertungen(unique);

        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Fehler beim Abrufen der Feedback-Daten:", err);
        setError("Feedback konnte nicht geladen werden.");
        setLoading(false);
      });
  }, [firmaId]);

  // ⛔️ Warten bis Config und Font geladen sind
  if (!config || !fontLoaded) return null;

  const {
    color = "#ffffff",
    accentColor = "#f8f8f8",
    font = "Inter, sans-serif",
    radius = "16px",
    boxRadius = "16px",
    customTitle = "Unsere Kundenbewertungen",
    logoUrl = null,
    theme = "light",
    textColor = theme === "dark" ? "#f5f5f5" : "#222",
    headingStyles = {},
    headingFontSize = "24px",
    headingColor = headingStyles.color || textColor,
    arrowColor = "#000",
    arrowBgColor = "#fff",
    widgetStylePreset = "classic",
    stylePreset = "classic",
    backgroundImageUrl = "",
    visibleCards = 3,
  } = config;

  const cardWidth = 260;
  const gap = 16;
  const visible = Math.min(visibleCards, 4);
  const containerWidth = visible * cardWidth + (visible - 1) * gap;

  const widgetClasses = [
    "space-y-4 p-4 relative transition-all mx-auto",
    widgetStylePreset === "glass"
      ? "bg-white/10 backdrop-blur-md border border-white/20 shadow-lg"
      : widgetStylePreset === "flat"
      ? "bg-transparent border border-gray-200 shadow-none"
      : "bg-white shadow-xl",
  ].join(" ");

  const headingStyle = {
    fontSize: headingFontSize,
    fontWeight: headingStyles.bold ? "bold" : "normal",
    fontStyle: headingStyles.italic ? "italic" : "normal",
    textDecoration: headingStyles.underline ? "underline" : "none",
    color: headingColor,
  };

  const scrollByCard = (dir) => {
    const el = containerRef.current;
    if (!el) return;
    const scroll = dir === "right" ? cardWidth + gap : -(cardWidth + gap);
    el.scrollBy({ left: scroll, behavior: "smooth" });
  };

  if (error) return <p className="text-red-500">{error}</p>;
  if (loading) return <p className="text-gray-500 text-sm">Lade Feedback...</p>;
  if (bewertungen.length === 0) return <p className="text-gray-500 text-sm">Noch keine Bewertungen vorhanden.</p>;

  return (
    <div
      className={widgetClasses}
      style={{
        backgroundColor: backgroundImageUrl ? undefined : color,
        backgroundImage: backgroundImageUrl ? `url(${backgroundImageUrl})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        fontFamily: `'${config.font}', sans-serif`,
        borderRadius: radius,
        maxWidth: `${containerWidth + 80}px`,
      }}
    >
      <div className="relative flex justify-center items-center">
        <h2 className="text-3xl text-center" style={headingStyle}>
          {customTitle}
        </h2>
        {logoUrl && <img src={logoUrl} alt="Logo" className="absolute right-0 h-10" />}
      </div>

      <div className="relative mx-auto" style={{ width: `${containerWidth}px` }}>
        <button
          onClick={() => scrollByCard("left")}
          className="absolute z-10 p-2 rounded-full shadow hover:scale-110 transition"
          style={{
            backgroundColor: arrowBgColor,
            top: "50%",
            left: "-29px",
            transform: "translateY(-50%)",
          }}
        >
          <ChevronLeft color={arrowColor} />
        </button>

        <div
          ref={containerRef}
          className="flex gap-4 overflow-hidden snap-x snap-mandatory"
          style={{
            scrollBehavior: "smooth",
            width: `${containerWidth}px`,
          }}
        >
          {bewertungen.slice().reverse().map((review, i) => (
            <div
              key={i}
              className="flex-shrink-0 snap-start"
              style={{ minWidth: `${cardWidth}px`, maxWidth: `${cardWidth}px` }}
            >
              <FeedbackCard
                review={review}
                accentColor={accentColor}
                nameColor={textColor}
                commentColor={textColor}
                dateColor={textColor}
                boxRadius={boxRadius}
                stylePreset={stylePreset}
              />
            </div>
          ))}
        </div>

        <button
          onClick={() => scrollByCard("right")}
          className="absolute z-10 p-2 rounded-full shadow hover:scale-110 transition"
          style={{
            backgroundColor: arrowBgColor,
            top: "50%",
            right: "-29px",
            transform: "translateY(-50%)",
          }}
        >
          <ChevronRight color={arrowColor} />
        </button>
      </div>

     <div
  className="text-center text-[14px] text-gray-400 mt-0 mb-0 leading-none"
  style={{ fontFamily: 'system-ui' }} // feste Schriftart
>
  <a
    href="https://www.ki-partner24.de"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:underline"
  >
    powered by KI-Partner
  </a>
</div>

    </div>
  );
}
