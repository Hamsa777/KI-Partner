// src/components/ContactSection.jsx
import React from "react";
import { motion } from "framer-motion";
import { FaComments } from "react-icons/fa";

export default function ContactSection() {
  return (
    <div className="relative overflow-hidden">
      <motion.section
        className="relative py-20 mt-4 px-4 max-w-6xl mx-auto"
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.5 }}
      >
        {/* Background */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 opacity-[0.14] bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] [background-size:46px_46px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-[#020617] to-slate-950" />
          <div className="absolute -top-24 right-0 h-64 w-64 rounded-full bg-cyan-500/30 blur-3xl" />
          <div className="absolute bottom-[-4rem] left-[-3rem] h-80 w-80 rounded-full bg-[#283593]/45 blur-3xl" />
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-[1.3fr,1fr] gap-10 items-center">
          {/* Textseite */}
          <div className="text-center md:text-left">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-slate-950/80 px-4 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.9)]" />
              <span className="text-[0.65rem] tracking-[0.28em] uppercase text-slate-300">
                Nächster Schritt
              </span>
            </div>

          <h2 className="text-3xl font-bold mb-4 text-white">
  Blitzschnelle Implementierung in{" "}
  <span className="bg-gradient-to-r from-indigo-300 via-cyan-300 to-sky-400 bg-clip-text text-transparent">
    Ihr Unternehmen
  </span>
</h2>


            <p className="text-slate-200/90 mb-6 max-w-xl text-sm sm:text-base leading-relaxed mx-auto md:mx-0">
              Sie haben eine Automatisierung getestet und möchten diese in Ihrem
              Unternehmen einsetzen? Schreiben Sie uns kurz – wir klären in
              einem Call die Details und übernehmen die technische Umsetzung.
            </p>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 justify-center md:justify-start">
              {/* Mini-Timeline-Info 1 */}
              <div className="flex items-center gap-3 text-xs text-slate-300/90">
                <div className="flex flex-col items-center">
                  <div className="h-8 w-8 rounded-full border border-cyan-400/60 flex items-center justify-center text-[0.7rem] text-cyan-100">
                    1
                  </div>
                  <div className="h-10 w-[1px] bg-gradient-to-b from-cyan-400/60 to-transparent mt-1" />
                </div>
                <div>
                  <p className="font-semibold text-white mb-0.5">
                    Kurze Anfrage
                  </p>
                  <p className="text-[0.7rem] text-slate-400">
                    Sie schreiben uns Ihre Situation & Wünsche.
                  </p>
                </div>
              </div>

              {/* Mini-Timeline-Info 2 */}
              <div className="flex items-center gap-3 text-xs text-slate-300/90">
                <div className="flex flex-col items-center">
                  <div className="h-8 w-8 rounded-full border border-cyan-400/60 flex items-center justify-center text-[0.7rem] text-cyan-100">
                    2
                  </div>
                  <div className="h-10 w-[1px] bg-gradient-to-b from-cyan-400/60 to-transparent mt-1" />
                </div>
                <div>
                  <p className="font-semibold text-white mb-0.5">
                    Integrations-Call
                  </p>
                  <p className="text-[0.7rem] text-slate-400">
                    Wir definieren Setup, Schnittstellen & Zeitplan.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA-Card */}
          <div className="relative rounded-[1.8rem] border border-slate-800/90 bg-slate-950/80 backdrop-blur-2xl px-6 sm:px-8 py-8 text-center shadow-[0_0_45px_rgba(15,23,42,0.95)]">
            <div className="pointer-events-none absolute inset-[1px] rounded-[1.7rem] border border-slate-800/70" />
            <div className="absolute inset-x-8 top-0 h-[3px] bg-gradient-to-r from-cyan-400 via-indigo-400 to-sky-500" />

            <div className="relative">
              <p className="text-xs tracking-[0.22em] uppercase text-slate-400 mb-3">
                Direkt per E-Mail
              </p>

              <motion.a
                href="mailto:info@ki-partner24.de"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="
                  relative group
                  inline-flex items-center justify-center
                  rounded-full
                  bg-gradient-to-r from-[#283593] via-[#4f46e5] to-[#00bcd4]
                  p-[2px]
                  shadow-[0_0_30px_rgba(79,70,229,0.85)]
                  hover:shadow-[0_0_40px_rgba(79,70,229,1)]
                  transition-shadow
                  overflow-hidden
                "
              >
                <span
                  className="
                    absolute inset-0 rounded-full
                    bg-gradient-to-r from-[#283593] via-[#4f46e5] to-[#00bcd4]
                    opacity-0 group-hover:opacity-100
                    transition-opacity duration-300
                  "
                />

                <span
                  className="
                    relative flex items-center gap-2 sm:gap-3
                    px-7 sm:px-9 py-2.5 sm:py-3
                    rounded-full
                    bg-[#020617]
                    text-sm sm:text-base font-semibold
                    text-white
                  "
                >
                  <FaComments className="w-4 h-4 sm:w-5 sm:h-5 opacity-90 group-hover:translate-x-0.5 transition-transform" />
                  <span>Integrationsgespräch anfragen</span>
                </span>
              </motion.a>

              <p className="mt-4 text-xs text-slate-400">
                Jede Woche ohne Automatisierung kostet Sie messbar Zeit & Budget.
              </p>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
