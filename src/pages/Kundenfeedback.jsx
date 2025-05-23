import React from "react";
import { Link } from "react-router-dom";
import { FaComments, FaShoppingCart } from "react-icons/fa";
import { HiClipboardDocumentCheck } from "react-icons/hi2";
import { motion } from "framer-motion";

export default function Kundenfeedback() {
  return (
    <section className="bg-gradient-to-b from-white to-gray-100 min-h-screen px-6 py-20 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-3xl text-center"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8"
        >
          Kundenfeedback automatisieren
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-gray-700 text-lg leading-relaxed mb-4"
        >
          Feedback ist der Schlüssel zu Wachstum und Kundenzufriedenheit. Mit unserer{" "}
          <strong className="text-black">KI-gestützten Lösung</strong> sammeln Sie automatisiert
          Bewertungen – professionell, zuverlässig und{" "}
          <strong className="text-black">markenkonform eingebettet</strong>.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-gray-700 text-lg leading-relaxed mb-10"
        >
          Einfach Link teilen, Kunden bewerten lassen und Ergebnisse in Echtzeit anzeigen –{" "}
          <strong className="text-black">DSGVO-konform</strong>, automatisiert und komplett ohne
          Programmierkenntnisse.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="relative group w-full max-w-sm mx-auto mt-16"
        >
          <div className="bg-white border border-black rounded-2xl p-6 shadow-lg text-center flex flex-col items-center transition-transform group-hover:scale-105">
            <FaComments className="text-4xl text-black mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Kundenfeedback-System
            </h3>
            <p className="text-sm text-gray-600">
              Bewertungen sammeln und automatisch anzeigen lassen.
            </p>
          </div>

          <div className="absolute inset-0 bg-white/95 backdrop-blur-md rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex">
            <a
              href="https://tally.so/r/nrqqNL"
              target="_blank"
              rel="noopener noreferrer"
              className="w-1/2 flex flex-col items-center justify-center hover:bg-gray-100 transition rounded-l-2xl"
            >
              <HiClipboardDocumentCheck className="text-4xl text-black mb-3" />
              <span className="text-sm font-normal text-black">Jetzt testen</span>
            </a>
            <div className="w-px bg-gray-300 my-6"></div>
            <a
              href="https://buy.stripe.com/test_bIY7tu01x4ys3Uk9AC"
              target="_blank"
              rel="noopener noreferrer"
              className="w-1/2 flex flex-col items-center justify-center hover:bg-gray-100 transition rounded-r-2xl"
            >
              <FaShoppingCart className="text-4xl text-black mb-3" />
              <span className="text-sm font-normal text-black">Jetzt kaufen</span>
            </a>
          </div>
        </motion.div>

       {/* Timeline */}
<section className="mt-20 px-4">
  <motion.h2
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.6, delay: 1.1 }}
    className="text-2xl sm:text-3xl font-bold text-gray-800 mb-14 text-center"
  >
    So funktioniert’s
  </motion.h2>

  <div className="max-w-xl mx-auto flex flex-col items-center space-y-10 text-center">
    {[
      "Link zum Feedback-Formular teilen (z. B. per E-Mail oder Website)",
      "Kunden hinterlassen Bewertungen über ein individuelles Formular",
      "Bewertungen werden automatisch verarbeitet und gespeichert",
      "Einbettbarer Feedback-Widget zeigt Bewertungen live an",
      "Optional: Automatische Dankesnachricht an Kunden",
    ].map((text, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: i * 0.1 }}
        viewport={{ once: true }}
        className="flex flex-col items-center"
      >
        <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-semibold text-sm mb-4">
          {i + 1}
        </div>
        <p className="text-gray-700 text-base sm:text-lg">{text}</p>
      </motion.div>
    ))}
  </div>
</section>


        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Link
            to="/"
            className="inline-block mt-10 text-sm text-gray-600 underline hover:text-gray-900 transition"
          >
            Zurück zur Startseite
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
