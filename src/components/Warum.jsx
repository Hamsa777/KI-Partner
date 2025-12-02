// src/components/Warum.jsx
import React from "react";
import { motion } from "framer-motion";

export default function Warum() {
  return (
    <motion.section
      className="relative py-20 px-4 max-w-6xl mx-auto"
      initial={{ opacity: 0, x: -80 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.4 }}
    >
      {/* Hintergrund */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 opacity-[0.16] bg-[linear-gradient(to_right,#020617_1px,transparent_1px),linear-gradient(to_bottom,#020617_1px,transparent_1px)] [background-size:46px_46px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-[#020617] to-slate-950" />
        <div className="absolute -top-28 left-16 h-64 w-64 rounded-full bg-cyan-500/30 blur-3xl" />
        <div className="absolute bottom-[-6rem] right-[-3rem] h-80 w-80 rounded-full bg-indigo-600/40 blur-3xl" />
      </div>

      {/* Badge + Headline mittig */}
      <div className="relative flex flex-col items-center text-center mb-14">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-slate-950/80 px-4 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.9)]" />
          <span className="text-[0.65rem] tracking-[0.28em] uppercase text-slate-300">
            Nächster Schritt
          </span>
        </div>

        <h2 className="mt-1 text-3xl md:text-4xl font-bold text-white">
          Warum{" "}
          <span className="bg-gradient-to-r from-indigo-300 via-cyan-300 to-sky-400 bg-clip-text text-transparent">
            KI-Partner?
          </span>
        </h2>

        <p className="mt-4 max-w-2xl text-sm md:text-base text-slate-300/85">
          Weil Sie jemanden brauchen, der KI nicht nur „berät“, sondern
          wirklich mit Ihnen baut, integriert und in Ihrem Alltag stabil zum
          Laufen bringt.
        </p>
      </div>

      {/* Reason-Line */}
      <div className="relative rounded-3xl border border-slate-800/80 bg-slate-950/80 backdrop-blur-xl px-6 md:px-10 py-10 overflow-hidden">
        {/* Dezente Glow-Linien */}
        <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/80 to-transparent" />
        <div className="absolute inset-x-16 bottom-0 h-px bg-gradient-to-r from-transparent via-indigo-400/60 to-transparent" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.18] bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.3),transparent_55%),radial-gradient(circle_at_bottom,_rgba(79,70,229,0.3),transparent_55%)]" />

        <div className="relative flex flex-col gap-10">
          {/* Punkt 1 */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-slate-900 border border-cyan-400/70 flex items-center justify-center text-xs font-semibold text-cyan-300">
                  1
                </div>
                <p className="text-xs tracking-[0.22em] uppercase text-cyan-300/90">
                  Klarer Fokus
                </p>
              </div>
            </div>
            <div className="flex-1">
              <p className="text-sm md:text-base text-slate-100/90">
                <span className="font-semibold text-white">
                  Konzentriert auf KMU
                </span>{" "}
                statt auf theoretische Leuchtturmprojekte. Wir verstehen
                mittelständische Abläufe – und bauen KI darum herum, nicht
                andersherum.
              </p>
            </div>
          </div>

          {/* Punkt 2 */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-slate-900 border border-cyan-400/70 flex items-center justify-center text-xs font-semibold text-cyan-300">
                  2
                </div>
                <p className="text-xs tracking-[0.22em] uppercase text-cyan-300/90">
                  Konkrete Automatisierungen
                </p>
              </div>
            </div>
            <div className="flex-1">
              <p className="text-sm md:text-base text-slate-100/90 mb-3">
                Wir starten nicht mit einem „KI-Strategiepapier“, sondern mit
                einem klaren Engpass – zum Beispiel:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-slate-200/90">
                <div className="rounded-2xl border border-slate-700/80 bg-slate-900/70 px-4 py-3">
                  <p className="font-semibold text-white mb-1">
                    Dokumentenprüfung
                  </p>
                  <p className="text-slate-300/90 text-xs">
                    Verträge, Angebote, Reports schneller prüfen lassen.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-700/80 bg-slate-900/70 px-4 py-3">
                  <p className="font-semibold text-white mb-1">
                    Anfragen &amp; Leads
                  </p>
                  <p className="text-slate-300/90 text-xs">
                    Anfragen automatisch qualifizieren &amp; beantworten.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-700/80 bg-slate-900/70 px-4 py-3">
                  <p className="font-semibold text-white mb-1">
                    Offene Forderungen
                  </p>
                  <p className="text-slate-300/90 text-xs">
                    Smarte Mahn- und Follow-up-Prozesse per KI.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Punkt 3 */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-slate-900 border border-cyan-400/70 flex items-center justify-center text-xs font-semibold text-cyan-300">
                  3
                </div>
                <p className="text-xs tracking-[0.22em] uppercase text-cyan-300/90">
                  DSGVO &amp; Integration
                </p>
              </div>
            </div>
            <div className="flex-1">
              <p className="text-sm md:text-base text-slate-100/90 mb-3">
                Wir achten auf{" "}
                <span className="font-semibold text-white">
                  Datenschutz, Zugriffsrechte und echte Nutzbarkeit
                </span>{" "}
                im Team.
              </p>
              <div className="flex flex-wrap gap-3 text-xs text-slate-300/90">
                <span className="rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1">
                  DSGVO-konforme Setups
                </span>
                <span className="rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1">
                  Anbindung an bestehende Tools
                </span>
                <span className="rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1">
                  Gemeinsame Tests mit Ihrem Team
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
