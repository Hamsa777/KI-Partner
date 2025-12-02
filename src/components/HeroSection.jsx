// Variante 1 – Futuristischer Center-Hero mit Glow & Gradient-Buttons
// src/components/HeroSection.jsx
import { motion } from "framer-motion";
import { FaCalculator } from "react-icons/fa";
const logos = [
  {
    src: "https://kocherimmo.ch/wp-content/uploads/2024/12/kocherimmobilien-logo-rgb-white-pos-transparent.png",
    alt: "Unternehmen 1",
  },
  {
    src: "https://kaltenegger-real.at/wp-content/uploads/2022/08/Kaltenegger-Logo-Gold.png",
    alt: "Unternehmen 2",
  },
  {
    src: "https://malerbieri.ch/wp-content/uploads/2023/02/LogoPur2021.png",
    alt: "Unternehmen 3",
  },
  {
    src: "https://www.drburger.at/wp-content/uploads/2022/02/dr-burger-logo.svg",
    alt: "Unternehmen 4",
  },
  {
    src: "https://star-schlosserei.at/wp-content/uploads/2025/07/cakmak-ve-kalem.pdf-e1746309134561.webp",
    alt: "Unternehmen 5",
  },
  {
    src: "https://webgorilla.ch/wp-content/uploads/2022/03/Webgorilla-Logo-Vektor.svg",
    alt: "Unternehmen 6",
  },
  {
    src: "https://www.steuerberatung-hackl.at/wordpress/wp-content/uploads/2021/11/Steuerberater-Hackl-Logo.png",
    alt: "Unternehmen 7",
  },
  {
    src: "https://www.team23tax.at/wp-content/themes/team23-v45/assets/images/logo-cream.svg",
    alt: "Unternehmen 8",
  },
  {
    src: "http://www.lmkfz.at/assets/img/lmkfz_logo.webp",
    alt: "Unternehmen 9",
  },
  {
    src: "https://www.binder-bern.ch/media/pages/home/03d62dca99-1696492986/binder-logo-178x50@2x.png",
    alt: "Unternehmen 10",
  },
  {
    src: "https://lirp.cdn-website.com/169b3a2f/dms3rep/multi/opt/Logo-Netpulse-white-264w.png",
    alt: "Unternehmen 11",
  },
];

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative pt-16 pb-16 text-center px-6 sm:px-8 overflow-hidden"
    >
      {/* Futuristischer Hintergrund */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.14] bg-[linear-gradient(to_right,rgba(15,23,42,0.6)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.6)_1px,transparent_1px)] [background-size:46px_46px]" />
        {/* Soft Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-[#020617] to-slate-950" />
        {/* Orbs */}
        <div className="absolute -top-32 -left-10 h-72 w-72 rounded-full bg-[#283593]/45 blur-3xl" />
        <div className="absolute -bottom-40 right-[-3rem] h-80 w-80 rounded-full bg-cyan-500/35 blur-3xl" />
      </div>

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8 flex justify-center"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-slate-950/80 px-4 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
          <span className="text-[0.65rem] tracking-[0.28em] uppercase text-slate-200">
            KI-Automatisierung gezielt für KMU
          </span>
        </div>
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight max-w-4xl mx-auto text-white"
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
  className="
    mt-6 text-base sm:text-xl
    text-slate-200 max-w-2xl mx-auto
    leading-relaxed
  "
>
  Automatisieren Sie Ihre wiederkehrenden Geschäftsprozesse mit{" "}
  <span className="font-semibold text-white">
    KI.
  </span>
  <br />
  Für entlastete Teams und ein{" "}
  <span
    className="
      font-semibold
      bg-gradient-to-r from-indigo-300 via-cyan-300 to-sky-400
      bg-clip-text text-transparent
      drop-shadow-[0_0_6px_rgba(79,70,229,0.45)]
    "
  >
    zukunftssicheres Unternehmen.
  </span>
</motion.p>





      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-9 flex flex-wrap justify-center gap-4"
      >
      {/* Primary Button – smooth scroll */}
<motion.button
  onClick={() => {
    const section = document.getElementById("roi-rechner");
    if (section) {
      const rect = section.getBoundingClientRect();
      const scrollTop = window.scrollY || window.pageYOffset;
      const offset = 140; // damit der Bereich etwas unter dem oberen Rand startet

      window.scrollTo({
        top: rect.top + scrollTop - offset,
        behavior: "smooth",
      });
    }
  }}
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
      flex items-center gap-3
      px-7 sm:px-7 py-2.5 sm:py-3
      rounded-full
      bg-[#020617]
      text-sm sm:text-base font-semibold
      text-white
    "
  >
    <span>KI-Nutzen berechnen</span>
    <FaCalculator className="w-4 h-4 sm:w-5 sm:h-5 text-[#ffffff]" />
  </span>
</motion.button>


        {/* Secondary Button – mailto */}
        <motion.a
  href="mailto:info@ki-partner24.de"
  whileHover={{ scale: 1.03 }}
  whileTap={{ scale: 0.97 }}
  className="
    relative group
    inline-flex items-center justify-center
    rounded-full
    border border-slate-500/70
    bg-slate-900/60
    text-sm sm:text-base font-medium
    text-slate-100
    px-7 sm:px-7 py-2.5 sm:py-3
    hover:bg-slate-900/80
    transition-colors
    overflow-hidden
  "
>
  {/* Hover-Gradient-Overlay */}
  <span
    className="
      absolute inset-0 rounded-full
      bg-gradient-to-r from-[#283593] via-[#4f46e5] to-[#00bcd4]
      opacity-0 group-hover:opacity-100
      transition-opacity duration-300
    "
  />

  {/* Button-Text */}
  <span className="relative z-10">
    Jetzt Kontakt aufnehmen
  </span>
</motion.a>

      </motion.div>

      {/* Runde Icon-Leiste */}
      <div className="mt-10 flex flex-wrap justify-center gap-8 sm:gap-10 text-xs sm:text-sm text-slate-200">
        <div className="flex flex-col items-center gap-2">
          <img
            src="https://www.octonomy.ai/wp-content/uploads/2025/01/hosted_in_germany_icon.svg"
            alt="Gehostet in Deutschland"
            className="w-12 h-12"
          />
          <span>In Deutschland gehostet</span>
        </div>

        <div className="flex flex-col items-center gap-2">
          <img
            src="https://www.octonomy.ai/wp-content/uploads/2025/01/gdpr_compliant_logo.svg"
            alt="DSGVO konform"
            className="w-12 h-12"
          />
          <span>DSGVO-konform</span>
        </div>

        <div className="flex flex-col items-center gap-2">
          <img
            src="https://www.octonomy.ai/wp-content/uploads/2025/01/eu_ai_act_compliant_icon.svg"
            alt="EU AI Act konform"
            className="w-12 h-12"
          />
          <span>EU AI-Act konform</span>
        </div>

        <div className="flex flex-col items-center gap-2">
          <img
            src="https://cdn-icons-png.flaticon.com/128/18292/18292158.png"
            alt="Schnelles Onboarding"
            className="w-12 h-12 rounded-full"
          />
          <span>Schnelles Onboarding</span>
        </div>
      </div>

      {/* Carousel */}
      <div className="mt-12">
        <p className="text-[11px] sm:text-[12px] uppercase tracking-[0.25em] text-slate-400 mb-8">
          Ausgewählte Unternehmen, die von Automatisierung profitieren
        </p>

        <div className="overflow-hidden">
          <motion.div
            className="flex items-center gap-12 min-w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 25,
              ease: "linear",
              repeat: Infinity,
              repeatType: "loop",
            }}
          >
            {[...logos, ...logos].map((logo, index) => (
              <div key={index} className="flex items-center justify-center">
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-10 sm:h-12 w-auto opacity-80 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
