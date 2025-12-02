// src/components/Testimonials.jsx
import React from "react";
import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    name: "M. Schröder",
    role: "Geschäftsführer, Steuerkanzlei",
    quote:
      "Die Dokumenten-Analyse mit KI spart uns täglich mehrere Stunden. Verträge und Belege sind in Sekunden ausgewertet – früher hat das ein Mitarbeiter gemacht.",
  },
  {
    name: "A. Weber",
    role: "Inhaberin, Online-Shop",
    quote:
      "Das Lead-Nurturing läuft jetzt komplett automatisiert. Interessenten bekommen sofort Antworten und wir haben deutlich mehr Anfragen, die zu Kunden werden.",
  },
  {
    name: "T. Keller",
    role: "CFO, Dienstleistungsunternehmen",
    quote:
      "Durch das automatisierte Mahnverfahren sind unsere Außenstände spürbar gesunken. Die Integration war erstaunlich unkompliziert.",
  },
];

export default function Testimonials() {
  return (
    <motion.section
      className="relative py-20 px-4 max-w-6xl mx-auto"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      {/* Tech Lines Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 opacity-[0.12] bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] [background-size:46px_46px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020617]/80 to-slate-950" />
      </div>

      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
        <div>
          <p className="text-xs tracking-[0.35em] uppercase text-cyan-300/80 mb-3">
            TRUSTED BY MODERN TEAMS
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Referenzen aus{" "}
            <span className="bg-gradient-to-r from-indigo-300 via-cyan-300 to-emerald-300 bg-clip-text text-transparent">
              echten Projekten
            </span>
          </h2>
          <p className="text-sm md:text-base text-slate-300/85 max-w-xl">
            Von Steuerkanzlei bis Online-Shop: KI-Partner automatisiert
            wiederkehrende Prozesse, reduziert Kosten und schafft saubere
            Strukturen.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-300/80">
          <div className="h-9 w-9 rounded-full border border-cyan-400/60 flex items-center justify-center text-[0.65rem]">
            24/7
          </div>
          <p className="max-w-[220px]">
            KI-Automatisierung läuft im Hintergrund – während dein Team sich auf
            Wertschöpfung konzentriert.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, idx) => (
          <motion.article
            key={t.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -6 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.12, duration: 0.45 }}
            className="relative flex flex-col h-full rounded-2xl border border-slate-700/80 bg-slate-950/80 px-6 py-6 overflow-hidden"
          >
            {/* Top Accent Line */}
            <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-cyan-400 via-indigo-400 to-sky-500" />

            {/* Corner Node */}
            <div className="absolute -right-3 top-8 h-10 w-10 rounded-full border border-slate-700/70" />
            <div className="absolute -right-[1.6rem] top-[3.7rem] h-5 w-5 rounded-full bg-cyan-400/70 blur-sm opacity-60" />

            <div className="flex items-center justify-between mb-4">
              <FaQuoteLeft className="w-5 h-5 text-cyan-300" />
              <span className="text-[0.65rem] uppercase tracking-[0.2em] text-slate-400">
                Case {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
              </span>
            </div>

            <p className="text-sm md:text-[0.95rem] text-slate-100/90 mb-5 leading-relaxed">
              {t.quote}
            </p>

            <div className="mt-auto pt-4 border-t border-slate-700/80 flex flex-col">
              <p className="text-sm font-semibold text-white">{t.name}</p>
              <p className="text-[0.75rem] text-slate-400">{t.role}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
}
