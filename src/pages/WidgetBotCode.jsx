import { useParams } from "react-router-dom";

export default function WidgetBotCode() {
  const { firmaId } = useParams();

  const embedCode = `<iframe src="https://www.ki-partner24.de/widgetbot/${firmaId}" width="100%" height="600" style="border:none;"></iframe>`;

  return (
    <div className="max-w-xl mx-auto p-6 text-gray-800">
      <h1 className="text-2xl font-bold mb-4">Einbettungscode für deinen Chatbot</h1>
      <p className="mb-2">Füge den folgenden Code auf deiner Website ein:</p>
      <textarea
        readOnly
        className="w-full h-40 p-3 border rounded bg-gray-100 font-mono text-sm"
        value={embedCode}
      />
      <p className="mt-4 text-sm text-gray-600">
        Dieser Code zeigt deinen persönlichen Chatbot für <strong>{firmaId}</strong>.
      </p>
    </div>
  );
}
