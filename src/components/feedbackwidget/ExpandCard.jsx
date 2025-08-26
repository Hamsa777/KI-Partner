import React, { useRef, useEffect, useState } from "react";
import { Star } from "lucide-react";
import { GoStarFill } from "react-icons/go";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import GoogleOverlay from "./GoogleOverlay";

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

const FALLBACK_AVATAR = "https://lh3.googleusercontent.com/a/ACg8ocLbOrzugSrQtld4IgmycpF9iuZNpHqmy5y2_fkZXZLe8coM_A=w144-h144-p-rp-mo-br100";
const ExpandCard = ({
  logoUrl, // GPT-Logo oder Google Profilbild
  name,
  isGPT,
  rating,
  comment,
  date,
  accentColor = "#166534",
  nameColor = "#fff",
  commentColor = "#fff",
  textFontSize = "20px",
  boxRadius = "24px",
  onClose,
  starColor = "#facc15",
  scrollRef,
  stylePreset,
  profilePhotoUrl, // <--- NEU, das Profilbild für Google
}) => {
  const MAX_BODY_HEIGHT = 105;
  const estimatedLines = comment ? Math.ceil(comment.length / 55) : 1;
  const bodyHeight = Math.min(estimatedLines * parseInt(textFontSize, 10) * 1.6, MAX_BODY_HEIGHT);

  const boxClasses = getBoxClasses(stylePreset);

  // Typing Animation (GPT)
  const [displayedText, setDisplayedText] = useState(isGPT ? "" : comment);
  const textRef = useRef(null);

  useEffect(() => {
    if (isGPT) {
      setDisplayedText("");
      if (!comment) return;
      const chars = Array.from(comment);
      let idx = 0;
      const interval = setInterval(() => {
        setDisplayedText(chars.slice(0, idx + 1).join(""));
        idx++;
        setTimeout(() => {
          if (textRef.current) {
            textRef.current.scrollTop = textRef.current.scrollHeight;
          }
        }, 0);
        if (idx >= chars.length) clearInterval(interval);
      }, 13);
      return () => clearInterval(interval);
    } else {
      setDisplayedText(comment || "");
    }
  }, [comment, isGPT]);

  // --- Tooltip-Logik für das Profilbild+Overlay ---
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`${boxClasses} relative flex flex-col items-center justify-center`}
      style={{
        background: stylePreset === "transparent" || stylePreset === "apple-transparent"
          ? "transparent"
          : accentColor,
        borderRadius: boxRadius,
        minWidth: 300,
        width: "100%",
        maxWidth: "90vw",
        margin: "32px auto 32px auto",
        padding: "14px 20px 14px 20px",
        boxShadow: "0 10px 36px 0 rgba(0,0,0,.08)",
        transition: "max-width 0.2s",
        maxHeight: 300,
        overflow: "hidden"
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-center gap-2 w-full mb-2" style={{ minHeight: 20 }}>
        {isGPT ? (
          <div className="relative group flex items-center justify-center w-8 h-8 bg-white/20 rounded-full shadow-inner mb-1 mt-[2px]">
            <img
              src={logoUrl}
              alt="GPT Logo"
              className="w-6 h-6"
              style={{ objectFit: "contain" }}
            />
            {/* Tooltip */}
            <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 bg-[#2c2c2e] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-50 shadow pointer-events-none">
              GPT-4o
            </div>
          </div>
        ) : (
          // --- NEU: Profilbild + GoogleOverlay + Tooltip gemeinsam im Container ---
          <div
            className="relative group flex items-center justify-center bottom-0.5 mr-2 flex-shrink-0"
            style={{ width: 33, height: 33 }}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
                    <img
          src={profilePhotoUrl || FALLBACK_AVATAR}
          alt={name + " Profilbild"}
          className="w-full h-full object-cover rounded-full"
          style={{
            width: 30,
            height: 30,
            display: "block",
          }}
          draggable={false}
        />
            <GoogleOverlay size={16} logoSize={16} offset={4} />
            {/* Tooltip für Google-Bewertung */}
           <div
  className={`absolute left-full top-1/2 -translate-y-1/2 ml-2 bg-[#2c2c2e] text-white text-[12px] px-2 py-1 rounded transition whitespace-nowrap z-50 shadow pointer-events-none ${showTooltip ? "opacity-100" : "opacity-0"}`}
>
  Bewertung aus Google
</div>

          </div>
        )}
        <span
          className="font-semibold"
          style={{
            color: nameColor,
            fontSize: "19px",
            textAlign: "center",
            lineHeight: "1.2"
          }}
        >
          {name}
        </span>
        {isGPT && (
          <div className="flex items-center justify-center w-7 h-7 bg-white bg-opacity-90 rounded-full shadow ml-2">
            <button
              onClick={onClose}
              className="flex items-center justify-center w-full h-full text-gray-700 hover:text-gray-900 focus:outline-none"
              aria-label="Schließen"
              type="button"
              tabIndex={0}
              style={{ padding: 0, margin: 0, background: "transparent", border: "none" }}
            >
              <svg
                width="20" height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ display: "block" }}
              >
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        )}
        {!isGPT && rating !== undefined && (
         <div className="flex items-center -mt-0.5">
  {Array.from({ length: 5 }, (_, index) => (
    <GoStarFill
  key={index}
  className="h-5 w-5"
  fill={index < rating ? starColor : "#d1d5db"}
  style={{ marginBottom: "2px" }} // Sterne etwas tiefer setzen
/>
  ))}
</div>

        )}
      </div>

      {/* Kommentar/Text */}
      <div
        ref={isGPT ? textRef : scrollRef}
        className="w-full"
        style={{
          maxHeight: bodyHeight,
          paddingRight: 6,
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          minHeight: textFontSize,
          transition: "max-height 0.2s",
          flex: "1 1 auto",
          overflowY: "auto"
        }}
      >
        <style>
          {`
            .expandcard-scrollbar::-webkit-scrollbar {
              width: 0 !important;
              height: 0 !important;
              display: none !important;
              background: transparent !important;
            }
          `}
        </style>
        {isGPT ? (
          <div
            style={{
              color: commentColor,
              fontSize: textFontSize,
              textAlign: "center",
              fontFamily: commentColor,
              lineHeight: "1.5",
              margin: 0,
              wordBreak: "break-word"
            }}
          >
            <ReactMarkdown
              components={{
                ul: ({ node, ...props }) => (
                  <ul style={{ display: "inline-block", textAlign: "left", margin: "0 auto 0 0", paddingLeft: 18 }} {...props} />
                ),
                li: ({ node, ...props }) => (
                  <li style={{ marginLeft: 0, listStyle: "disc" }} {...props} />
                ),
                strong: ({ node, ...props }) => <strong style={{ fontWeight: 600 }} {...props} />,
              }}
            >
              {displayedText}
            </ReactMarkdown>
          </div>
        ) : (
          <p
            className="italic w-full text-center expandcard-scrollbar"
            style={{
              color: commentColor,
              fontSize: textFontSize,
              lineHeight: "1.5",
              margin: 0,
              whiteSpace: "pre-line",
              wordBreak: "break-word"
            }}
          >
            {displayedText}
          </p>
        )}
      </div>
      <div className="w-full mt-4 flex items-center justify-center">
        {isGPT ? (
          <span
            className="block text-xs text-center opacity-80"
            style={{ color: commentColor, fontSize: "15px" }}
          >
            Diese Auswertung ist KI generiert.
          </span>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <span
              className="block text-xs text-center"
              style={{ color: commentColor, fontSize: "17px" }}
            >
              {date}
            </span>
            <button
              onClick={onClose}
              className="text-xs px-3 py-1 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 border border-gray-300"
              style={{ fontWeight: 500 }}
              type="button"
            >
              Verbergen
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ExpandCard;
