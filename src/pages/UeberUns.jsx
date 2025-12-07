import React from "react";
import { motion } from "framer-motion";

export default function UeberUns() {
  return (
    <motion.section
      className="relative min-h-screen px-6 py-20 flex items-center"
     
    >
      {/* Futuristischer Hintergrund */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.14] bg-[linear-gradient(to_right,#111827_1px,transparent_1px),linear-gradient(to_bottom,#111827_1px,transparent_1px)] [background-size:46px_46px]" />
        {/* Dark Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-[#020617] to-slate-950" />
        {/* Orbs */}
        <div className="absolute -top-40 left-10 h-80 w-80 rounded-full bg-cyan-500/30 blur-3xl" />
        <div className="absolute top-1/3 -right-32 h-72 w-72 rounded-full bg-indigo-600/40 blur-3xl" />
        <div className="absolute bottom-[-6rem] left-1/4 h-64 w-64 rounded-full bg-sky-500/30 blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto w-full">
        {/* Badge + Titel */}
        <div className="text-center mb-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-slate-950/80 px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.9)]" />
            <span className="text-[0.65rem] tracking-[0.28em] uppercase text-slate-300">
              Über uns
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">
            Über{" "}
            <span className="bg-gradient-to-r from-indigo-300 via-cyan-300 to-sky-400 bg-clip-text text-transparent">
              KI-Partner
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300/90 max-w-2xl mx-auto">
            KI-Automatisierungen, die im Alltag funktionieren – nicht nur in
            Präsentationen.
          </p>
        </div>

        {/* Content-Box */}
        <div className="relative rounded-3xl border border-slate-800/80 bg-slate-950/80 backdrop-blur-xl px-6 sm:px-8 md:px-10 py-10 shadow-[0_0_40px_rgba(15,23,42,0.9)] overflow-visible">
          {/* dezente Glow-Flächen */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.18] bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.32),transparent_55%),radial-gradient(circle_at_bottom,_rgba(129,140,248,0.26),transparent_55%)]" />

          <div className="relative grid grid-cols-1 md:grid-cols-[1.4fr,1fr] gap-8 md:gap-10">
            {/* Textseite */}
            <div className="text-left space-y-4">
              <p className="text-slate-100/90 text-base leading-relaxed">
                Wir sind ein technologiegetriebenes Team mit einer klaren
                Mission: Unternehmen durch KI effizienter, schlanker und
                zukunftssicher zu machen. Statt leerer Versprechen liefern wir
                automatisierte Lösungen, die wirklich im Alltag funktionieren.
              </p>

              <p className="text-slate-100/90 text-base leading-relaxed">
                Heute setzen wir für unsere Kunden unter anderem{" "}
                <strong className="font-semibold text-white">
                  Lead-Nurturing mit KI
                </strong>
                ,{" "}
                <strong className="font-semibold text-white">
                  KI-gestützte Dokumentenanalyse
                </strong>
                ,{" "}
                <strong className="font-semibold text-white">
                  automatisierte Mahnverfahren
                </strong>
                ,{" "}
                <strong className="font-semibold text-white">
                  Google Review Automatisierung
                </strong>
                ,{" "}
                <strong className="font-semibold text-white">
                  automatisierte E-Mail-Zuordnung
                </strong>{" "}
                sowie{" "}
                <strong className="font-semibold text-white">
                  AI-Voice Agents
                </strong>{" "}
                ein – alles produktiv im Einsatz, nicht nur „in Planung“.
              </p>

              <p className="text-slate-100/90 text-base leading-relaxed">
                Unsere Automatisierungen greifen ineinander: vom ersten Lead bis
                zur Zahlungserinnerung – von Inbox bis Telefon.
              </p>

              <p className="text-slate-100/90 text-base leading-relaxed">
                Unsere Lösungen sind einfach zu bedienen, klar kalkulierbar und
                auf kleine &amp; mittlere Unternehmen zugeschnitten. So
                profitieren Sie schon heute von KI – ohne eigenes Entwicklerteam.
              </p>
            </div>

            {/* Services Cards */}
            <div className="space-y-4">
              {/* Services */}
              <div className="rounded-2xl border border-cyan-400/40 bg-slate-900/80 px-4 py-4">
                <p className="text-[0.7rem] tracking-[0.18em] uppercase text-cyan-200/90 mb-2">
                  Unsere Services
                </p>
                <ul className="space-y-2 text-xs text-slate-200/90">
                  <li className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                    <span>Lead-Nurturing mit KI</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                    <span>KI-gestützte Dokumentenanalyse</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                    <span>Automatisiertes Mahnverfahren</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                    <span>Google Review Automatisierung</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                    <span>Automatisierte E-Mail-Zuordnung</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                    <span>AI-Voice Agents</span>
                  </li>
                </ul>
              </div>

              {/* Nutzen-Card */}
              <div className="rounded-2xl border border-slate-700/80 bg-slate-900/70 px-4 py-4">
                <p className="text-[0.7rem] tracking-[0.18em] uppercase text-slate-400 mb-2">
                  Wie Sie profitieren
                </p>
                <ul className="space-y-1.5 text-xs text-slate-200/90">
                  <li className="flex gap-2">
                    <span className="mt-1 h-1 w-1 rounded-full bg-cyan-300" />
                    <span>Weniger manuelle Arbeit</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 h-1 w-1 rounded-full bg-cyan-300" />
                    <span>Schnellere Reaktionszeiten</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 h-1 w-1 rounded-full bg-cyan-300" />
                    <span>Strukturierte Prozesse</span>
                  </li>
                </ul>
              </div>

              {/* Zielgruppe */}
              <div className="rounded-2xl border border-slate-700/80 bg-slate-900/70 px-4 py-4">
                <p className="text-[0.7rem] tracking-[0.18em] uppercase text-slate-400 mb-2">
                  Für wen wir bauen
                </p>
                <p className="text-xs text-slate-300/90">
                  Fokus auf KMU, Dienstleister &amp; Spezialbetriebe, die ohne
                  komplexe IT-Projekte von KI profitieren möchten.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="relative mt-10 flex justify-center">
            <motion.a
              href="/"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="
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
                  px-7 sm:px-7 py-2.5 sm:py-3
                  rounded-full
                  bg-[#020617]
                  text-sm sm:text-base font-semibold
                  text-white
                "
              >
                Zurück zur Startseite
              </span>
            </motion.a>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
