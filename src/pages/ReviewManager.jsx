import { useEffect, useState } from "react";
import axios from "axios";

export default function ReviewManager({ firmaId }) {
  const [bewertungen, setBewertungen] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://feedback.ki-partner24.de/widget/${firmaId}`)
      .then(res => setBewertungen(res.data))
      .catch(() => alert("Fehler beim Laden der Bewertungen"))
      .finally(() => setLoading(false));
  }, [firmaId]);

  const handleDelete = (id) => {
    if (!window.confirm("Wirklich löschen?")) return;

    axios.delete(`https://feedback.ki-partner24.de/feedback-api/widget/${firmaId}/${id}`)
      .then(() => {
        setBewertungen(prev => prev.filter(b => b.id !== id));
      })
      .catch(() => alert("Löschen fehlgeschlagen"));
  };

  if (loading) return <p>Lade Bewertungen...</p>;

  if (bewertungen.length === 0) return <p>Keine Bewertungen vorhanden.</p>;

  return (
    <div className="space-y-4">
      {bewertungen.map(b => (
        <div key={b.id} className="p-4 border rounded-md bg-white shadow">
          <p className="font-semibold">{b.name} ({b.stars}⭐)</p>
          <p className="text-gray-600 text-sm">{b.date}</p>
          <p className="my-2">{b.comment}</p>
          <button
            onClick={() => handleDelete(b.id)}
            className="text-red-600 text-sm hover:underline"
          >
            Bewertung löschen
          </button>
        </div>
      ))}
    </div>
  );
}
