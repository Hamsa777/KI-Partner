import React, { useEffect, useState } from "react";

export default function EmbedDemo() {
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    fetch("https://http://localhost:5173/demo-feedback.json") // Hier deine echte JSON-URL einfügen
      .then((res) => res.json())
      .then((data) => setFeedback(data))
      .catch((err) => console.error("Fehler beim Laden der Demo-Bewertungen:", err));
  }, []);

  return (
    <div className="min-h-screen bg-white text-black p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">💬 Kundenfeedback (Demo)</h1>
      <p className="mb-8 text-center max-w-xl text-gray-700">
        Hier sehen Sie eine Vorschau unseres automatisierten Feedback-Widgets. Alle Einträge stammen
        aus dem öffentlichen Testformular.
      </p>

      <div className="w-full max-w-xl space-y-4">
        {feedback.length === 0 ? (
          <p className="text-gray-500 text-center">Keine Bewertungen gefunden.</p>
        ) : (
          feedback.map((entry, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-xl p-4 shadow-sm hover:shadow-md transition"
            >
              <p className="text-lg font-medium text-gray-800 mb-1">{entry.bewertung}</p>
              {entry.name && <p className="text-sm text-gray-500">– {entry.name}</p>}
              {entry.sterne && (
                <div className="mt-1 text-yellow-500">
                  {"★".repeat(entry.sterne)}{"☆".repeat(5 - entry.sterne)}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
