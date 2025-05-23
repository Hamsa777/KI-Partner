import React, { useEffect } from "react";

export default function UeberUns() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.ki-partner24.de/feedback.js";
    script.defer = true;

    // Konfiguration
    script.setAttribute("data-firmaid", "c9f21e5d");
    script.setAttribute("data-color", "#b51a00");
    script.setAttribute("data-accent-color", "#ff8647");
    script.setAttribute("data-font", "Poppins, sans-serif");
    script.setAttribute("data-text-color", "#ffffff");
    script.setAttribute("data-heading-color", "#ffffff");
    script.setAttribute("data-radius", "60px");
    script.setAttribute("data-box-radius", "20px");
    script.setAttribute("data-logo-url", "");

    document.body.appendChild(script);
  }, []);

  return (
    <section className="bg-white min-h-screen px-6 py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center">
          Über KI-Partner
        </h1>

        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          Wir sind ein technologiegetriebenes Team mit einer klaren Mission:
          Unternehmen durch KI effizienter, schlanker und zukunftssicher zu
          machen. Statt leerer Versprechen liefern wir automatisierte
          Lösungen, die wirklich funktionieren – vom intelligenten Kundenservice
          bis zur automatisierten Dokumentenerstellung.
        </p>

        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          Unsere Kunden sparen täglich Zeit, Geld und Nerven – mit Chatbots,
          E-Mail-Automationen, Dokumentenprozessen und mehr. Alles 100 %
          DSGVO-konform, ohne technisches Vorwissen, individuell auf Ihre
          Firma abgestimmt.
        </p>

        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          Wir glauben daran, dass moderne KI nicht nur Großkonzernen helfen
          sollte – sondern vor allem kleinen und mittleren Unternehmen. Deshalb
          bauen wir einfache, bezahlbare Lösungen, die messbare Ergebnisse
          liefern.
        </p>

        <div className="mt-10 text-center">
          <a
            href="/"
            className="inline-block bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition"
          >
            Zurück zur Startseite
          </a>
        </div>
      </div>
    </section>
  );
}
