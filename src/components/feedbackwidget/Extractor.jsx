import { useEffect, useState } from "react";

export default function useExtract(firmaId) {
  const [extract, setExtract] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!firmaId) return;
    const fetchExtract = async () => {
      try {
        const response = await fetch(
          `https://feedback.ki-partner24.de/api/extract/${firmaId}.json`
        );
        if (!response.ok) throw new Error("Extract nicht gefunden");
        const data = await response.json();
        setExtract(data.extracted || "");
      } catch (error) {
        console.error("Fehler beim Laden des Extracts:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchExtract();
  }, [firmaId]);

  return { extract, loading };
}
