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
        <div className="relative flex items-center justify-between px-6 pt-5 pb-5 max-w-6xl mx-auto">
          {/* Linke Desktop-Navigation */}
          <div className="hidden sm:flex items-center space-x-6 text-sm sm:text-base pt-1">
            <Link to="/ueberuns" className="hover:underline text-gray-800">
              Über uns
            </Link>
          </div>

                  {/* Rechte Navigation + Burger rechts (mobil sichtbar) */}
<div className="flex items-center space-x-4 text-sm sm:text-base pt-1">
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
