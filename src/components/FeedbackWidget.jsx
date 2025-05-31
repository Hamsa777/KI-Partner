// src/pages/EmbedWidget.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FeedbackWidget from "../components/FeedbackWidget"; // ggf. Pfad anpassen

export default function EmbedWidget() {
  const { firmaId } = useParams();
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!firmaId) return;

    fetch(`https://feedback.ki-partner24.de/feedback-api/config-json/${firmaId}.json`)
      .then((res) => res.json())
      .then((data) => {
        setConfig(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Fehler beim Laden der Config:", err);
        setConfig(null);
        setLoading(false);
      });
  }, [firmaId]);

  if (!firmaId) {
    return <p style={{ padding: 20, color: "red" }}>❌ Keine firmaId angegeben.</p>;
  }

  if (loading || !config) {
    return <p style={{ padding: 20 }}>Lade Widget...</p>;
  }

  return (
    <div className="bg-transparent p-0 m-0">
      <FeedbackWidget firmaId={firmaId} config={config} />
    </div>
  );
}
