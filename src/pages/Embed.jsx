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
      <h1 className="text-2xl font-bold mb-4">Vorschau Ihres Feedback-Widgets</h1>
      <div className="mb-8 w-full max-w-5xl">
        <FeedbackWidget firmaId={firmaId} />
      </div>

      <div className="w-full max-w-2xl bg-white p-4 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-2">📥 Embed-Code für Ihre Website</h2>
        <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">{iframeCode}</pre>
        <button
          className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
          onClick={() => {
            navigator.clipboard.writeText(iframeCode);
            alert("Embed-Code kopiert!");
          }}
        >
          Code kopieren
        </button>
      </div>
    </div>
  );
}
