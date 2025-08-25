import { motion } from "framer-motion";
import React, { useEffect, useRef } from "react";

function getBoxClasses(stylePreset) {
  let boxClasses = "p-4 flex flex-col";
  if (stylePreset === "glass") {
    boxClasses += " bg-white/10 backdrop-blur-lg border border-white/30 shadow-lg";
  } else if (stylePreset === "flat") {
    boxClasses += " bg-transparent border border-gray-200 shadow-none";
  } else if (stylePreset === "transparent") {
    boxClasses += " bg-white/20 backdrop-blur-sm border border-white/30 shadow-md";
  } else if (stylePreset === "apple-transparent") {
    boxClasses += " bg-black/50 backdrop-blur-2xl backdrop-saturate-150";
  } else {
    boxClasses += " bg-white shadow-lg";
  }
  return boxClasses;
}

export default function GPTCard({
  color,
  accentColor,
  nameColor,
  boxRadius,
  stylePreset = "",
  textFontSize,
  reviewCount = 0, // <-- NEU: Anzahl Bewertungen
  onAnzeigen,
  playEntranceAnimation = false,
  onEntranceEnd = () => {},
}) {
  const boxClasses = getBoxClasses(stylePreset);
  const backgroundColor =
    stylePreset === "transparent" || stylePreset === "apple-transparent"
      ? "transparent"
      : accentColor;

  // Shine-Animation
  const shineRef = useRef(null);
  const playedShine = useRef(false);

  useEffect(() => {
    if (playEntranceAnimation && shineRef.current && !playedShine.current) {
      shineRef.current.classList.add("gpt-shine-animate");
      playedShine.current = true;
      const timeout = setTimeout(() => {
        if (shineRef.current) {
          shineRef.current.classList.remove("gpt-shine-animate");
        }
        onEntranceEnd();
      }, 1300);
      return () => clearTimeout(timeout);
    }
  }, [playEntranceAnimation, onEntranceEnd]);

  return (
    <motion.div
      initial={playEntranceAnimation ? { opacity: 0, scale: 0.94 } : false}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`${boxClasses} flex flex-col h-full feedback-card-scroll items-start justify-center relative overflow-hidden`}
      style={{
        backgroundColor,
        borderRadius: boxRadius,
        fontSize: textFontSize,
        maxHeight: "133px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Shine-Glanz-Effekt */}
      <style>
        {`
        .gpt-shine {
          pointer-events: none;
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          background: linear-gradient(110deg, transparent 55%, rgba(255,255,255,0.27) 64%, rgba(255,255,255,0.11) 72%, transparent 80%);
          filter: blur(2.5px);
          z-index: 2;
          opacity: 0;
        }
        .gpt-shine-animate {
          animation: shine-move 1.3s cubic-bezier(0.4, 0.1, 0.6, 1) forwards;
        }
        @keyframes shine-move {
          0%   { transform: translateX(-70%); opacity: 0.35; }
          10%  { opacity: 0.6; }
          80%  { opacity: 0.75; }
          100% { transform: translateX(110%); opacity: 0; }
        }
        `}
      </style>
      <div ref={shineRef} className="gpt-shine" />

   <div className="w-full flex items-center justify-center gap-1 pb-1.5">
  <div className="relative flex items-center justify-center w-9 h-9 bg-white/20 rounded-full shadow-inner group">
    <img
      src="https://simplifyai.in/wp-content/uploads/2024/08/ChatGPT-logo-new.png"
      alt="GPT Logo"
      className="w-7 h-7"
    />
    <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 bg-[#283593] text-white text-[12px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-50 shadow pointer-events-none">
      GPT-4o
    </div>
  </div>
  <span
    className="font-semibold z-10 text-center"
    style={{
      color: nameColor,
      letterSpacing: 1,
      fontSize: "20px",
      marginLeft: 4,
    }}
  >
    Kurzfassung
  </span>
</div>




      {/* Anzahl Bewertungen */}
      <div className="w-full flex justify-center mb-2">
        <div
          className="text-xs font-medium opacity-80"
          style={{
            color: nameColor,
            textAlign: "center",
            fontSize: "16px",
          }}
        >
          {reviewCount === 1
            ? "Basierend auf 1 Google Bewertung"
            : `Basierend auf ${reviewCount} Google Bewertungen`}
        </div>
      </div>

      {/* Anzeigen-Button */}
     <div className="w-full flex justify-center mt-1.5">
  <button
    onClick={onAnzeigen}
    className="text-sm px-3 py-1 rounded-full transition z-10"
    style={{
      background: color,
      color: nameColor,
      minWidth: 90,
      letterSpacing: 0.5,
    }}
  >
    Anzeigen
  </button>
</div>

    </motion.div>
  );
}
