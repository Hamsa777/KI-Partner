import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MotionLink = motion(Link);

const demoFirmaIds = [
  "e7205931",
  "d6877aa9",
  "2ab3e141",
  "4854c86e"
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
        <div key={id} className="w-full mx-auto mb-12">
          <h2 className="text-center font-semibold text-base mt-2 mb-2">
            Vorschau: Widget {index + 1}
          </h2>
          <iframe
            src={`https://www.ki-partner24.de/embed/${id}`}
            width="100%"
            height="330"
            style={{ border: "none", display: "block" }}
            loading="lazy"
            title={`Kundenbewertungen Widget ${id}`}
          />
        </div>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="flex flex-col items-center gap-3 mt-8"
      >
       <motion.a
  href="https://buy.stripe.com/fZufZhevgh0Y4uEesz7bW05"
  target="_blank"
  rel="noopener noreferrer"
  whileHover={{ scale: 1.02, backgroundColor: "#1a237e" }}
  transition={{ duration: 0.3 }}
  className="bg-[#283593] text-white px-6 py-3 rounded-full text-sm sm:text-base font-medium text-center"
>
Kostenlos testen</motion.a>

<motion.a
  href="https://buy.stripe.com/8wM00Rc7k7kT6Ri7sv"
  target="_blank"
  rel="noopener noreferrer"
  whileHover={{ scale: 1.02, backgroundColor: "#1a237e" }}
  transition={{ duration: 0.3 }}
  className="bg-[#283593] text-white px-6 py-3 rounded-full text-sm sm:text-base font-medium text-center"
>
  Jetzt kaufen
</motion.a>


        <p className="text-xs text-gray-400 max-w-md text-center mt-4 px-2">
          Alle Marken- und Logoelemente dienen ausschließlich zur Veranschaulichung von Designbeispielen. 
          Die Rechte an Logos und Marken liegen bei den jeweiligen Eigentümern. Es besteht keine geschäftliche Verbindung zu den genannten Unternehmen.
        </p>
      </motion.div>
      <div className="mt-4">
    <a
      href="/"
      className="text-sm text-gray-500 hover:text-gray-700 underline transition"
    >
      Zurück zur Startseite
    </a>
  </div>
    </div>
  );
};

export default WidgetVorschau;
