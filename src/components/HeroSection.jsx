// src/components/HeroSection.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";



export default function HeroSection() {
  return (
    <section className="bg-white pt-24 pb-10 text-center px-6 sm:px-8">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900 max-w-3xl mx-auto"
      >
        Ihr Unternehmen. <span className="text-black">Automatisiert.</span><br />
        <span className="text-black">Skalierbar.</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="mt-6 text-lg sm:text-xl text-gray-600 max-w-xl mx-auto"
      >
        Wir helfen kleinen und mittleren Unternehmen, ihre Prozesse mit KI zu automatisieren – ganz ohne technisches Vorwissen.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-8 flex justify-center gap-4"
      >
       <motion.a
  href="mailto:kontakt@ki-partner24.de"
  whileHover={{
    scale: 1.02,
    backgroundColor: "#1a237e",
  }}
  transition={{ duration: 0.3, ease: "easeOut" }}
  className="bg-[#283593] text-white px-6 py-3 rounded-full text-sm sm:text-base font-medium"
>
  Kostenlose Beratung
</motion.a>

      </motion.div>
    </section>
  );
}
