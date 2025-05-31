import { useParams } from "react-router-dom";
import FeedbackWidget from "../components/FeedbackWidget";
import { useEffect, useState } from "react";

console.log("✅ EmbedPage wurde geladen");

export default function EmbedPage() {
  const { firmaId } = useParams();
  const [config, setConfig] = useState(null);

  useEffect(() => {
    console.log("📦 Aktuelle firmaId:", firmaId);
    if (!firmaId) return;

    const url = `https://feedback.ki-partner24.de/feedback-api/config-json/${firmaId}.json`;
    console.log("🌍 Config abrufen von:", url);

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`❌ HTTP ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("✅ Config erfolgreich geladen:", data);
        setConfig(data);
      })
      .catch((err) => {
        console.error("❌ Fehler beim Laden der Config:", err);
        setConfig(null);
      });
  }, [firmaId]);

  if (!config) {
    return <p style={{ padding: 20 }}>📡 Lade Konfiguration...</p>;
  }

  return (
    <div className="bg-transparent p-0 m-0">
      <FeedbackWidget firmaId={firmaId} config={config} />
    </div>
  );
}
