
import React, { useEffect } from "react";

export default function KIPartnerLanding() {
  useEffect(() => {
    if (!window.chatbase || window.chatbase("getState") !== "initialized") {
      window.chatbase = (...args) => {
        if (!window.chatbase.q) {
          window.chatbase.q = [];
        }
        window.chatbase.q.push(args);
      };
      window.chatbase = new Proxy(window.chatbase, {
        get(target, prop) {
          if (prop === "q") return target.q;
          return (...args) => target(prop, ...args);
        },
      });
    }

    const onLoad = function () {
      const script = document.createElement("script");
      script.src = "https://www.chatbase.co/embed.min.js";
      script.id = "eWwON5k4T8DWHObS7YvG4";
      script.domain = "www.chatbase.co";
      document.body.appendChild(script);
    };

    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad);
    }
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900 p-6">
      <header className="text-center py-10">
        <h1 className="text-4xl font-bold">KI-Partner</h1>
        <p className="text-xl mt-2">Wir automatisieren Ihr Unternehmen mit KI.</p>
        <p className="mt-4 text-gray-600">
          Ihr vertrauenswürdiger Partner für Chatbots, Content-Automation & smarte Prozesse
        </p>
      </header>

      <section className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 py-10">
        <ServiceCard
          title="Kundenservice-Chatbots"
          description="Automatisieren Sie häufige Fragen und entlasten Sie Ihr Team - 24/7 erreichbar."
        />
        <ServiceCard
          title="E-Mail & Angebots-Automation"
          description="Lassen Sie KI Ihre E-Mails beantworten und Angebote erstellen. Zeit sparen leicht gemacht."
        />
        <ServiceCard
          title="Interne Wissens-Bots"
          description="Ihre Mitarbeiter erhalten Antworten auf interne Fragen sofort und rund um die Uhr."
        />
        <ServiceCard
          title="Automatisierte Terminvereinbarungs-Systeme"
          description="Kunden buchen Termine direkt über den Bot – einfach und ohne Wartezeit."
        />
        <ServiceCard
          title="KI-Prozess-Automatisierung mit Zapier/Make"
          description="Automatisieren Sie wiederkehrende Aufgaben durch smarte Workflows."
        />
        <ServiceCard
          title="Kundenfeedback-Bots"
          description="Erfassen und analysieren Sie Kundenfeedback automatisiert und effizient."
        />
      </section>

      <section className="bg-gray-100 p-8 rounded-xl max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-semibold mb-4">Warum KI-Partner?</h2>
        <ul className="text-left list-disc list-inside space-y-2 text-gray-700">
          <li>Persönlicher Ansprechpartner & individuelle Beratung</li>
          <li>Schnelle Umsetzung & direkte Resultate</li>
          <li>Volle Transparenz & faire Preise</li>
        </ul>
      </section>

      <section className="text-center py-10">
        <h2 className="text-2xl font-bold mb-4">Kostenlose Erstberatung sichern</h2>
        <p className="mb-4">Lassen Sie uns gemeinsam Ihre Prozesse mit KI verbessern.</p>
        <a
          href="mailto:info@ki-partner.de"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
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

function ServiceCard({ title, description }) {
  return (
    <div className="border rounded-xl p-6 shadow hover:shadow-lg transition">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
