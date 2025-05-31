import React, { useEffect, useState, useRef } from "react";
import FeedbackCard from "./feedbackwidget/FeedbackCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function FeedbackWidget({ firmaId, config: configFromProps }) {
  const [config, setConfig] = useState(configFromProps || {});
  const [bewertungen, setBewertungen] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);

  // 👉 Config aus Props übernehmen (Editor)
  useEffect(() => {
    if (configFromProps) {
      setConfig(configFromProps);
    }
  }, [configFromProps]);

  // 👉 Config vom Server laden (nur wenn keine Props übergeben)
  useEffect(() => {
    if (configFromProps || !firmaId) return;

    fetch(`https://feedback.ki-partner24.de/api/config/${firmaId}`)
      .then((res) => res.json())
      .then((data) => setConfig(data))
      .catch((err) => console.error("❌ Fehler beim Laden der Config:", err));
  }, [firmaId, configFromProps]);

  // 👉 Bewertungen laden
  useEffect(() => {
    if (!firmaId) return;

    const url = `https://feedback.ki-partner24.de/api/feedback/${firmaId}`;

    fetch(url)
      .then(async (res) => {
        const text = await res.text();
        try {
          const json = JSON.parse(text);

          if (!Array.isArray(json)) throw new Error("Antwort ist kein Array");

          if (json.length === 0) {
            setBewertungen([]);
            setLoading(false);
            return;
          }

          const parsed = json.map((entry) => ({
            date: new Date(entry.date).toLocaleDateString("de-DE"),
            name: entry.name,
            rating: parseInt(entry.rating),
            comment: entry.comment,
          }));

          setBewertungen(parsed);
          setLoading(false);
        } catch (err) {
          console.error("❌ Ungültiges JSON:", err.message, text);
          setError("Fehler beim Lesen der Feedback-Daten.");
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("❌ Fetch-Fehler:", err);
        setError("Fehler beim Abrufen der Feedback-Daten.");
        setLoading(false);
      });
  }, [firmaId]);

  // 👉 Design-Konfiguration entpacken
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
  } = config;

  const widgetClasses = [
    "mx-auto space-y-4 p-4 relative transition-all",
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

  const scrollByCard = (direction = "right") => {
    const container = containerRef.current;
    if (!container) return;
    const cardWidth = 260;
    const gap = 16;
    const scrollAmount = direction === "right" ? cardWidth + gap : -(cardWidth + gap);
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  // 👉 Zustände anzeigen
  if (error) return <p className="text-red-500">{error}</p>;
  if (loading) return <p className="text-gray-500 text-sm">Lade Feedback...</p>;
  if (bewertungen.length === 0) return <p className="text-gray-500 text-sm">Noch keine Bewertungen vorhanden.</p>;

  return (
    <div
      className={widgetClasses}
      style={{ backgroundColor: color, fontFamily: font, borderRadius: radius, maxWidth: "900px" }}
    >
      <div className="relative flex justify-center items-center">
        <h2 className="text-3xl text-center" style={headingStyle}>
          {customTitle}
        </h2>
        {logoUrl && <img src={logoUrl} alt="Logo" className="absolute right-0 h-10" />}
      </div>

      <div className="relative w-[812px] mx-auto flex items-center">
        <button
          onClick={() => scrollByCard("left")}
          className="absolute left-[-32px] z-10 p-2 rounded-full shadow hover:scale-110 transition"
          style={{ backgroundColor: arrowBgColor }}
        >
          <ChevronLeft color={arrowColor} />
        </button>

        <div
          ref={containerRef}
          className="flex gap-4 overflow-hidden snap-x snap-mandatory"
          style={{ scrollBehavior: "smooth", width: "812px" }}
        >
          {bewertungen.map((review, i) => (
            <div key={i} className="min-w-[260px] max-w-[260px] flex-shrink-0 snap-start">
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
          className="absolute right-[-32px] z-10 p-2 rounded-full shadow hover:scale-110 transition"
          style={{ backgroundColor: arrowBgColor }}
        >
          <ChevronRight color={arrowColor} />
        </button>
      </div>

      <div className="text-center text-[14px] text-gray-400 mt-0 mb-0 leading-none">
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
