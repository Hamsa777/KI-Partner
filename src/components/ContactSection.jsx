// src/components/ContactSection.jsx
import { motion } from "framer-motion";
import React from "react";

export default function ContactSection() {
  return (
    <motion.section
      className="py-20 text-center bg-white mt-16"
      initial={{ opacity: 0, x: 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.5 }}
    >
      <h2 className="text-3xl font-bold mb-4">Kostenlose Erstberatung sichern</h2>
      <p className="text-gray-600 mb-6">
        Lassen Sie uns gemeinsam Ihre Prozesse mit KI verbessern.
      </p>

      <motion.a
        whileHover={{
          scale: 1.02,
          backgroundColor: "#1a237e",
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        href="mailto:kontakt@ki-partner24.de"
        className="inline-block px-6 py-3 bg-[#283593] text-white rounded-full"
      >
        Jetzt Kontakt aufnehmen
      </motion.a>
    </motion.section>
  );
}
