// src/components/ServiceCards.jsx
import React, { useState } from "react";
import { services } from "../data/services";
import { Link } from "react-router-dom";
import * as Icons from "react-icons/fa";
import { motion } from "framer-motion";

export default function ServiceCards() {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <motion.section
      id="automations"
      className="relative py-20 px-4 max-w-7xl mx-auto"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* Futuristischer Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.16] bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] [background-size:46px_46px]" />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-[#020617] to-slate-950" />
        {/* Orbs */}
        <div className="absolute -top-24 left-0 h-64 w-64 rounded-full bg-cyan-500/35 blur-3xl" />
        <div className="absolute -bottom-32 right-0 h-72 w-72 rounded-full bg-[#283593]/45 blur-3xl" />
      </div>

      {/* Header mit KI-SERVICES Badge */}
      <div className="relative text-center mb-12 max-w-3xl mx-auto">
        <div className="mb-4 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-slate-950/80 px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.9)]" />
            <span className="text-[0.65rem] tracking-[0.28em] uppercase text-slate-300">
              KI-SERVICES
            </span>
          </div>
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Unsere{" "}
          <span className="bg-gradient-to-r from-indigo-300 via-cyan-300 to-sky-400 bg-clip-text text-transparent">
            KI-Services
          </span>{" "}
          im Überblick
        </h2>
        <p className="text-base text-slate-300/90 leading-relaxed">
          Wählen Sie aus unseren fertigen Automatisierungslösungen – oder lassen
          Sie eine individuelle KI-Automatisierung für Ihr Unternehmen
          entwickeln.
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 lg:gap-10">
        {services.map(
          ({ id, title, description, icon, url, isExternal, demoUrl }) => {
            const IconComponent = Icons[icon];

            const cardContent = (
              <motion.div
                onMouseEnter={() => setHoveredId(id)}
                onMouseLeave={() => setHoveredId(null)}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35 }}
                className="
                  relative
                  rounded-3xl 
                  p-[1px]
                  overflow-hidden
                  cursor-default 
                  h-full
                  transition-transform duration-300
                "
              >
                {/* Äußere „Neon“-Border */}
                <div
                  className={`
                    absolute inset-0 rounded-3xl
                    bg-gradient-to-br
                    from-cyan-400/40 via-slate-800 to-indigo-500/40
                    blur-[1px]
                    transition-opacity duration-300
                    ${
                      hoveredId === id
                        ? "opacity-100"
                        : "opacity-40"
                    }
                  `}
                />

                {/* Innere Card */}
                <div className="relative rounded-[1.35rem] h-full bg-slate-950/80 backdrop-blur-2xl border border-slate-800/90 px-6 sm:px-7 py-7 flex flex-col shadow-[0_0_40px_rgba(15,23,42,0.9)]">
                  {/* Top Glow-Bar */}
                  <div className="absolute inset-x-6 top-0 h-[2px] bg-gradient-to-r from-cyan-400 via-indigo-400 to-sky-500 opacity-70" />

                  {/* Icon + Titel + KI-Modul Badge */}
                  <div className="flex flex-col items-center mb-5">
                    {IconComponent && (
                      <div
                        className={`
                          w-14 h-14 rounded-2xl flex items-center justify-center
                          bg-slate-900/80
                          border
                          ${
                            hoveredId === id
                              ? "border-cyan-400/80 shadow-[0_0_25px_rgba(34,211,238,0.8)]"
                              : "border-slate-700/80 shadow-[0_0_20px_rgba(15,23,42,0.9)]"
                          }
                          transition-all duration-300
                        `}
                      >
                        <IconComponent className="w-7 h-7 text-cyan-200" />
                      </div>
                    )}

                    <h3 className="text-xl font-semibold text-white mt-4 text-center">
                      {title}
                    </h3>

                    {/* KI-Modul einsatzbereit Badge */}
                    <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-slate-900/80 px-3 py-1 border border-slate-700/80">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      <span className="text-[0.7rem] text-slate-300">
                        KI-Modul einsatzbereit
                      </span>
                    </div>
                  </div>

                  {/* Beschreibung */}
                  <p className="text-sm text-slate-200/90 leading-relaxed flex-1 mb-5 text-center">
                    {description}
                  </p>

                  {/* Bottom Buttons */}
                  <div className="mt-auto flex flex-col gap-2">
                    {demoUrl && (
                      <a
                        href={demoUrl}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noopener noreferrer" : undefined}
                        className="
                          relative
                          group
                          w-full
                          rounded-full
                          border border-[#1c2122]
                          bg-[#1c2122]
                          text-white 
                          text-sm font-medium
                          overflow-hidden
                          transition-all
                          text-center
                        "
                      >
                        {/* Gradient-Background on Hover */}
                        <span
                          className="
                            absolute inset-0 rounded-full
                            bg-gradient-to-r from-[#283593] via-[#4f46e5] to-[#00bcd4]
                            opacity-0 group-hover:opacity-100
                            transition-opacity duration-300
                          "
                        />
                        <span className="relative block px-4 py-2">
                          Termin vereinbaren
                        </span>
                      </a>
                    )}

                    {url && url !== demoUrl && (
                      <Link
                        to={url}
                        className="
                          w-full px-4 py-2 rounded-full text-xs font-medium 
                          border border-slate-600 
                          text-slate-100 bg-slate-900/60 
                          hover:bg-slate-800/80 
                          transition-colors text-center
                        "
                      >
                        Mehr Details
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            );

            return isExternal ? (
              <a
                key={id}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="h-full"
              >
                {cardContent}
              </a>
            ) : (
              <div key={id} className="h-full">
                {cardContent}
              </div>
            );
          }
        )}
      </div>

      {/* Globaler CTA unten */}
      <div className="mt-16 flex justify-center">
        <motion.a
          href="#"
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
            <Icons.FaMagic className="w-4 h-4 sm:w-5 sm:h-5 opacity-90 group-hover:translate-x-0.5 transition-transform" />
            <span>Individuelle KI-Automatisierung anfragen</span>
          </span>

          {/* Subtiler Glow-Ring innen */}
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
        </motion.a>
      </div>
    </motion.section>
  );
}
