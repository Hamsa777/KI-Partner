import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../assets/logo.svg";

export default function MobileMenu({ isOpen, onClose }) {
  const navigate = useNavigate();

  console.log("[MobileMenu] render | isOpen =", isOpen);

  if (!isOpen) {
    console.log("[MobileMenu] not open -> return null");
    return null;
  }

  const handleCloseToHome = () => {
    console.log("[MobileMenu] X clicked -> close + navigate /");
    onClose();
    navigate("/");
  };

  const handleLinkClick = (target) => {
    console.log("[MobileMenu] Link clicked ->", target);
    onClose();
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
      {/* X oben rechts */}
      <button
        onClick={handleCloseToHome}
        className="absolute top-6 right-6 text-3xl font-light text-black"
      >
        ✕
      </button>

      {/* Logo mittig */}
      <img
        src={logo}
        alt="KI-Partner Logo"
        className="w-28 mb-10"
      />

      {/* Links */}
      <nav className="flex flex-col gap-6 text-xl text-[#283593]">
        <Link to="/ueberuns" onClick={() => handleLinkClick("/ueberuns")}>
          Über uns
        </Link>
        <Link to="/impressum" onClick={() => handleLinkClick("/impressum")}>
          Impressum
        </Link>
        <Link to="/datenschutz" onClick={() => handleLinkClick("/datenschutz")}>
          Datenschutz
        </Link>
      </nav>
    </motion.div>
  );
}
