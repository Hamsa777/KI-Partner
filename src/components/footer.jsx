// src/components/Footer.jsx
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-sm text-gray-600 py-6 px-4 text-center mt-16">
      <div>
        <p><strong>Angaben gemäß § 5 TMG:</strong></p>
        <p>Hamsa Lif<br />
        Scharhoferstraße 54<br />
        68307 Mannheim<br />
        Deutschland</p>
        <p>
          Telefon: 0178 3221470<br />
          E-Mail: <a href="mailto:kontakt@ki-partner24.de" className="text-blue-600 underline">kontakt@ki-partner24.de</a>
        </p>
        <p className="mt-4">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:<br />
          Hamsa Lif, gleiche Anschrift
        </p>
        <p className="mt-4">© {new Date().getFullYear()} KI-Partner – Alle Rechte vorbehalten</p>
      </div>
    </footer>
  );
}
