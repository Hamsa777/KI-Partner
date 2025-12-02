import React, { useState, useEffect } from "react";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import MobileMenu from "./MobileMenu";
import { FaBolt } from "react-icons/fa";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollDirection, setScrollDirection] = useState("up");

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateScrollDirection = () => {
      const currentScrollY = window.scrollY;
      const direction = currentScrollY > lastScrollY ? "down" : "up";
      if (
        direction !== scrollDirection &&
        Math.abs(currentScrollY - lastScrollY) > 10
      ) {
        setScrollDirection(direction);
      }
      lastScrollY = currentScrollY > 0 ? currentScrollY : 0;
    };

    window.addEventListener("scroll", updateScrollDirection);
    return () => {
      window.removeEventListener("scroll", updateScrollDirection);
    };
  }, [scrollDirection]);

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: scrollDirection === "down" ? -110 : 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="
          sticky top-0 z-30
          bg-gradient-to-r from-white via-slate-50 to-white
          backdrop-blur-xl
          border-b border-slate-200/70
          shadow-[0_10px_35px_rgba(15,23,42,0.18)]
        "
      >
        {/* Top neon line */}
        <div className="h-[2px] w-full bg-gradient-to-r from-[#283593] via-[#4f46e5] to-[#00bcd4] opacity-80" />

        <div className="flex items-center justify-between max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3">
          {/* Left: Logo + Claim */}
          <div className="flex items-center gap-3 sm:gap-8 -ml-1 sm:-ml-2">
            <Link to="/" className="flex items-center cursor-pointer">
              <motion.img
                src={logo}
                alt="Logo"
                className="h-5 sm:h-6 w-auto"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                whileHover={{ scale: 1.12 }}
              />
            </Link>
            <p className="hidden sm:block text-[11px] sm:text-xs text-slate-700 whitespace-nowrap">
              Wir automatisieren Ihr Unternehmen mit{" "}
              <span className="font-semibold bg-gradient-to-r from-[#283593] via-[#4f46e5] to-[#00bcd4] bg-clip-text text-transparent">
                KI
              </span>
            </p>
          </div>

          {/* Center: Navigation */}
          <nav className="hidden md:flex items-center gap-2 text-xs sm:text-sm">
            <motion.a
              href="/ueberuns"
              whileHover={{ y: -1, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="
                px-4 py-1.5 rounded-full
                text-[13px]
                text-slate-800
                bg-white/80
                border border-slate-200/80
                hover:bg-slate-900
                hover:text-white
                hover:border-slate-900
                transition-all
              "
            >
              Über uns
            </motion.a>

            <motion.a
              href="#"
              whileHover={{ y: -1, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="
                px-4 py-1.5 rounded-full
                text-[13px]
                text-slate-800
                bg-white/80
                border border-slate-200/80
                hover:bg-slate-900
                hover:text-white
                hover:border-slate-900
                transition-all
                shadow-[0_0_18px_rgba(40,53,147,0.25)]
              "
            >
              Unsere Lösungen
            </motion.a>

            <motion.a
              href="mailto:info@ki-partner24.de"
              whileHover={{ y: -1, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="
                px-4 py-1.5 rounded-full
                text-[13px]
                text-slate-800
                bg-white/80
                border border-slate-200/80
                hover:bg-slate-900
                hover:text-white
                hover:border-slate-900
                transition-all
              "
            >
              Kontakt
            </motion.a>
          </nav>

          {/* Right: CTA + Burger */}
          <div className="flex items-center gap-3">
            <motion.a
              href="#"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              className="
                hidden sm:inline-block
                relative group
                rounded-full
                focus:outline-none
                focus:ring-2 focus:ring-[#283593]/70 focus:ring-offset-2 focus:ring-offset-white
              "
            >
              <span
                className="
                  absolute inset-0 rounded-full
                  bg-gradient-to-r from-[#283593] via-[#4f46e5] to-[#00bcd4]
                  opacity-95
                  group-hover:opacity-100
                  shadow-[0_0_24px_rgba(40,53,147,0.7)]
                  group-hover:shadow-[0_0_32px_rgba(40,53,147,0.95)]
                  transition-all
                "
                aria-hidden="true"
              />
              <span
                className="
                  relative flex items-center gap-2
                  px-6 py-1.5
                  rounded-full
                  bg-slate-950
                  text-sm font-semibold
                  text-white
                "
              >
                <FaBolt className="w-3.5 h-3.5 text-cyan-300" />
                <span>Jetzt automatisieren</span>
                <span className="text-xs opacity-80 group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </span>
            </motion.a>

            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden text-3xl text-slate-900"
            >
              ☰
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
