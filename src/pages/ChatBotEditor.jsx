import React, { useState, useEffect } from "react";


export default function ChatBotEditor({ firmaId }) {
  const [loading, setLoading] = useState(true);
  const [botData, setBotData] = useState({
    firma: "",
    name: "",
    beschreibung: "",
    logo: "",
    webseite: "",
    faq: [],
  });

  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");

  // Daten laden
  useEffect(() => {
    fetch(`http://91.99.76.52:8001/bots/${firmaId}.json`)
      .then((res) => res.json())
      .then((data) => {
        setBotData((prev) => ({
          ...prev,
          ...data,
          faq: parseFaq(data.faq),
        }));
        setLoading(false);
      });
  }, [firmaId]);

  const parseFaq = (faqRaw) => {
    if (typeof faqRaw === "string") {
      return faqRaw
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .map((q) => ({ frage: q, antwort: "" }));
    } else if (Array.isArray(faqRaw)) {
      return faqRaw;
    }
    return [];
  };

  const saveChanges = async () => {
    const updated = {
      ...botData,
      faq: botData.faq.map((entry) =>
        typeof entry === "string" ? entry : `Frage: ${entry.frage}\nAntwort: ${entry.antwort}`
      ),
      firmaId,
    };

    const res = await fetch("http://91.99.76.52:8001/bot-configure", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });

    const result = await res.json();
    alert(result.message || "Gespeichert.");
  };

  const addQA = () => {
    if (newQuestion && newAnswer) {
      setBotData((prev) => ({
        ...prev,
        faq: [...prev.faq, { frage: newQuestion, antwort: newAnswer }],
      }));
      setNewQuestion("");
      setNewAnswer("");
    }
  };

  const removeQA = (index) => {
    const newFaq = [...botData.faq];
    newFaq.splice(index, 1);
    setBotData({ ...botData, faq: newFaq });
  };

  if (loading) return <div>Lade Daten …</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-4">
      <h1 className="text-xl font-bold">🧠 ChatBot Editor – {firmaId}</h1>

      <div className="space-y-2">
        <input
          type="text"
          placeholder="Firmenname"
          value={botData.firma}
          onChange={(e) => setBotData({ ...botData, firma: e.target.value })}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Name im Chat (z. B. Support)"
          value={botData.name}
          onChange={(e) => setBotData({ ...botData, name: e.target.value })}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Webseite"
          value={botData.webseite}
          onChange={(e) => setBotData({ ...botData, webseite: e.target.value })}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Logo-URL"
          value={botData.logo}
          onChange={(e) => setBotData({ ...botData, logo: e.target.value })}
          className="w-full border p-2 rounded"
        />
        <textarea
          placeholder="Beschreibung"
          rows={3}
          value={botData.beschreibung}
          onChange={(e) => setBotData({ ...botData, beschreibung: e.target.value })}
          className="w-full border p-2 rounded"
        />
      </div>

      <div className="pt-4">
        <h2 className="font-semibold">Q&A Einträge</h2>
        <ul className="space-y-2">
          {botData.faq.map((entry, index) => (
            <li key={index} className="border p-2 rounded">
              <div className="font-medium">❓ {entry.frage}</div>
              <div className="text-sm text-gray-600">💬 {entry.antwort}</div>
              <button
                onClick={() => removeQA(index)}
                className="text-red-600 text-xs mt-1"
              >
                Löschen
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-4 space-y-2">
          <input
            type="text"
            placeholder="Neue Frage"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            className="w-full border p-2 rounded"
          />
          <textarea
            placeholder="Antwort"
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
            className="w-full border p-2 rounded"
            rows={2}
          />
          <button
            onClick={addQA}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            Hinzufügen
          </button>
        </div>
      </div>

      <div>
        <button
          onClick={saveChanges}
          className="bg-green-600 text-white px-6 py-3 rounded font-semibold hover:bg-green-700"
        >
          Änderungen speichern
        </button>
      </div>
    </div>
  );
}
