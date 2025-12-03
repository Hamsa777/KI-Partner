import React, { useEffect, useState, useRef } from "react";
import FeedbackCard from "./feedbackwidget/FeedbackCard";
import sampleData from "../assets/sampleData.json";

export default function MobileFeedbackWidget({
  firmaId,
  config: propConfig,
  editorMode = false,
}) {
  const [config, setConfig] = useState(null);
  const [bewertungen, setBewertungen] = useState([]);
  const [fontLoaded, setFontLoaded] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (propConfig) {
      setConfig(propConfig);
    } else if (firmaId) {
      const url = `https://feedback.ki-partner24.de/srv/feedback-api/config-json/${firmaId}.json?t=${Date.now()}`;
      fetch(url)
        .then((res) => res.json())
        .then(setConfig)
        .catch((err) => console.error("❌ Fehler beim Laden der Config:", err));
    }
  }, [propConfig, firmaId]);

  useEffect(() => {
    if (!config?.font) return;
    const cleanFont = config.font.trim().replace(/['"]/g, "").split(",")[0];
    const fontName = cleanFont.replace(/ /g, "+");
    const href = `https://fonts.googleapis.com/css2?family=${fontName}:wght@400;500;600;700;800;900&display=swap`;

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

  useEffect(() => {
    if (!firmaId) {
      const parsed = sampleData.map((entry) => ({
        date: new Date(entry.date).toLocaleDateString("de-DE", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
        name: entry.name,
        rating: parseInt(entry.rating),
        comment: entry.comment,
      }));
      setBewertungen(parsed);
      return;
    }

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
        setBewertungen(parsed);
      })
      .catch((err) => console.error("❌ Fehler beim Abrufen der Feedback-Daten:", err));
  }, [firmaId]);

  if (!config || !fontLoaded) return null;

  const {
    font = "Inter, sans-serif",
    customTitle = "Kundenfeedback",
    logoUrl,
    mobileHeadingFontSize = "23px",
    mobileLogoSize = "40px",
    accentColor = "#f8f8f8",
    textFontSize = "14px",
    boxRadius = "16px",
    textColor = "#222",
    stylePreset = "classic",
  } = config;

  const widgetStyle = {
    fontFamily: `'${font}', sans-serif`,
    maxWidth: "100%",
    margin: "0 auto",
    padding: "1rem",
    textAlign: "center",
  };

  const headingStyle = {
    fontSize: mobileHeadingFontSize,
    color: textColor,
    marginBottom: "0.5rem",
  };

  return (
    <div style={widgetStyle}>
      <div className="relative">
        <h2 style={headingStyle}>{customTitle}</h2>
        {logoUrl && (
          <img
            src={logoUrl}
            alt="Logo"
            style={{
              height: mobileLogoSize,
              objectFit: "contain",
              position: "absolute",
              right: 0,
              top: 0,
            }}
          />
        )}
      </div>

      {bewertungen.length > 0 && (
        <div ref={containerRef} className="flex justify-center mt-4">
          <FeedbackCard
            review={bewertungen[bewertungen.length - 1]}
            accentColor={accentColor}
            nameColor={textColor}
            commentColor={textColor}
            dateColor={textColor}
            boxRadius={boxRadius}
            stylePreset={stylePreset}
            textFontSize={textFontSize}
          />
        </div>
      )}

      <div
        className="text-center text-[14px] text-gray-400 mt-4 leading-none"
        style={{ fontFamily: 'system-ui' }}
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
