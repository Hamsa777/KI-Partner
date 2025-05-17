import React from "react";
import { Link } from "react-router-dom";
import { FaRobot, FaShoppingCart } from "react-icons/fa";
import { HiMiniChatBubbleLeftRight } from "react-icons/hi2";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

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
          <button
  onClick={() => window.dispatchEvent(new Event("open-chatbot"))}
  className="w-1/2 flex flex-col items-center justify-center hover:bg-gray-100 transition rounded-l-2xl"
>
  <HiMiniChatBubbleLeftRight className="text-4xl text-black mb-3" />
  <span className="text-sm font-normal text-black">Jetzt testen</span>
</button>

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
      "Klicken Sie auf „Jetzt testen“ und erleben Sie unseren KI-Chatbot in Aktion, direkt auf Ihrer Website oder Testumgebung. So sehen Sie sofort, wie intelligente Antworten, Produktberatung oder Terminvergabe funktionieren.",
      "Wenn Ihnen der Bot gefällt, können Sie direkt den Zugang kaufen. Danach füllen Sie unser kurzes Onboarding-Formular aus – mit Infos zu Ihrem Unternehmen, Ihrer Website und Ihren Wunschfunktionen.",
      "Unser System erstellt automatisch einen Chatbot, der auf Ihre Inhalte, Dienstleistungen und häufig gestellten Fragen zugeschnitten ist – ganz ohne manuellen Aufwand. Ihr Bot lernt direkt aus den von Ihnen angegebenen Informationen.",
      "Sie erhalten einen einzigartigen Embed-Link, den Sie ganz einfach per Copy-Paste in Ihre Website einfügen können – egal ob WordPress, Wix, Webflow oder HTML. Ihr Bot ist sofort einsatzbereit.",
      "Unser Team steht Ihnen jederzeit zur Seite – ob Sie den Bot erweitern, umformulieren oder für neue Inhalte optimieren möchten. Updates, Tests und Verbesserungen sind jederzeit möglich."
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

<div className="mt-12 text-center">
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.1 }}
    viewport={{ once: true }}
  >
    <button
      onClick={() => window.dispatchEvent(new Event("open-chatbot"))}
      className="inline-block bg-black text-white px-6 py-3 rounded-full font-medium text-sm sm:text-base shadow hover:bg-gray-800 transition"
    >
      Jetzt testen
    </button>
  </motion.div>
</div>


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