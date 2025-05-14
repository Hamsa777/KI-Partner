import React from "react";
import { Link } from "react-router-dom";
import { FaRobot, FaShoppingCart } from "react-icons/fa";
import { HiMiniChatBubbleLeftRight } from "react-icons/hi2";
import { motion } from "framer-motion";

export default function ChatbotService() {
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
          KI-Chatbots für Unternehmen
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-gray-700 text-lg leading-relaxed mb-4"
        >
          Bieten Sie Ihren Kunden sofortige Unterstützung – rund um die Uhr. Unsere{" "}
          <strong className="text-black">intelligenten Chatbots</strong> beantworten Fragen,
          erklären Produkte und helfen bei Buchungen – vollautomatisiert und{" "}
          <strong className="text-black">individuell für Ihr Unternehmen</strong> trainiert.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-gray-700 text-lg leading-relaxed mb-10"
        >
          Einfach testen, anpassen und direkt einbinden – ob auf Ihrer Website,
          im Kundensupport oder zur Verkaufsunterstützung.
        </motion.p>

        {/* Hover-Karte im ServiceCard-Stil */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="relative group w-full max-w-sm mx-auto mt-16"
        >
          {/* Static Card */}
          <div className="rounded-2xl border border-black bg-white p-6 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out text-center flex flex-col items-center justify-center h-full">
            <FaRobot className="w-8 h-8 text-black mb-3 mx-auto" />
            <h3 className="text-xl font-semibold mb-2 text-gray-800">KI-Chatbot erstellen</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Kundenservice & FAQs automatisch beantworten lassen.
            </p>
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-white/95 backdrop-blur-md rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex">
            <Link
              to="/chatbot-test"
              className="w-1/2 flex flex-col items-center justify-center hover:bg-gray-100 transition rounded-l-2xl"
            >
              <HiMiniChatBubbleLeftRight className="text-4xl text-black mb-3" />
              <span className="text-sm font-normal text-black">Jetzt testen</span>
            </Link>
            <div className="w-px bg-gray-300 my-6"></div>
            <a
              href="https://www.digistore24.com/product-link"
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
        <section className="mt-20">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="text-2xl sm:text-3xl font-bold text-gray-800 mb-10 text-center"
          >
            So funktioniert’s
          </motion.h2>

          <div className="relative border-l-2 border-gray-300 pl-6 space-y-10 max-w-xl mx-auto">
            {[
              "Klicken Sie auf 'Jetzt testen' und probieren Sie den Bot live aus",
              "Kaufen Sie den Zugang und füllen Sie das Onboarding-Formular aus",
              "Wir erstellen Ihren individuellen Chatbot mit Ihren Daten",
              "Sie erhalten Ihren Embed-Link zur Einbindung auf Ihrer Website",
              "Support & Anpassungen jederzeit über unser Team"
            ].map((text, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="w-4 h-4 bg-black rounded-full absolute -left-2.5 top-1.5" />
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