import { useParams } from "react-router-dom";
import FeedbackWidget from "../components/FeedbackWidget";
import { useEffect, useState } from "react";
console.log("✅ EmbedPage wurde geladen");

export default function EmbedPage() {
  const { firmaId } = useParams();
  const [config, setConfig] = useState(null);

  useEffect(() => {
    if (!firmaId) return;

    fetch(`https://feedback.ki-partner24.de/feedback-api/config-json/${firmaId}.json`)
      .then((res) => res.json())
      .then(setConfig)
      .catch((err) => {
        console.error("❌ Fehler beim Laden der Config:", err);
        setConfig(null);
      });
  }, [firmaId]);

  if (!config) return <p style={{ padding: 20 }}>Lade Konfiguration...</p>;

  return (
    <div className="bg-transparent p-0 m-0">
      <FeedbackWidget firmaId={firmaId} config={config} />
    </div>
  );
}
