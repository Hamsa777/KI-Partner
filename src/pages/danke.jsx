import React from "react";

export default function DankeSeite() {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-12 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
          Vielen Dank für Ihren Kauf!
        </h1>
        <p className="text-lg text-gray-700 mb-2">
          Ihre Bestellung wurde erfolgreich abgeschlossen.
        </p>
        <p className="text-gray-600 max-w-xl mb-4">
          Sie erhalten in Kürze eine E-Mail mit dem Link zur Einrichtung Ihres Unternehmens-Brandings.
          Bitte prüfen Sie auch Ihren Spam-Ordner, falls die Nachricht nicht zeitnah erscheint.
        </p>
        <p className="text-sm text-gray-500 mb-6">
          Bei Fragen stehen wir Ihnen jederzeit zur Verfügung:{" "}
          <a href="mailto:kontakt@ki-partner24.de" className="underline text-blue-900">
            kontakt@ki-partner.de
          </a>
        </p>
        <a
          href="https://www.ki-partner24.de"
          className="bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-blue-950 transition"
        >
          Zurück zur Startseite
        </a>
      </div>
    );
  }
  