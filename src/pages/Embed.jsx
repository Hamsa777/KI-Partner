import React from "react";
import { useParams } from "react-router-dom";
import FeedbackWidget from "../components/FeedbackWidget";

export default function Embed() {
  const { firmaId } = useParams();
  const iframeCode = `<iframe 
  src="https://www.ki-partner24.de/feedback/${firmaId}" 
  style="width:100%; max-width:700px; height:300px; border:none; overflow:hidden;" 
  scrolling="no" 
  loading="lazy"></iframe>`;

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4 text-center">Vorschau Ihres Feedback-Widgets</h1>

      <div className="mb-2 w-full max-w-5xl">
        <FeedbackWidget firmaId={firmaId} />
      </div>

      <p className="text-sm text-gray-500 text-center mb-8 max-w-md">
        Neue Bewertungen, die über Ihr Formular eingehen, werden automatisch hier im Widget angezeigt – ganz ohne manuelle Pflege.
      </p>

      <div className="w-full max-w-2xl bg-white p-6 rounded-xl shadow-md text-center">
        <h2 className="text-lg font-semibold mb-4 text-center">Embed-Code für Ihre Website</h2>
        <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto text-left">{iframeCode}</pre>
        <button
          className="mt-4 px-6 py-2 bg-[#6366F1] text-white font-semibold rounded-lg hover:bg-[#4F46E5] transition"
          onClick={() => {
            navigator.clipboard.writeText(iframeCode);
            alert("✅ Embed-Code wurde kopiert!");
          }}
        >
          Embed-Code kopieren
        </button>
      </div>
    </div>
  );
}
