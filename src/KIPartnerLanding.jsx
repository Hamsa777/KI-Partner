
// Landingpage für "KI-Partner" – Bright Tech Style mit klickbaren Services

import React from "react";

export default function KIPartnerLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-100 text-gray-900 p-6 font-sans">
      <header className="text-center py-10">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text animate-fade-in">
          KI-Partner
        </h1>
        <p className="text-2xl mt-2 font-light text-blue-800">Wir automatisieren Ihr Unternehmen mit KI.</p>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Ihr vertrauenswürdiger Partner für Chatbots, Content-Automation & smarte Prozesse
        </p>
      </header>

      <section className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 py-10">
        <ServiceCard
          title="Kundenservice-Chatbots"
          description="Automatisieren Sie häufige Fragen und entlasten Sie Ihr Team - 24/7 erreichbar."
          link="#chatbots"
        />
        <ServiceCard
          title="E-Mail & Angebots-Automation"
          description="Lassen Sie KI Ihre E-Mails beantworten und Angebote erstellen. Zeit sparen leicht gemacht."
          link="#emails"
        />
        <ServiceCard
          title="Interne Wissens-Bots"
          description="Ihre Mitarbeiter erhalten Antworten auf interne Fragen sofort und rund um die Uhr."
          link="#wissen"
        />
        <ServiceCard
          title="Automatisierte Terminvereinbarungs-Systeme"
          description="Kunden buchen Termine direkt über den Bot – einfach und ohne Wartezeit."
          link="#termine"
        />
        <ServiceCard
          title="KI-Prozess-Automatisierung mit Zapier/Make"
          description="Automatisieren Sie wiederkehrende Aufgaben durch smarte Workflows."
          link="#prozesse"
        />
        <ServiceCard
          title="Kundenfeedback-Bots"
          description="Erfassen und analysieren Sie Kundenfeedback automatisiert und effizient."
          link="#feedback"
        />
      </section>

      <section className="bg-white/80 backdrop-blur-md p-8 rounded-xl max-w-3xl mx-auto text-center shadow-xl">
        <h2 className="text-2xl font-semibold mb-4 text-blue-700">Warum KI-Partner?</h2>
        <ul className="text-left list-disc list-inside space-y-2 text-gray-700">
          <li>Persönlicher Ansprechpartner & individuelle Beratung</li>
          <li>Schnelle Umsetzung & direkte Resultate</li>
          <li>Volle Transparenz & faire Preise</li>
        </ul>
      </section>

      <section className="text-center py-10">
        <h2 className="text-2xl font-bold mb-4 text-blue-700">Kostenlose Erstberatung sichern</h2>
        <p className="mb-4 text-gray-700">Lassen Sie uns gemeinsam Ihre Prozesse mit KI verbessern.</p>
        <a
          href="mailto:info@ki-partner.de"
          className="inline-block bg-gradient-to-r from-blue-600 to-purple-500 text-white px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition transform"
        >
          Jetzt Kontakt aufnehmen
        </a>
      </section>

      <footer className="text-center text-gray-500 text-sm mt-10">
        &copy; {new Date().getFullYear()} KI-Partner | Hamsa Lif
      </footer>
    </div>
  );
}

function ServiceCard({ title, description, link }) {
  return (
    <a href={link} className="block">
      <div className="bg-white/70 backdrop-blur-md border border-blue-200 rounded-xl p-6 shadow hover:shadow-xl transition hover:scale-105">
        <h3 className="text-xl font-semibold mb-2 text-blue-800">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </a>
  );
}
