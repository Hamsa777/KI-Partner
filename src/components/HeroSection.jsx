// src/components/HeroSection.jsx
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  FaCalculator,
  FaComments,
  FaServer,
  FaShieldAlt,
  FaGavel,
  FaBolt,
} from "react-icons/fa";

export default function HeroSection() {
  const reduceMotion = useReducedMotion();

  const pathAnim1 = reduceMotion
    ? { pathLength: 1, opacity: 1 }
    : { pathLength: [0, 1], opacity: [0, 1] };

  const pathAnim2 = reduceMotion
    ? { pathLength: 1, opacity: 1 }
    : { pathLength: [0, 1], opacity: [0, 1] };

  return (
    <section
      id="hero"
      className="relative isolate pt-20 sm:pt-18 pb-16 px-6 sm:px-8 overflow-hidden"
    >
      {/* ✅ HERO-OVERLAY (nur Deko) – blendet oben/unten weich aus */}
      <div
        aria-hidden
        className="
          pointer-events-none absolute inset-0 z-0
          [mask-image:linear-gradient(to_bottom,transparent_0%,black_14%,black_86%,transparent_100%)]
        "
      >
        {/* Soft Overlay (nur im Hero, ohne Base-Farbe) */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#020617]/30" />

        {/* Animierte Linien (wie SmartDrive Hero) */}
        <svg
          className="absolute inset-0 w-full h-full opacity-25"
          viewBox="0 0 1200 800"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M-100 600 Q 150 500 300 650 T 600 400"
            fill="none"
            stroke="url(#gradient1)"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={pathAnim1}
            transition={
              reduceMotion
                ? { duration: 0.8 }
                : { duration: 3.6, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }
            }
          />
          <motion.path
            d="M1300 200 Q 1050 300 900 150 T 600 400"
            fill="none"
            stroke="url(#gradient2)"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={pathAnim2}
            transition={
              reduceMotion
                ? { duration: 0.8 }
                : { duration: 4.6, delay: 0.8, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }
            }
          />
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4f46e5" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
            <linearGradient id="gradient2" x1="100%" y1="0%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#4f46e5" />
            </linearGradient>
          </defs>
        </svg>
{/* Symmetrische Orbs (links + rechts) */}
<div
  aria-hidden
  className="pointer-events-none absolute inset-0 opacity-90"
  style={{
    backgroundImage:
      "radial-gradient(600px 600px at 0% 50%, rgba(79,70,229,0.20), transparent 64%)," +
      "radial-gradient(600px 600px at 100% 50%, rgba(79,70,229,0.20), transparent 64%)",
  }}
/>
        {/* Bottom-Fade: verhindert “harte Schnittkante” */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[#020617]" />
      </div>

      {/* CONTENT */}
      <div className="mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 flex justify-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-slate-950/80 px-4 py-2 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
              <span className="text-[0.65rem] tracking-[0.28em] uppercase text-slate-200 font-semibold">
                KI-Automatisierung gezielt für KMU
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight max-w-5xl mx-auto text-white"
          >
            Ihr Unternehmen.{" "}
            <span className="bg-gradient-to-r from-indigo-300 via-cyan-300 to-sky-400 bg-clip-text text-transparent">
              Automatisiert.
            </span>
            <br />
            <span className="text-slate-300">Strukturiert. Skalierbar.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-6 text-base sm:text-xl text-slate-200 max-w-2xl mx-auto leading-relaxed"
          >
            Automatisieren Sie Ihre wiederkehrenden Geschäftsprozesse mit{" "}
            <span className="font-semibold text-white">KI.</span>
            <br />
            Für entlastete Teams und ein{" "}
            <span className="font-semibold bg-gradient-to-r from-indigo-300 via-cyan-300 to-sky-400 bg-clip-text text-transparent drop-shadow-[0_0_6px_rgba(79,70,229,0.45)]">
              zukunftssicheres Unternehmen.
            </span>
          </motion.p>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.55 }}
            className="mt-10 mb-2 grid grid-cols-2 sm:grid-cols-4 gap-10 justify-center"
          >
            {[
              { icon: <FaServer className="w-6 h-6" />, text: "In Deutschland gehostet" },
              { icon: <FaShieldAlt className="w-6 h-6" />, text: "DSGVO-konform" },
              { icon: <FaGavel className="w-6 h-6" />, text: "EU AI-Act konform" },
              { icon: <FaBolt className="w-6 h-6" />, text: "Schnelles Onboarding" },
            ].map((p) => (
              <div key={p.text} className="flex flex-col items-center text-center gap-2">
                <span className="text-cyan-300">{p.icon}</span>
                <span className="text-xs sm:text-sm font-semibold text-slate-100 leading-snug">
                  {p.text}
                </span>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.55 }}
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            <motion.button
              type="button"
              onClick={() => {
                const section = document.getElementById("roi-rechner");
                if (section) {
                  const rect = section.getBoundingClientRect();
                  const scrollTop = window.scrollY || window.pageYOffset;
                  const offset = 140;
                  window.scrollTo({
                    top: rect.top + scrollTop - offset,
                    behavior: "smooth",
                  });
                }
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{ willChange: "transform" }}
              className="
                relative group inline-flex items-center justify-center rounded-full
                bg-gradient-to-r from-[#283593] via-[#4f46e5] to-[#00bcd4]
                group-hover:from-[#4f46e5] group-hover:via-[#00bcd4] group-hover:to-[#283593]
                p-[2px] transform-gpu
                shadow-[0_0_18px_rgba(79,70,229,0.75)]
                hover:shadow-[0_0_24px_rgba(79,70,229,0.9)]
                transition-shadow duration-300
              "
            >
              <span className="flex items-center gap-3 px-7 sm:px-8 py-2.5 sm:py-3 rounded-full bg-[#020617] text-sm sm:text-base font-semibold text-white">
                <span>KI-Nutzen berechnen</span>
                <FaCalculator className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </span>
            </motion.button>

            <motion.a
              href="mailto:kontakt@ki-partner24.de"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{ willChange: "transform" }}
              className="
                relative group inline-flex items-center justify-center rounded-full
                border border-slate-500/70 bg-slate-900/60
                text-sm sm:text-base font-semibold text-slate-100
                px-7 sm:px-8 py-2.5 sm:py-3 transform-gpu
                hover:bg-slate-900/80 transition-colors overflow-hidden
              "
            >
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#283593] via-[#4f46e5] to-[#00bcd4] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 inline-flex items-center gap-2">
                <FaComments className="text-cyan-300" />
                Jetzt Kontakt aufnehmen
              </span>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}