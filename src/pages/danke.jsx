import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/KI-Partner Vektorlogo.png";

export default function DankeSeite() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-10 px-6 text-center">
      {/* Logo oben */}
      <img src={Logo} alt="KI-Partner Logo" className="w-56 h-auto mb-6" />

      {/* Text direkt danach – NICHT zentriert */}
      <h1 className="text-3xl font-bold mb-4 text-black">
        Vielen Dank für Ihren Kauf bei KI-Partner!
      </h1>

      <p className="text-gray-700 text-base mb-4 max-w-xl">
        Wir freuen uns, Sie bei der Automatisierung Ihrer Geschäftsprozesse unterstützen zu dürfen.
      </p>

      <p className="text-sm text-gray-600 mb-6 max-w-xl">
        Sie erhalten in Kürze eine E-Mail mit dem Link zur Einrichtung Ihres Unternehmens-Brandings. <br />
        Bitte prüfen Sie auch Ihren Spam-Ordner, falls die Nachricht nicht direkt erscheint.
      </p>

      <Link
        to="/"
        className="bg-black text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-gray-800 transition"
      >
        Zurück zur Startseite
      </Link>
      <iframe 
  src="https://www.ki-partner24.de/widgetbot/934e663b" 
  style="width:100%; max-width:700px; height:600px; border:none; overflow:hidden;" 
  loading="lazy">
</iframe>

    </div>
    
  );
}
