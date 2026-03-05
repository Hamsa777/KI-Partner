// src/components/Header.jsx
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaComments } from "react-icons/fa";
import logo from "../assets/logo-white.svg";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const handleSolutionsClick = () => {
    const scrollToSection = () => {
      const el = document.getElementById("automations");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(scrollToSection, 120);
    } else {
      scrollToSection();
    }
  };

  const headerHoverBtnClass =
    "relative group inline-flex items-center justify-center rounded-full " +
    "border border-slate-500/70 bg-slate-900/60 " +
    "text-sm font-semibold text-slate-100 " +
    "hover:bg-slate-900/80 transition-colors overflow-hidden " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020617]";

  const headerHoverOverlay = (
    <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-[#283593] via-[#4f46e5] to-[#00bcd4] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
  );

  const burgerBtnClass =
    "relative group inline-flex items-center justify-center rounded-full " +
    "bg-slate-900/60 h-10 w-10 overflow-hidden " +
    "hover:bg-slate-900/80 transition-colors " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020617]";

  // ---------- Smooth Scroll Helpers ----------
  const HEADER_OFFSET = 96; // 64px Header + Luft

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    const y = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const goToSection = (id) => {
    const tryScroll = (n = 0) => {
      const el = document.getElementById(id);
      if (el) return scrollToId(id);
      if (n < 30) requestAnimationFrame(() => tryScroll(n + 1));
    };

    if (location.pathname !== "/") {
      navigate("/");
      requestAnimationFrame(() => tryScroll());
    } else {
      tryScroll();
    }

    setOpen(false);
  };

  const goToTop = () => {
    const doScroll = () => window.scrollTo({ top: 0, behavior: "smooth" });

    if (location.pathname !== "/") {
      navigate("/");
      // 1–2 Frames geben, damit die Route wirklich gerendert ist
      requestAnimationFrame(() => requestAnimationFrame(doScroll));
    } else {
      doScroll();
    }

    setOpen(false);
  };

  return (
    <>
      <header
        className={[
          "fixed inset-x-0 top-0 z-50 h-16 overflow-visible transition-all duration-300",
          scrolled
            ? "bg-slate-950/85 backdrop-blur-xl shadow-[0_18px_40px_rgba(0,0,0,0.40)]"
            : "bg-transparent backdrop-blur-[2px]",
        ].join(" ")}
      >
        {/* Hero-Blend */}
        <div
          className={[
            "pointer-events-none absolute inset-x-0 top-0 h-full",
            scrolled ? "opacity-0" : "opacity-100",
          ].join(" ")}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/25 via-slate-950/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-b from-transparent to-slate-950/10" />
        </div>

        {/* Bottom-Line (beim Scrollen -> WEISS) */}
        <div
          className={[
            "pointer-events-none absolute inset-x-0 bottom-0 h-px bg-white transition-opacity duration-300",
            scrolled ? "opacity-70" : "opacity-0",
          ].join(" ")}
        />

        {/* Top Accent-Line (kann bleiben wie sie ist) */}
        <div
          className={[
            "pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-[#283593] via-[#4f46e5] to-[#00bcd4] transition-opacity duration-300",
            scrolled ? "opacity-40" : "opacity-20",
          ].join(" ")}
        />

        {/* GRID: links / mitte / rechts => Navbar exakt zentriert */}
        <div className="mx-auto max-w-7xl px-6 sm:px-8 h-16 grid grid-cols-[1fr_auto_1fr] items-center">
          {/* LEFT */}
          <div className="flex items-center justify-self-start min-w-0">
            {/* DESKTOP LOGO */}
            <Link
              to="/"
              onClick={(e) => {
                e.preventDefault();
                goToTop();
              }}
              className="hidden md:inline-flex items-center min-w-0"
            >
              <img src={logo} alt="Logo" className="h-6 w-auto object-contain" />
            </Link>

            {/* MOBILE: linker Spacer (Breite wie Burger), damit Logo wirklich mittig bleibt */}
            <div className="md:hidden w-10" aria-hidden="true" />
          </div>

          {/* CENTER (Desktop: Nav | Mobile: Logo mittig) */}
          <div className="justify-self-center">
            {/* DESKTOP NAV */}
            <nav className="hidden md:flex items-center">
              <div
                className={[
                  "relative flex items-center gap-1 rounded-full p-1 backdrop-blur-xl",
                  scrolled
                    ? "border border-slate-700/70 bg-slate-950/45 shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
                    : "border border-slate-700/40 bg-slate-950/20 shadow-[0_0_0_rgba(0,0,0,0)]",
                ].join(" ")}
              >
                <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-[#283593]/20 via-[#4f46e5]/15 to-[#00bcd4]/20 blur-xl opacity-70" />

                {[
                  { label: "Über uns", type: "route", to: "/ueberuns" },
                  { label: "Services", type: "scroll", id: "automations" },
                  { label: "Bsp", type: "scroll", id: "bsp" },
                  { label: "ROI", type: "scroll", id: "roi-rechner" },
                  { label: "Kontakt", type: "scroll", id: "kontakt" },
                ].map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => {
                      if (item.type === "route") {
                        setOpen(false);
                        navigate(item.to);
                        return;
                      }
                      goToSection(item.id);
                    }}
                    className={[
                      "relative group inline-flex items-center justify-center rounded-full",
                      "px-4 py-2 text-sm font-semibold text-slate-100",
                      "transition-colors overflow-hidden",
                      "hover:bg-slate-900/60",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020617]",
                    ].join(" ")}
                  >
                    <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-[#283593] via-[#4f46e5] to-[#00bcd4] opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                    <span className="relative z-10">{item.label}</span>
                  </button>
                ))}
              </div>
            </nav>

            {/* MOBILE LOGO: exakt mittig + scroll top */}
            <Link
              to="/"
              onClick={(e) => {
                e.preventDefault();
                goToTop();
              }}
              className="md:hidden inline-flex items-center justify-center"
            >
              <img
                src={logo}
                alt="Logo"
                className="h-5 w-auto object-contain translate-y-[2.5px]"
              />
            </Link>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3 justify-self-end">
            {/* DESKTOP: CTA */}
            <a
              href="https://cal.com/ki-partner/15min?overlayCalendar=true"
              target="_blank"
              rel="noopener noreferrer"
              className={[
                "hidden md:inline-flex relative group items-center justify-center rounded-full",
                "bg-gradient-to-r from-[#283593] via-[#4f46e5] to-[#00bcd4] p-[2px]",
                "shadow-[0_0_28px_rgba(79,70,229,0.9)] hover:shadow-[0_0_36px_rgba(79,70,229,1)]",
                "transition-shadow duration-300",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020617]",
              ].join(" ")}
            >
              <span className="pointer-events-none absolute inset-[2px] rounded-full bg-gradient-to-r from-[#283593] via-[#4f46e5] to-[#00bcd4] opacity-0 group-hover:opacity-25 transition-opacity duration-300" />
              <span className="pointer-events-none absolute inset-[2px] rounded-full bg-white/0 group-hover:bg-white/5 transition-colors duration-300" />
              <span className="relative z-10 flex items-center gap-2 px-5 py-2 rounded-full bg-[#020617] text-sm font-semibold text-white">
                Kostenloses Erstgespräch
              </span>
            </a>

            {/* MOBILE: Burger ganz rechts */}
            <button
              type="button"
              aria-label={open ? "Menü schließen" : "Menü öffnen"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className={"md:hidden " + burgerBtnClass}
            >
              {headerHoverOverlay}
              <span className="relative z-10 flex flex-col items-center justify-center gap-1">
                <span
                  className={[
                    "block h-[2px] w-5 bg-slate-100 transition-transform duration-200",
                    open ? "translate-y-[6px] rotate-45" : "",
                  ].join(" ")}
                />
                <span
                  className={[
                    "block h-[2px] w-5 bg-slate-100 transition-opacity duration-200",
                    open ? "opacity-0" : "opacity-100",
                  ].join(" ")}
                />
                <span
                  className={[
                    "block h-[2px] w-5 bg-slate-100 transition-transform duration-200",
                    open ? "-translate-y-[6px] -rotate-45" : "",
                  ].join(" ")}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU OVERLAY */}
      <div
        className={[
          "md:hidden fixed inset-0 z-[60] transition-opacity duration-200",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
      >
        <div
          className="absolute inset-0 bg-black/55 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />

        <div
          className={[
            "absolute left-1/2 top-16 -translate-x-1/2 w-[min(92vw,560px)]",
            "rounded-3xl border border-slate-700/80 bg-slate-950/90 backdrop-blur-xl",
            "shadow-[0_24px_90px_rgba(0,0,0,0.65)] overflow-hidden",
            "transition-transform duration-200",
            open ? "translate-y-0" : "-translate-y-2",
          ].join(" ")}
        >
          <div className="h-px bg-gradient-to-r from-[#283593] via-[#4f46e5] to-[#00bcd4] opacity-60" />

          <div className="p-4">
            <div className="grid gap-2">
              <Link
                to="/"
                onClick={(e) => {
                  e.preventDefault();
                  goToTop();
                }}
                className={headerHoverBtnClass + " inline-flex w-full px-5 py-3 justify-center text-center"}
              >
                {headerHoverOverlay}
                <span className="relative z-10">Zum Seitenanfang</span>
              </Link>

              <Link
                to="/ueberuns"
                onClick={() => setOpen(false)}
                className={headerHoverBtnClass + " inline-flex w-full px-5 py-3 justify-center text-center"}
              >
                {headerHoverOverlay}
                <span className="relative z-10">Über uns</span>
              </Link>

              <button
                type="button"
                onClick={() => goToSection("automations")}
                className={headerHoverBtnClass + " inline-flex w-full px-5 py-3 justify-center text-center"}
              >
                {headerHoverOverlay}
                <span className="relative z-10">Services</span>
              </button>

              <button
                type="button"
                onClick={() => goToSection("bsp")}
                className={headerHoverBtnClass + " inline-flex w-full px-5 py-3 justify-center text-center"}
              >
                {headerHoverOverlay}
                <span className="relative z-10">Bsp</span>
              </button>

              <button
                type="button"
                onClick={() => goToSection("roi-rechner")}
                className={headerHoverBtnClass + " inline-flex w-full px-5 py-3 justify-center text-center"}
              >
                {headerHoverOverlay}
                <span className="relative z-10">ROI</span>
              </button>

              <button
                type="button"
                onClick={() => goToSection("kontakt")}
                className={headerHoverBtnClass + " inline-flex w-full px-5 py-3 justify-center text-center"}
              >
                {headerHoverOverlay}
                <span className="relative z-10 inline-flex items-center gap-2">
                  <FaComments className="text-cyan-300" />
                  Kontakt
                </span>
              </button>

              {/* optional: dein alter Button bleibt, wenn du ihn noch brauchst */}
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  setTimeout(handleSolutionsClick, 60);
                }}
                className={headerHoverBtnClass + " inline-flex w-full px-5 py-3 justify-center text-center"}
              >
                {headerHoverOverlay}
                <span className="relative z-10">Unsere Lösungen</span>
              </button>

              <a
                href="https://cal.com/ki-partner/15min?overlayCalendar=true"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className={[
                  "relative group inline-flex items-center justify-center rounded-full w-full",
                  "bg-gradient-to-r from-[#283593] via-[#4f46e5] to-[#00bcd4] p-[2px]",
                  "shadow-[0_0_28px_rgba(79,70,229,0.9)] hover:shadow-[0_0_36px_rgba(79,70,229,1)]",
                  "transition-shadow duration-300",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020617]",
                ].join(" ")}
              >
                <span className="pointer-events-none absolute inset-[2px] rounded-full bg-gradient-to-r from-[#283593] via-[#4f46e5] to-[#00bcd4] opacity-0 group-hover:opacity-25 transition-opacity duration-300" />
                <span className="pointer-events-none absolute inset-[2px] rounded-full bg-white/0 group-hover:bg-white/5 transition-colors duration-300" />
                <span className="relative z-10 flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#020617] text-sm font-semibold text-white w-full">
                  Kostenloses Erstgespräch
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer für fixed header */}
      <div className="h-16" aria-hidden="true" />
    </>
  );
}