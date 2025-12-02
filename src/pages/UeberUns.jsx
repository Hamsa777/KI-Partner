import React from "react";
import { motion } from "framer-motion";

export default function UeberUns() {
  return (
    <motion.section
      className="relative min-h-screen px-6 py-20 flex items-center"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
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

      <div className="relative max-w-5xl mx-auto">
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
        <div className="relative rounded-3xl border border-slate-800/80 bg-slate-950/80 backdrop-blur-xl px-6 sm:px-8 md:px-10 py-10 shadow-[0_0_40px_rgba(15,23,42,0.9)] overflow-hidden">
          {/* dezente Glow-Flächen */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.18] bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.32),transparent_55%),radial-gradient(circle_at_bottom,_rgba(129,140,248,0.26),transparent_55%)]" />

          <div className="relative grid grid-cols-1 md:grid-cols-[1.4fr,1fr] gap-8 md:gap-10 items-start">
            {/* Textseite */}
            <div className="text-left space-y-4">
              <p className="text-slate-100/90 text-base leading-relaxed">
                Wir sind ein technologiegetriebenes Team mit einer klaren
                Mission: Unternehmen durch KI effizienter, schlanker und
                zukunftssicher zu machen. Statt leerer Versprechen liefern wir
                automatisierte Lösungen, die wirklich funktionieren.
              </p>

              <p className="text-slate-100/90 text-base leading-relaxed">
                Aktuell bieten wir unsere{" "}
                <strong className="font-semibold text-white">
                  KI-gestützte Dokumenten-Analyse
                </strong>{" "}
                als vollautomatisierten Service an. Damit erhalten Sie aus
                Protokollen, Berichten und Dokumentationen sofort klare
                Entscheidungen, Risiken und umsetzbare Maßnahmen – direkt per
                E-Mail zurück an Ihr Team.
              </p>

              <p className="text-slate-100/90 text-base leading-relaxed">
                Bereits in Vorbereitung:{" "}
                <strong className="font-semibold text-white">
                  Kundenservice-Chatbots
                </strong>{" "}
                und{" "}
                <strong className="font-semibold text-white">
                  KI-basierte Telefonassistenten
                </strong>
                . Beide Tools werden Ihre Prozesse weiter automatisieren – ganz
                ohne technisches Vorwissen.
              </p>

              <p className="text-slate-100/90 text-base leading-relaxed">
                Unsere Lösungen sind einfach, bezahlbar und auf kleine &amp;
                mittlere Unternehmen zugeschnitten. So profitieren Sie schon
                heute von KI – ohne Risiko.
              </p>
            </div>

            {/* Futuristische Side-Cards */}
            <div className="space-y-4">
              <div className="rounded-2xl border border-cyan-400/40 bg-slate-900/80 px-4 py-4">
                <p className="text-[0.7rem] tracking-[0.18em] uppercase text-cyan-200/90 mb-2">
                  Aktiver Service
                </p>
                <p className="text-sm font-semibold text-white mb-1">
                  KI-Dokumenten-Analyse
                </p>
                <p className="text-xs text-slate-300/90">
                  Protokolle, Berichte und Dokumentationen automatisch
                  auswerten lassen – inklusive Risiken, Entscheidungen und
                  Maßnahmen.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-700/80 bg-slate-900/70 px-4 py-4">
                <p className="text-[0.7rem] tracking-[0.18em] uppercase text-slate-400 mb-2">
                  In Vorbereitung
                </p>
                <ul className="space-y-2 text-xs text-slate-200/90">
                  <li className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                    <span>Kundenservice-Chatbots für wiederkehrende Anfragen</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                    <span>KI-Telefonassistenten für eingehende &amp; ausgehende Gespräche</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-slate-700/80 bg-slate-900/70 px-4 py-4">
                <p className="text-[0.7rem] tracking-[0.18em] uppercase text-slate-400 mb-2">
                  Für wen wir bauen
                </p>
                <p className="text-xs text-slate-300/90">
                  Fokus auf kleinen und mittleren Unternehmen, die ohne großen
                  IT-Aufwand von moderner KI profitieren möchten.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="relative mt-10 flex justify-center">
            <a
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-[#283593] px-7 py-3 text-sm font-medium text-white hover:bg-[#1a237e] transition-colors shadow-[0_0_25px_rgba(49,130,206,0.45)]"
            >
              Zurück zur Startseite
            </a>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
