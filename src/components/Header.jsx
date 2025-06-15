import React, { useState } from "react";
import logo from "../assets/KI-Partner Vektorlogo.jpeg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-white sticky top-0 z-30 shadow-sm border-b">
        <div className="relative flex items-center px-6 pt-5 pb-5 max-w-6xl mx-auto">
          
          {/* Linke Desktop-Navigation */}
          <div className="hidden sm:flex items-center space-x-6 text-sm sm:text-base pt-1 flex-1">
            <Link to="/ueberuns" className="hover:underline text-gray-800">
              Über uns
            </Link>
          </div>

          {/* Logo & Slogan – mittig zentriert */}
          <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center pt-1 mt-2">
            <Link to="/" className="flex items-center cursor-pointer">
              <img
                src={logo}
                alt="KI-Partner Logo"
                className="h-8 sm:h-10 w-auto"
              />
            </Link>
            <p className="text-xs sm:text-sm text-gray-600 mt-1 whitespace-nowrap">
              Wir automatisieren Ihr Unternehmen mit KI
            </p>
          </div>

          {/* Rechte Navigation + Burger rechts */}
          <div className="flex items-center space-x-4 text-sm sm:text-base pt-1 flex-1 justify-end">
            {/* Desktop-Links */}
            <a
              href="/testeditor"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline hover:underline text-gray-800"
            >
              Kostenlos testen
            </a>

            <motion.a
              href="mailto:kontakt@ki-partner24.de"
              whileHover={{ scale: 1.02, backgroundColor: "#1a237e" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="hidden sm:inline bg-[#283593] text-white px-4 py-1.5 rounded-full"
            >
              Kontakt
            </motion.a>

            {/* Mobil: Burger rechts */}
            <button
              onClick={() => setMenuOpen(true)}
              className="sm:hidden text-3xl text-[#283593]"
            >
              ☰
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menü Overlay */}
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
