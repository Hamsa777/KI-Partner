import React, { useEffect, useState } from "react";

const FeedbackWidget = ({ firmaId }) => {
  const [bewertungen, setBewertungen] = useState([]);
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const feedbackRes = await fetch(
          `https://feedback.ki-partner24.de/api/feedback/${firmaId}`
        );
        const feedback = await feedbackRes.json();

        const configRes = await fetch(
          `https://feedback.ki-partner24.de/srv/feedback-api/config-json/${firmaId}.json`
        );
        const cfg = await configRes.json();

        setBewertungen(feedback);
        setConfig(cfg);
        setLoading(false);
      } catch (error) {
        console.error("Fehler beim Laden:", error);
      }
    }

    fetchData();
  }, [firmaId]);

  if (loading || !config) return <div>Lade Feedback...</div>;

  return (
    <div
      style={{
        padding: "10px",
        background: config.background || "#fff",
        borderRadius: config.borderRadius || "8px",
        maxWidth: "600px",
        margin: "0 auto",
        fontFamily: config.fontFamily || "sans-serif",
        color: config.textColor || "#000",
      }}
    >
      {bewertungen.map((b, i) => (
        <div
          key={i}
          style={{
            marginBottom: "12px",
            borderBottom: "1px solid #eee",
            paddingBottom: "8px",
          }}
        >
          <strong>{b.name}: </strong>
          <span>{b.comment}</span>
        </div>
      ))}
    </div>
  );
};

const EmbedIframePage = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const firmaId = queryParams.get("firmaId") || "demo123";

  return <FeedbackWidget firmaId={firmaId} />;
};

export default EmbedIframePage;
