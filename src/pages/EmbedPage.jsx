// ✅ EmbedPage.jsx – lädt live Bewertungen + Design aus URL-Parametern
import React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import FeedbackWidget from "../components/FeedbackWidget";

export default function EmbedPage() {
  const { firmaId } = useParams();
  const [searchParams] = useSearchParams();

  if (!firmaId) return <p style={{ padding: 20, color: "red" }}>❌ Keine firmaId in der URL.</p>;

  const config = {
    color: searchParams.get("color") || "#ffffff",
    accentColor: searchParams.get("accentColor") || "#f8f8f8",
    font: searchParams.get("font") || "Inter, sans-serif",
    radius: searchParams.get("radius") || "16px",
    boxRadius: searchParams.get("boxRadius") || "16px",
    customTitle: searchParams.get("customTitle") || "Unsere Kundenbewertungen",
    logoUrl: searchParams.get("logoUrl") || "",
    headingFontSize: searchParams.get("headingFontSize") || "24px",
    arrowColor: searchParams.get("arrowColor") || "#000",
    arrowBgColor: searchParams.get("arrowBgColor") || "#fff",
    widgetStylePreset: searchParams.get("widgetStylePreset") || "classic",
    stylePreset: searchParams.get("stylePreset") || "classic",
    textColor: searchParams.get("textColor") || "#000",
    headingStyles: {
      bold: searchParams.get("headingBold") === "true",
      italic: searchParams.get("headingItalic") === "true",
      underline: searchParams.get("headingUnderline") === "true",
      color: searchParams.get("headingColor") || "#000000"
    }
  };

  return (
    <div className="bg-transparent p-0 m-0">
      <FeedbackWidget firmaId={firmaId} config={config} />
    </div>
  );
}
