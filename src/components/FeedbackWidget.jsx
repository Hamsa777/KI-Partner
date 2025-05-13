import React, { useEffect, useState, useRef } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Star } from "lucide-react";

export default function FeedbackWidget({ firmaId }) {
  const [bewertungen, setBewertungen] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);
  const scrollIntervalRef = useRef(null);

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

          setBewertungen(
            data.map((entry) => ({
              date: new Date(entry[0]).toLocaleDateString("de-DE"),
              name: entry[1],
              rating: parseInt(entry[2]),
              comment: entry[3],
            }))
          );
        } catch (err) {
          console.error("❌ JSON Parse Error oder ungültige Struktur:", err, text);
          setError("❌ Keine gültigen Feedback-Daten erhalten.");
        } finally {
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("❌ Fetch-Fehler:", err);
        setError("❌ Fehler beim Abrufen der Bewertungen.");
        setLoading(false);
      });
  }, [firmaId]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const startScroll = () => {
      scrollIntervalRef.current = setInterval(() => {
        container.scrollBy({ left: 1, behavior: "smooth" });
      }, 20);
    };

    const stopScroll = () => {
      clearInterval(scrollIntervalRef.current);
    };

    startScroll();

    container.addEventListener("mouseenter", stopScroll);
    container.addEventListener("mouseleave", startScroll);

    return () => {
      stopScroll();
      container.removeEventListener("mouseenter", stopScroll);
      container.removeEventListener("mouseleave", startScroll);
    };
  }, [bewertungen]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (loading) return <p className="text-gray-500 text-sm">Lade Feedback...</p>;

  return (
    <div className="max-w-5xl mx-auto space-y-4 p-4 bg-white rounded-2xl shadow-xl overflow-hidden">
      <h2 className="text-xl font-bold text-center">Unsere Kundenbewertungen</h2>
      <div
        ref={containerRef}
        className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide"
        style={{ scrollBehavior: "smooth" }}
      >
        {bewertungen.map((review, i) => (
          <div key={i} className="min-w-[300px] flex-shrink-0">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-semibold">{review.name}</p>
                  <div className="flex items-center">
                    {Array.from({ length: 5 }, (_, index) => (
                      <Star
                        key={index}
                        className={`h-4 w-4 ${index < review.rating ? "text-yellow-500" : "text-gray-300"}`}
                        fill={index < review.rating ? "currentColor" : "none"}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-800 italic">"{review.comment}"</p>
                <p className="text-xs text-right text-gray-400 mt-2">{review.date}</p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
      <div className="text-center text-[14px] text-gray-400 mt-0 mb-0 leading-none">
  <a href="https://www.ki-partner24.de" target="_blank" rel="noopener noreferrer" className="hover:underline">
    powered by KI-Partner
  </a>
</div>


    </div>
  );
}
