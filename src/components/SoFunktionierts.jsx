// SoFunktionierts.jsx
import { motion } from "framer-motion";

const steps = [
  "Jetzt testen & Bot ausprobieren",
  "Zugang kaufen & Formular ausfüllen",
  "Individueller Chatbot wird erstellt",
  "Embed-Link zur Integration erhalten",
  "Support & Anpassungen jederzeit"
];

export default function SoFunktionierts() {
  return (
    <section className="mt-20 px-4">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-2xl sm:text-3xl font-bold text-gray-800 mb-14 text-center"
      >
        So funktioniert’s
      </motion.h2>

      <div className="max-w-5xl mx-auto overflow-x-auto">
        <div className="flex items-center justify-between space-x-4 sm:space-x-6 relative">
          {steps.map((text, i) => (
            <div key={i} className="flex-1 min-w-[150px] text-center relative">
              {/* Kreis mit Nummer */}
              <motion.div
                className="w-10 h-10 rounded-full bg-black text-white mx-auto flex items-center justify-center text-sm font-semibold z-10"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.15 }}
                viewport={{ once: true }}
              >
                {i + 1}
              </motion.div>

              {/* Verbindungs-Linie */}
              {i < steps.length - 1 && (
                <div className="absolute top-5 left-full w-full h-1 bg-gray-300 z-0" />
              )}

              {/* Text darunter */}
              <motion.p
                className="mt-4 text-sm sm:text-base text-gray-700"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.15 + 0.2 }}
                viewport={{ once: true }}
              >
                {text}
              </motion.p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
