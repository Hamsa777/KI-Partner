import React from "react";

export default function Impressum() {
  return (
    <div className="min-h-screen bg-white text-[#000000] px-6 py-12 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Impressum</h1>

      <section className="mb-6">
        <p><strong>Angaben gemäß § 5 TMG:</strong></p>
        <p className="mt-2">
          Hamsa Lif<br />
          Scharhoferstraße 54<br />
          68307 Mannheim<br />
          Deutschland
        </p>
      </section>

      <section className="mb-6">
        <p><strong>Kontakt:</strong></p>
        <p className="mt-2">
            Telefon: +49 (0) 178 3221470<br /> 
          
          E-Mail: <a href="mailto:info@ki-partner24.de" className="underline hover:text-[#1a237e]">kontakt@ki-partner24.de</a>
        </p>
      </section>

      <section className="mb-6">
        <p><strong>Umsatzsteuer-ID:</strong></p>
        <p className="mt-2">
          Nicht erforderlich gemäß § 19 UStG (Kleinunternehmerregelung)
        </p>
      </section>

      <section className="mb-6">
        <p><strong>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:</strong></p>
        <p className="mt-2">
          Hamsa Lif<br />
          gleiche Anschrift wie oben
        </p>
      </section>

      
    </div>
  );
}
