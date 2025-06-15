import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function MobileMenu({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-white z-40 flex flex-col items-center justify-center text-center"
    >
      <button onClick={onClose} className="absolute top-6 right-6 text-3xl font-light">
        ✕
      </button>

      <nav className="flex flex-col gap-6 text-xl text-[#283593]">
        <Link to="/ueberuns" onClick={onClose}>Über uns</Link>
        <a href="/testeditor" target="_blank" onClick={onClose}>Kostenlos testen</a>
        <Link to="/impressum" onClick={onClose}>Impressum</Link>
        <Link to="/datenschutz" onClick={onClose}>Datenschutz</Link>
      </nav>
    </motion.div>
  );
}
