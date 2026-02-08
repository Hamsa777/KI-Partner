import React from "react";
import { motion } from "framer-motion";

const demoFirmaIds = [
  "5c2e7ca1",
  "9db6d022",
  "99cbd7a6",
  "e7205931",
  "071ad528",

  
];

const WidgetVorschau = () => {
  return (
    <div className="flex flex-col items-center px-6 py-12">
      <h1 className="text-3xl font-bold text-center mb-4">
        Beispiele unserer{" "}
        <span className="bg-gradient-to-r from-indigo-300 via-cyan-300 to-sky-400 bg-clip-text text-transparent">
          KI-basierten
        </span>{" "}
        Kundenfeedback-Widgets
      </h1>

      <p className="text-center text-white max-w-2xl mb-20">
        Entdecken Sie, wie unsere individuell gestaltbaren Widgets echtes Kundenvertrauen
        sichtbar machen – direkt auf Ihrer Website. Alle Designs sind flexibel anpassbar
        und sofort einsatzbereit. Ideal für mehr Vertrauen, mehr Conversions und ein
        starkes Markenbild.
      </p>

      {demoFirmaIds.map((id, index) => (
        <div key={id} className="w-full mx-auto mb-12">
          <h2 className="text-center font-semibold text-xl mt-2 mb-3">
            Vorschau: Widget {index + 1}
          </h2>
          <iframe
            src={`https://ki-partner24.de/embed/${id}`}
            width="100%"
            height="280"
            style={{ border: "none", display: "block" }}
            loading="lazy"
            title={`Kundenbewertungen Widget ${id}`}
          />
        </div>
      ))}

      {/* CTA-Bereich */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="flex flex-col items-center w-full"
      >
        {/* Für Unternehmen */}
        <div className="flex flex-col items-center gap-2 mb-4 w-full">

          <motion.a
            href="mailto:kontakt@ki-partner24.de?subject=Feedback-Widget%20jetzt%20kostenlos%20erhalten"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="
              relative group
              inline-flex items-center justify-center
              rounded-full
              bg-gradient-to-r from-[#283593] via-[#4f46e5] to-[#00bcd4]
              group-hover:from-[#4f46e5] group-hover:via-[#00bcd4] group-hover:to-[#283593]
              p-[2px]
              shadow-[0_0_28px_rgba(79,70,229,0.9)]
              hover:shadow-[0_0_36px_rgba(79,70,229,1)]
              transition-shadow duration-300
            "
          >
            <span
              className="
                flex items-center justify-center
                px-7 sm:px-7 py-2.5 sm:py-3
                rounded-full
                bg-[#020617]
                text-sm sm:text-base font-semibold
                text-white
              "
            >
              Kostenloses KI-Widget erhalten
            </span>
          </motion.a>
        </div>

       

        <p className="text-xs text-gray-400 max-w-md text-center mt-6 px-2">
          Alle Marken- und Logoelemente dienen ausschließlich zur Veranschaulichung von
          Designbeispielen. Die Rechte an Logos und Marken liegen bei den jeweiligen
          Eigentümern. Es besteht keine geschäftliche Verbindung zu den genannten
          Unternehmen.
        </p>
      </motion.div>

     <div className="mt-4"> <a href="/" className="text-sm text-gray-100 hover:text-gray-300 underline transition" > Zurück zur Startseite </a> </div>
    </div>
  );
};

export default WidgetVorschau;
