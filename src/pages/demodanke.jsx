import { useSearchParams } from 'react-router-dom';
import React from "react";

export default function DemoDanke() {
  const [searchParams] = useSearchParams();
  const service = searchParams.get('service');

  const services = {
    dokumente: {
      title: "Danke für Ihren Test der Dokumenten-Automatisierung!",
      description: "Starten Sie jetzt die vollautomatische Erstellung Ihrer Verträge, Rechnungen und Angebote.",
      stripeUrl: "",
    },
    email: {
      title: "Danke für Ihr Test der E-Mail-Automatisierung!",
      description: "Lassen Sie eingehenden E-Mails jetzt dauerhaft automatisch von der KI beantworten.",
      stripeUrl: "https://buy.stripe.com/aEUcNDgnAax56Ri289",
    },
    termin: {
      title: "Danke für Ihren Test der Termin-Automatisierung!",
      description: "Automatisieren Sie jetzt Ihre Terminvereinbarungen mit wenigen Klicks.",
      stripeUrl: "",
    },
    angebot: {
        title: "Danke für Ihren Test der Angebots-Automatisierung!",
        description: "Starten Sie jetzt die vollautomatische Erstellung Ihrer Angebote.",
        stripeUrl: "",
      },
      chatbot: {
        title: "Danke für Ihren Test des Kundenservice Chatbots!",
        description: "Starten Sie jetzt Ihren individuellen Chatbot auf Ihrer Webseite einzupflegen.",
        stripeUrl: "",
      },
      feedback: {
        title: "Vielen Dank für das Testen unseres Feedbacksystems!",
        description: "Pflegen Sie jetzt Ihr eigenes Feedbacksystem für beliebige Geschäftsprozesse ein.",
        stripeUrl: "",
      },
  };

  const selectedService = services[service];

  if (!selectedService) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-center p-8">
        <h1 className="text-2xl font-bold">Service nicht gefunden</h1>
        <p className="mt-4">Bitte starte deinen Test über unsere Website neu.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center p-8">
      <h1 className="text-3xl font-bold mb-4">{selectedService.title}</h1>
      <p className="mb-6 max-w-xl">{selectedService.description}</p>
      <button
        onClick={() => window.location.href = selectedService.stripeUrl}
        className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-all"
      >
        🔓 Jetzt Service aktivieren
      </button>
    </div>
  );
}
