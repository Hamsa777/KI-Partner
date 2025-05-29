// src/components/Warum.jsx
import React from "react";
import { motion } from "framer-motion";

export default function Warum() {
  return (
    <motion.section
      className="py-20 px-4 max-w-4xl mx-auto text-center"
      initial={{ opacity: 0, x: -100 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.5 }} // ← Hier: 50 % muss im Sichtfeld sein
    >
      <h2 className="text-3xl font-bold mb-8">Warum KI-Partner?</h2>
      <p className="text-gray-700 text-lg leading-relaxed">
        Wir kombinieren moderne KI-Technologie mit klarer, praxisnaher Umsetzung. Unser Ziel ist es,{" "}
        <strong>kleinen und mittelständischen Unternehmen</strong> sofort messbaren Mehrwert zu bieten – sei es durch
        automatisierte Kundenkommunikation, Angebotserstellung oder Terminmanagement. Wir arbeiten effizient,
        transparent und individuell abgestimmt auf Ihre Geschäftsprozesse.
      </p>
    </motion.section>
  );
}
