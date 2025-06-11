import React from "react";

const demoFirmaIds = [
  "e7205931",
  "2ab3e141",
  "98d3a258",
  "ffc5042a",
  "e6c9cef8"
];

const WidgetVorschau = () => {
  return (
    <div className="flex flex-col items-center px-6 py-12">
      <h1 className="text-3xl font-bold text-center mb-4">
        Beispiele unserer KI-basierten Kundenfeedback-Widgets
      </h1>
      <p className="text-center text-gray-600 max-w-2xl mb-20">
        Entdecken Sie, wie unsere individuell gestaltbaren Widgets echtes Kundenvertrauen sichtbar machen – direkt auf Ihrer Website. 
        Alle Designs sind flexibel anpassbar und sofort einsatzbereit. Ideal für mehr Vertrauen, mehr Conversions und ein starkes Markenbild.
      </p>

      {demoFirmaIds.map((id, index) => (
        <div key={id} className="w-full px-4 sm:px-6 lg:px-10 xl:px-16">

          <h2 className="text-center font-semibold text-base mt-2 mb-2">
            Vorschau: Widget {index + 1}
          </h2>
          <iframe
            src={`https://www.ki-partner24.de/embed/${id}`}
            width="100%"
            height="360"
            style={{ border: "none", display: "block" }}
            loading="lazy"
            title={`Kundenbewertungen Widget ${id}`}
          />
        </div>
      ))}
    </div>
  );
};

export default WidgetVorschau;
