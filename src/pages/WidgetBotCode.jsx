import React from "react";
import { useParams } from "react-router-dom";

export default function WidgetBotCode() {
  const { firmaId } = useParams();

  const embedCode = `<iframe 
  src="https://www.ki-partner24.de/widgetbot/${firmaId}" 
  style="width:100%; max-width:700px; height:600px; border:none; overflow:hidden;" 
  scrolling="no" 
  loading="lazy"></iframe>`;

  return (
    <div className="min-h-screen bg-gray-50 p-10 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-10 text-center">Einbettungscode für Ihren Chatbot</h1>

      <p className="text-sm text-gray-600 text-center mb-8 max-w-md">
        Fügen Sie diesen Code auf Ihrer Website ein, um Ihren individuellen Chatbot live anzuzeigen.
      </p>

      <div className="w-full max-w-2xl bg-white p-6 rounded-xl shadow-md text-center">
        <h2 className="text-lg font-semibold mb-4 text-center">Ihr Embed-Code</h2>
        <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto text-left">{embedCode}</pre>
        <button
          className="mt-4 px-6 py-2 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition"
          onClick={() => {
            navigator.clipboard.writeText(embedCode);
            alert("Embed-Code wurde kopiert!");
          }}
        >
          Embed-Code kopieren
        </button>
      </div>
    </div>
  );
}
