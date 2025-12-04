import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../assets/logo.svg";

export default function MobileMenu({ isOpen, onClose }) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleCloseToHome = () => {
    onClose();            // Menü schließen
    navigate("/");        // Zur Startseite navigieren
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="
        fixed inset-0 
        bg-white 
        z-[9999]
        flex flex-col items-center justify-center 
        text-center
      "
    >
      {/* 🔥 X oben rechts – führt zur Startseite */}
      <button
        onClick={handleCloseToHome}
        className="absolute top-6 right-6 text-3xl font-light"
      >
        ✕
      </button>

      {/* Mittiges Logo */}
      <img
        src={logo}
        alt="KI-Partner Logo"
        className="w-32 mb-10"
      />

      {/* Navigation */}
      <nav className="flex flex-col gap-6 text-xl text-[#283593]">
        <Link to="/ueberuns" onClick={onClose}>Über uns</Link>
        <Link to="/impressum" onClick={onClose}>Impressum</Link>
        <Link to="/datenschutz" onClick={onClose}>Datenschutz</Link>
      </nav>
    </motion.div>
  );
}
