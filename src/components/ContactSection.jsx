// src/components/ContactSection.jsx
import { motion } from "framer-motion";
import React from "react";

export default function ContactSection() {
  return (
    <section className="py-20 text-center bg-white mt-16">
      <h2 className="text-3xl font-bold mb-4">Kostenlose Erstberatung sichern</h2>
      <p className="text-gray-600 mb-6">Lassen Sie uns gemeinsam Ihre Prozesse mit KI verbessern.</p>
      <motion.a
        whileHover={{ scale: 1.05, backgroundColor: "#1a1a1a" }}
        transition={{ type: "spring", stiffness: 300 }}
        href="mailto:kontakt@ki-partner.de"
        className="inline-block px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800"
      >
        Jetzt Kontakt aufnehmen
      </motion.a>
    </section>
  );
}