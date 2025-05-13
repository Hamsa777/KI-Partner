import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

export default function FeedbackWidget({ firmaId }) {
  const [bewertungen, setBewertungen] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (error) return <p className="text-red-500">{error}</p>;
  if (loading) return <p className="text-gray-500 text-sm">Lade Feedback...</p>;

  return (
    <div className="max-w-full overflow-x-auto whitespace-nowrap p-4 bg-white rounded-2xl shadow-xl">
      <h2 className="text-xl font-bold text-center mb-4">Kundenbewertungen</h2>
      <div className="flex space-x-4">
        {bewertungen.map((review, i) => (
          <motion.div
            key={i}
            className="min-w-[300px] max-w-[300px] bg-white rounded-xl shadow-md border border-gray-200"
            whileHover={{ scale: 1.03 }}
          >
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
          </motion.div>
        ))}
      </div>
    </div>
  );
}
