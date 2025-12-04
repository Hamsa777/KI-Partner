import React, { useState, useEffect } from "react";
import logo from "../assets/logo.svg";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollDirection, setScrollDirection] = useState("up");

  const navigate = useNavigate();
  const location = useLocation();

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

  const handleSolutionsClick = () => {
    const scrollToSection = () => {
      const el = document.getElementById("automations");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    };

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(scrollToSection, 120);
    } else {
      scrollToSection();
    }
  };

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

            <motion.button
              type="button"
              onClick={handleSolutionsClick}
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
              Unsere Lösungen
            </motion.button>

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
              href="https://cal.com/ki-partner24"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="
                hidden sm:inline-block
                relative group
                inline-flex items-center justify-center
                rounded-full
                bg-gradient-to-r from-[#283593] via-[#4f46e5] to-[#00bcd4]
                group-hover:from-[#4f46e5] group-hover:via-[#00bcd4] group-hover:to-[#283593]
                p-[2px]
                shadow-[0_0_28px_rgba(79,70,229,0.9)]
                hover:shadow-[0_0_36px_rgba(79,70,229,1)]
                transition-shadow duration-300
              "
            >
              <span
                className="
                  flex items-center justify-center
                  px-6 py-2
                  rounded-full
                  bg-[#020617]
                  text-sm font-semibold
                  text-white
                "
              >
                Kostenloses Erstgespräch
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
