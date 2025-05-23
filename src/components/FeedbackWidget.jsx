import React, { useEffect, useState, useRef } from "react";
import FeedbackCard from "./feedbackwidget/FeedbackCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function FeedbackWidget({ firmaId, config = {} }) {
  const [bewertungen, setBewertungen] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);

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
    stylePreset = "classic"
  } = config;

  const widgetClasses = [
    "mx-auto space-y-4 p-4 relative transition-all",
    widgetStylePreset === "glass"
      ? "bg-white/10 backdrop-blur-md border border-white/20 shadow-lg"
      : widgetStylePreset === "flat"
      ? "bg-transparent border border-gray-200 shadow-none"
      : "bg-white shadow-xl"
  ].join(" ");

  useEffect(() => {
    if (!firmaId) {
      console.warn("⚠️ Kein firmaId übergeben");
      return;
    }

    const url = `https://hook.eu2.make.com/kk1i3cui6xj9082lkk0wcpvdb9kgthxs?firmaId=${firmaId}`;

    fetch(url)
      .then(async (res) => {
        const text = await res.text();
        try {
          const data = JSON.parse(text);
          if (!Array.isArray(data)) throw new Error("Keine Bewertungsdaten gefunden");

          const parsed = data
            .filter((entry) => entry[0] && entry[1] && entry[2])
            .map((entry) => ({
              date: new Date(entry[0]).toLocaleDateString("de-DE"),
              name: entry[1],
              rating: parseInt(entry[2]),
              comment: entry[3]
            }));

          setBewertungen(parsed);
        } catch (err) {
          console.error("❌ JSON Parse Error:", err, text);
          setError("❌ Fehler beim Lesen der Feedback-Daten.");
        } finally {
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("❌ Fetch-Fehler:", err);
        setError("❌ Fehler beim Abrufen.");
        setLoading(false);
      });
  }, [firmaId]);

  const scrollByCard = (direction = "right") => {
    const container = containerRef.current;
    if (!container) return;
    const cardWidth = 260;
    const gap = 16;
    const scrollAmount = direction === "right" ? cardWidth + gap : -(cardWidth + gap);
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  if (error) return <p className="text-red-500">{error}</p>;
  if (loading) return <p className="text-gray-500 text-sm">Lade Feedback...</p>;

  const headingStyle = {
    fontSize: headingFontSize,
    fontWeight: headingStyles.bold ? "bold" : "normal",
    fontStyle: headingStyles.italic ? "italic" : "normal",
    textDecoration: headingStyles.underline ? "underline" : "none",
    color: headingColor
  };

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
