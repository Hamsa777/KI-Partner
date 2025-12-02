// Variante 1 – Futuristisch, mit erweitertem ROI-Design & Background-Transitions
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaClock } from "react-icons/fa";
import { FaCalculator } from "react-icons/fa";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Services() {
  const [minutesPerDoc, setMinutesPerDoc] = useState(15);
  const [docsPerWeek, setDocsPerWeek] = useState(30);
  const [employees, setEmployees] = useState(3);
  const [savingFactor, setSavingFactor] = useState(70); // % Zeitersparnis durch KI
  const [hourlyWage, setHourlyWage] = useState(35); // Euro pro Stunde

  const roiRef = useRef(null);

  const totalMinutes =
    (Number(minutesPerDoc) || 0) *
    (Number(docsPerWeek) || 0) *
    (Number(employees) || 0);

  const savedMinutes = totalMinutes * ((Number(savingFactor) || 0) / 100);
  const savedHoursPerWeek = savedMinutes / 60;
  const savedHoursPerMonth = savedHoursPerWeek * 4.33;
  const savedHoursPerYear = savedHoursPerMonth * 12;

  const savedCostPerMonth = savedHoursPerMonth * (Number(hourlyWage) || 0);
  const savedCostPerYear = savedHoursPerYear * (Number(hourlyWage) || 0);

  const formatHours = (value) =>
    value.toLocaleString("de-DE", {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    });

  const formatCurrency = (value) =>
    value.toLocaleString("de-DE", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

  const monthlyHoursLabel = Number.isFinite(savedHoursPerMonth)
    ? `${formatHours(savedHoursPerMonth)} h`
    : "0 h";

  const yearlyHoursLabel = Number.isFinite(savedHoursPerYear)
    ? `${formatHours(savedHoursPerYear)} h`
    : "0 h";

  const monthlyCostLabel = Number.isFinite(savedCostPerMonth)
    ? formatCurrency(savedCostPerMonth)
    : "0 €";

  const yearlyCostLabel = Number.isFinite(savedCostPerYear)
    ? formatCurrency(savedCostPerYear)
    : "0 €";

  const handleScrollToRoi = () => {
    if (!roiRef.current) return;

    const rect = roiRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || window.pageYOffset;
    // Offset, damit der Button oben noch im Bild bleibt
    const offset = 140;
    const targetY = rect.top + scrollTop - offset;

    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });
  };

  return (
    <section className="min-h-screen text-indigo-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 space-y-16">
        {/* Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="space-y-4"
        >
         <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-slate-950/80 px-4 py-1.5">
  <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.9)]" />
  <span className="text-[0.65rem] tracking-[0.28em] uppercase text-slate-300">
    KI-Lösung · FÜR MESSBARE ZEITERSPARNIS
  </span>
</div>


          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
            Dokumentenanalyse{" "}
            <span className="bg-gradient-to-r from-indigo-300 via-cyan-300 to-sky-400 bg-clip-text text-transparent">
              mit KI
            </span>
          </h1>

          <p className="max-w-2xl text-sm sm:text-base text-indigo-100/80 leading-relaxed">
            Lange Protokolle, Berichte oder Dokumentationen?
            <br className="hidden sm:block" />
            Unsere KI liest für Sie mit, extrahiert die wichtigsten Punkte und
            liefert eine klare Zusammenfassung direkt in Ihr Postfach – in
            Sekunden statt Stunden.
          </p>
        </motion.div>

        {/* Vorher / Nachher */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="grid gap-6 lg:gap-8 lg:grid-cols-2"
        >
          {/* Vorher */}
          <div className="relative rounded-2xl border border-gray-700/60 bg-[#f9fafb] shadow-[0_18px_45px_rgba(0,0,0,0.42)] overflow-hidden">
            <div className="flex justify-between items-center px-4 sm:px-5 py-3 border-b border-gray-200 bg-white/90 backdrop-blur">
              <span className="text-xs sm:text-sm font-semibold text-[#b71c1c]">
                Vorher
              </span>
              <span className="text-[11px] sm:text-xs text-gray-500">
                Manuelles Protokolllesen
              </span>
            </div>

            <div className="p-4 sm:p-5 space-y-2 text-[11px] sm:text-xs text-gray-700 font-mono leading-relaxed">
              <div className="h-3 w-24 rounded bg-gray-200" />
              <div className="h-3 w-40 rounded bg-gray-200" />
              <div className="h-3 w-32 rounded bg-gray-200" />
              <p className="mt-3 line-clamp-6 text-[11px] sm:text-xs">
                17-seitiges Protokoll mit schwer lesbaren Sätzen, Wiederholungen
                und unklaren Zuständigkeiten. Mitarbeitende verbringen wertvolle
                Zeit damit, alle Informationen manuell zu filtern, zu
                strukturieren und die relevanten Entscheidungen zu identifizieren…
              </p>
              <div className="mt-3 space-y-1">
                <div className="h-2.5 w-full rounded bg-gray-200" />
                <div className="h-2.5 w-[90%] rounded bg-gray-200" />
                <div className="h-2.5 w-[75%] rounded bg-gray-200" />
                <div className="h-2.5 w-[85%] rounded bg-gray-200" />
              </div>
            </div>
          </div>

          {/* Nachher – futuristischer mit Gradient-Transition */}
          <div className="relative rounded-2xl bg-gradient-to-br from-[#283593] via-[#4f46e5] to-[#00bcd4] p-[1px] shadow-[0_18px_55px_rgba(15,23,42,0.95)] group">
            <div className="relative h-full rounded-2xl bg-[#020617] overflow-hidden transition-colors duration-300 group-hover:bg-[#02091f]">
              {/* zarter innerer Glow */}
              <div className="pointer-events-none absolute inset-0 opacity-[0.18] bg-[radial-gradient(circle_at_top,_rgba(129,140,248,0.65)_0,_transparent_55%),radial-gradient(circle_at_bottom,_rgba(45,212,191,0.6)_0,_transparent_60%)]" />

              <div className="relative flex justify-between items-center px-4 sm:px-5 py-3 border-b border-indigo-500/40 bg-[#020617]/95 backdrop-blur">
                <span className="text-xs sm:text-sm font-semibold text-emerald-300">
                  Nachher
                </span>
                <span className="text-[11px] sm:text-xs text-indigo-100">
                  Automatisierte KI-Zusammenfassung per E-Mail
                </span>
              </div>

              <div className="relative p-4 sm:p-5 space-y-3 text-xs sm:text-sm text-indigo-50">
                <p className="text-[11px] sm:text-xs uppercase tracking-wide text-indigo-200/80">
                  Betreff:
                  <span className="font-semibold">
                    {" "}
                    Zusammenfassung Ihres Dokuments
                  </span>
                </p>

                <div className="space-y-2">
                  <p className="font-semibold text-sm sm:text-base text-white">
                    Wichtigste Entscheidungen
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-[11px] sm:text-xs text-indigo-50/90">
                    <li>3 klare To-Dos mit Verantwortlichkeiten und Fristen</li>
                    <li>Risikobewertung und nächste Schritte kompakt dargestellt</li>
                    <li>Automatisch generierte Kurzversion für das Management</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <p className="font-semibold text-sm sm:text-base text-white">
                    Zeitersparnis
                  </p>
                  <p className="text-[11px] sm:text-xs text-indigo-100/80">
                    Statt 30–45 Minuten Lesezeit pro Dokument nur noch wenige
                    Sekunden, um die Zusammenfassung zu prüfen – die KI übernimmt
                    das aufwendige Lesen und Strukturieren.
                  </p>
                </div>

                <div className="pt-2 border-t border-indigo-500/30 text-[11px] sm:text-xs text-indigo-200/80">
                  <p>
                    Vollständig in Ihre bestehende E-Mail-Struktur integrierbar –
                    auf Wunsch pro Team, Projekt oder Standort.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          className="flex justify-center"
        >
          <motion.button
            type="button"
            onClick={handleScrollToRoi}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="
              relative group
              inline-flex items-center justify-center
              rounded-full
              bg-gradient-to-r from-[#283593] via-[#4f46e5] to-[#00bcd4]
              p-[2px]
              shadow-[0_0_26px_rgba(79,70,229,0.85)]
              hover:shadow-[0_0_36px_rgba(79,70,229,1)]
              transition-shadow
            "
          >
            <span
              className="
                flex items-center gap-2 sm:gap-3
                px-7 sm:px-9 py-2.5 sm:py-3
                rounded-full
                bg-[#020617]
                text-sm sm:text-base font-semibold
                text-white
              "
            >
              <span>Jetzt Zeit-und Geldersparnis berechnen</span>
              <FaArrowRight className="w-4 h-4 sm:w-5 sm:h-5 opacity-90 group-hover:translate-x-1 transition-transform" />
            </span>

            <span
              className="
                pointer-events-none
                absolute inset-0 rounded-full
                bg-gradient-to-r from-transparent via-white/10 to-transparent
                opacity-0 group-hover:opacity-100
                blur-md
                transition-opacity
              "
            />
          </motion.button>
        </motion.div>

        {/* ROI-Rechner – Variante mit Gradient-Inputs & Icon-Glow */}
        <motion.div
          id="roi-rechner"
          ref={roiRef}
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.25 }}
          className="
            mt-8 relative rounded-3xl
            bg-gradient-to-br from-[#020617] via-[#020617] to-[#020617]
            p-[1px]
            shadow-[0_0_55px_rgba(15,23,42,0.9)]
          "
        >
          <div className="relative rounded-3xl overflow-hidden group">
            {/* Futuristische Overlay-Gradients im Hintergrund */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.35)_0,_transparent_55%),radial-gradient(circle_at_bottom,_rgba(6,182,212,0.4)_0,_transparent_60%)] opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute -left-24 top-10 h-40 w-40 rounded-full bg-cyan-400/20 blur-3xl transition-all duration-500 group-hover:translate-x-6 group-hover:-translate-y-2" />
              <div className="absolute -right-24 bottom-0 h-52 w-52 rounded-full bg-indigo-500/25 blur-3xl transition-all duration-500 group-hover:-translate-x-4 group-hover:-translate-y-4" />
            </div>

            <div
              className="
                relative rounded-3xl bg-white/95
                p-5 sm:p-7 lg:p-8
                border border-[#1d4ed8]/30
                transition-all duration-500
                hover:shadow-[0_26px_80px_rgba(15,23,42,0.55)]
                group-hover:border-[#2563eb]/70
                group-hover:bg-white
              "
            >
              {/* Header mit Icon im Button-Style */}
              <div className="relative flex items-center gap-3 mb-4 sm:mb-6 group/icon">
                <div
                  className="
                    relative inline-flex items-center justify-center
                    rounded-full
                    bg-gradient-to-r from-[#283593] via-[#4f46e5] to-[#00bcd4]
                    p-[2px]
                    shadow-[0_0_20px_rgba(79,70,229,0.9)]
                    group-hover/icon:shadow-[0_0_28px_rgba(79,70,229,1)]
                    transition-shadow duration-300
                  "
                >
                  <div
                    className="
                      flex h-11 w-11 items-center justify-center
                      rounded-full bg-[#020617]
                    "
                  >
                    <FaCalculator className="text-white text-xl sm:text-2xl" />
                  </div>
                  {/* Innerer Glow-Ring */}
                  <span
                    className="
                      pointer-events-none absolute inset-0 rounded-full
                      bg-gradient-to-r from-transparent via-white/10 to-transparent
                      opacity-0 group-hover/icon:opacity-100
                      blur-md transition-opacity
                    "
                  />
                </div>

                <div>
                  <h2 className="text-lg sm:text-xl font-semibold">
                    <span className="block text-[#0f172a]">
                      ROI-Rechner:
                      <span className="ml-1 bg-gradient-to-r from-[#1d4ed8] via-[#38bdf8] to-[#a5b4fc] bg-clip-text text-transparent">
                        Zeit- & Kosteneinsparung
                      </span>
                    </span>
                  </h2>
                  <p className="mt-1 text-xs sm:text-sm text-gray-600">
                    Berechnen Sie, wie viele Stunden und Lohnkosten Ihr
                    Unternehmen{" "}
                    <span className="font-semibold text-[#04275f]">
                      pro Monat und pro Jahr
                    </span>{" "}
                    spart, wenn KI Ihre Dokumente automatisch analysiert.
                  </p>
                </div>
              </div>

              <div className="relative grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
                {/* Eingaben – mit Gradient-Rand & dicker bei Fokus */}
                <div className="space-y-4 sm:space-y-5 relative z-10">
                  <div className="space-y-1">
                    <label className="block text-xs sm:text-sm font-medium text-gray-800">
                      Durchschnittliche Lesezeit pro Dokument (in Minuten)
                    </label>
                    <div
                      className="
                        relative rounded-xl
                        bg-gradient-to-r from-[#283593] via-[#4f46e5] to-[#00bcd4]
                        p-[1px]
                        focus-within:p-[2px]
                        transition-all duration-200
                      "
                    >
                      <input
                        type="number"
                        min="0"
                        value={minutesPerDoc}
                        onChange={(e) => setMinutesPerDoc(e.target.value)}
                        className="
                          w-full rounded-[0.75rem]
                          bg-[#f9fafb]
                          px-3 py-2 text-sm text-gray-900
                          focus:outline-none
                        "
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs sm:text-sm font-medium text-gray-800">
                      Anzahl Dokumente/Protokolle pro Woche
                    </label>
                    <div
                      className="
                        relative rounded-xl
                        bg-gradient-to-r from-[#283593] via-[#4f46e5] to-[#00bcd4]
                        p-[1px]
                        focus-within:p-[2px]
                        transition-all duration-200
                      "
                    >
                      <input
                        type="number"
                        min="0"
                        value={docsPerWeek}
                        onChange={(e) => setDocsPerWeek(e.target.value)}
                        className="
                          w-full rounded-[0.75rem]
                          bg-[#f9fafb]
                          px-3 py-2 text-sm text-gray-900
                          focus:outline-none
                        "
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs sm:text-sm font-medium text-gray-800">
                      Mitarbeitende, die regelmäßig lesen und auswerten
                    </label>
                    <div
                      className="
                        relative rounded-xl
                        bg-gradient-to-r from-[#283593] via-[#4f46e5] to-[#00bcd4]
                        p-[1px]
                        focus-within:p-[2px]
                        transition-all duration-200
                      "
                    >
                      <input
                        type="number"
                        min="0"
                        value={employees}
                        onChange={(e) => setEmployees(e.target.value)}
                        className="
                          w-full rounded-[0.75rem]
                          bg-[#f9fafb]
                          px-3 py-2 text-sm text-gray-900
                          focus:outline-none
                        "
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs sm:text-sm font-medium text-gray-800">
                      Geschätzte Zeitersparnis durch KI (in %)
                    </label>
                    <div
                      className="
                        relative rounded-xl
                        bg-gradient-to-r from-[#283593] via-[#4f46e5] to-[#00bcd4]
                        p-[1px]
                        focus-within:p-[2px]
                        transition-all duration-200
                      "
                    >
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={savingFactor}
                        onChange={(e) => setSavingFactor(e.target.value)}
                        className="
                          w-full rounded-[0.75rem]
                          bg-[#f9fafb]
                          px-3 py-2 text-sm text-gray-900
                          focus:outline-none
                        "
                      />
                    </div>
                    <p className="text-[11px] sm:text-xs text-gray-500">
                      In den meinsten Fällen sind{" "}
                      <span className="font-medium text-[#1d4ed8]">70–80%</span>{" "}
                      der realistische Richtwert.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs sm:text-sm font-medium text-gray-800">
                      Durchschnittlicher Stundenlohn (Bruttokosten) pro
                      Mitarbeiter in €
                    </label>
                    <div
                      className="
                        relative rounded-xl
                        bg-gradient-to-r from-[#283593] via-[#4f46e5] to-[#00bcd4]
                        p-[1px]
                        focus-within:p-[2px]
                        transition-all duration-200
                      "
                    >
                      <input
                        type="number"
                        min="0"
                        value={hourlyWage}
                        onChange={(e) => setHourlyWage(e.target.value)}
                        className="
                          w-full rounded-[0.75rem]
                          bg-[#f9fafb]
                          px-3 py-2 text-sm text-gray-900
                          focus:outline-none
                        "
                      />
                    </div>
                    <p className="text-[11px] sm:text-xs text-gray-500">
                      Tipp: Rechnen Sie hier mit{" "}
                      <span className="font-medium text-[#1d4ed8]">
                        Gesamt-Bruttokosten
                      </span>{" "}
                      (inkl. Lohnnebenkosten), z. B. 30–60 € pro Stunde.
                    </p>
                  </div>
                </div>

                {/* Ergebnisse – rechter Container bleibt blau/futuristisch */}
                <div className="flex flex-col justify-between rounded-2xl bg-gradient-to-br from-[#020617] via-[#020617] to-[#020617] border border-indigo-500/40 p-5 sm:p-6 shadow-[0_0_35px_rgba(56,189,248,0.35)] relative z-10">
                  <div className="space-y-4 sm:space-y-5">
                    <p className="text-xs sm:text-sm text-indigo-100/80">
                      Auf Basis Ihrer Eingaben sehen Sie, wie viel Zeit und
                      Lohnkosten Ihre Teams durch KI-Dokumentenanalyse{" "}
                      <span className="font-semibold text-[#c7d2fe]">
                        monatlich und jährlich
                      </span>{" "}
                      einsparen können.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="rounded-xl bg-white/5 border border-indigo-400/50 p-4">
                        <p className="text-[11px] sm:text-xs text-indigo-200/90">
                          Gesparte Stunden / Monat
                        </p>
                        <p className="mt-1 text-xl sm:text-2xl font-semibold text-white">
                          {monthlyHoursLabel}
                        </p>
                      </div>

                      <div className="rounded-xl bg-white/5 border border-indigo-400/50 p-4">
                        <p className="text-[11px] sm:text-xs text-indigo-200/90">
                          Gesparte Stunden / Jahr
                        </p>
                        <p className="mt-1 text-xl sm:text-2xl font-semibold text-white">
                          {yearlyHoursLabel}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="rounded-xl bg-emerald-500/10 border border-emerald-400/60 p-4">
                        <p className="text-[11px] sm:text-xs text-emerald-100/90">
                          Gesparte Lohnkosten / Monat
                        </p>
                        <p className="mt-1 text-xl sm:text-2xl font-semibold text-emerald-200">
                          {monthlyCostLabel}
                        </p>
                      </div>

                      <div className="rounded-xl bg-emerald-500/10 border border-emerald-400/60 p-4">
                        <p className="text-[11px] sm:text-xs text-emerald-100/90">
                          Gesparte Lohnkosten / Jahr
                        </p>
                        <p className="mt-1 text-xl sm:text-2xl font-semibold text-emerald-200">
                          {yearlyCostLabel}
                        </p>
                      </div>
                    </div>

                    <div className="mt-2 text-[11px] sm:text-xs text-indigo-200/80">
                      <p>
                        Diese Zahlen zeigen nur den Effekt auf die reinen
                        Lohnkosten. Der tatsächliche Mehrwert ist oft noch höher:
                        schnellere Entscheidungen, weniger Fehler und fokussiertere
                        Teams.
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex justify-center">
                    <motion.a
                      href="#"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="
                        relative group
                        inline-flex items-center justify-center
                        rounded-full
                        bg-gradient-to-r from-[#283593] via-[#4f46e5] to-[#00bcd4]
                        p-[2px]
                        shadow-[0_0_20px_rgba(79,70,229,0.9)]
                        hover:shadow-[0_0_28px_rgba(79,70,229,1)]
                        transition-shadow
                      "
                    >
                      <span
                        className="
                          flex items-center gap-2 px-5 py-2
                          rounded-full bg-[#020617]
                          text-xs sm:text-sm font-semibold text-white
                        "
                      >
                        <span>Gespräch zur Dokumentenanalyse anfragen</span>
                        <FaArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 opacity-90 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </motion.a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
