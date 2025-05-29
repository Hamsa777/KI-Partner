import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FeedbackWidget from "./FeedbackWidget"; // gleiche Ebene!

export default function EmbedWidget1() {
  const { firmaId } = useParams();
  const [config, setConfig] = useState(null);

  useEffect(() => {
    if (!firmaId) return;
    fetch(`https://feedback.ki-partner24.de/api/config/${firmaId}`)
      .then((res) => res.json())
      .then(setConfig)
      .catch(() => setConfig(null));
  }, [firmaId]);

  if (!config) {
    return (
      <div className="p-4 text-center text-gray-600 text-sm">
        Lade Widget...
      </div>
    );
  }

  return (
    <div className="p-4">
      <FeedbackWidget firmaId={firmaId} config={config} />
    </div>
  );
}
