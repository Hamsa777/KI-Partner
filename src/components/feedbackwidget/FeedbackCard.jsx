import { useRef, useState, useEffect } from "react";
import { Star } from "lucide-react";
import { color } from "framer-motion";
import ExpandCard from './ExpandCard';
import GoogleOverlay from "./GoogleOverlay";

export default function FeedbackCard({
  review,
  accentColor = "#f8f8f8",
  color,
  nameColor = "#222",
  commentColor = "#222",
  dateColor = "#222",
  boxRadius = "16px",
  textFontSize = "20px",
  stylePreset = "classic",
  cardLayout = "default",
  cardExpand = false,
  onWeiterlesen,
  onClose,
  
}) {
 // GANZ OBEN in der Komponente:
const [expanded, setExpanded] = useState(false);
const [showButton, setShowButton] = useState(false);
const [commentHeight, setCommentHeight] = useState(0);
const commentRef = useRef(null);
const firstLineLength = review.comment.split('\n')[0].length;
const showWeiterlesen = !cardExpand && firstLineLength > 36;
const FALLBACK_AVATAR = "https://lh3.googleusercontent.com/a/ACg8ocLbOrzugSrQtld4IgmycpF9iuZNpHqmy5y2_fkZXZLe8coM_A=w144-h144-p-rp-mo-br100";
const [showTooltip, setShowTooltip] = useState(false);
const scrollRef = useRef(null);

useEffect(() => {
  if (commentRef.current) {
    const el = commentRef.current;
    // Zeige Button, wenn Text zu lang ist für eine Zeile
    setShowButton(el.scrollWidth > el.clientWidth);
  }
}, [review.comment, textFontSize]);

useEffect(() => {
  if (cardExpand && scrollRef.current) {
    scrollRef.current.scrollTop = 0;

    let step = 0;
    const downSteps = 30; // Mehr Steps = smoother (30 reicht!)
    const upSteps = 15;
    const max = 20;

    // Runter (0,18s)
    const downInterval = setInterval(() => {
      step++;
      scrollRef.current.scrollTop = (step / downSteps) * max;
      if (step >= downSteps) {
        clearInterval(downInterval);

        // Zurück (0,09s)
        let upStep = 0;
        const upInterval = setInterval(() => {
          upStep++;
          scrollRef.current.scrollTop = max - (upStep / upSteps) * max;
          if (upStep >= upSteps) {
            clearInterval(upInterval);
            scrollRef.current.scrollTop = 0;
          }
        }, 90 / upSteps);
      }
    }, 180 / downSteps);
  }
}, [cardExpand]);


useEffect(() => {
  setExpanded(false);
}, [review]);


function Badge({ isGPT }) {
  if (isGPT) {
    return (
      <div className="relative translate-y-[1px]">
        <div className="flex items-center justify-center w-8 h-8 bg-white/20 rounded-full shadow-inner group transition-transform mb-1">
          <img
            src="https://simplifyai.in/wp-content/uploads/2024/08/ChatGPT-logo-new.png"
            alt="GPT Logo"
            className="w-6 h-6"
            style={{
              objectFit: "contain",
              filter: "drop-shadow(0 1px 4px rgba(44,62,80,0.10))"
            }}
          />
          <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 bg-gray-800 text-white text-[12px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-50 shadow pointer-events-none">
            GPT-4o
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="relative translate-y-[1px]">
  <div className="flex items-center justify-center w-7 h-7 bg-white/20 rounded-full shadow-inner group hover:animate-bounce-slow transition-transform mb-1">
    <img
  src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/800px-Google_%22G%22_logo.svg.png"
  alt="Shield Icon"
  className="w-5 h-5 " // für 1px nach unten
/>

        {/* Tooltip */}
        <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 bg-[#2c2c2e] text-white text-[12px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-50 shadow pointer-events-none">
          Bewertung aus Google
        </div>
      </div>
    </div>
  );
}



useEffect(() => {
  if (commentRef.current) {
    const el = commentRef.current;
    const lineHeight = parseFloat(getComputedStyle(el).lineHeight);
    const visibleLines = 1;
    const maxHeight = lineHeight * visibleLines;

    if (el.scrollHeight > maxHeight + 2) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
    setCommentHeight(expanded ? el.scrollHeight : maxHeight);
  }
}, [expanded, review.comment, textFontSize]); // Nur Dinge eintragen, die du wirklich als Variable hast


  // ...Dein bisheriger Code (useState etc.)...

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


//review modern
if (cardLayout === "review-modern") {
  // Setze das logoUrl:
  const logoUrl = review.isGPT
    ? "https://simplifyai.in/wp-content/uploads/2024/08/ChatGPT-logo-new.png"
    : "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/800px-Google_%22G%22_logo.svg.png";

  if (cardExpand) {
    // Expanded Card mittig im Widget!
    return (
      <ExpandCard
        color={color}
        logoUrl={logoUrl}
        name={review.name}
        isGPT={review.isGPT}
        rating={review.isGPT ? undefined : review.rating}
        comment={review.comment}
        date={review.isGPT ? undefined : review.date}
        profilePhotoUrl={review.profilePhotoUrl}
        accentColor={accentColor}
        nameColor={nameColor}
        commentColor={commentColor}
        textFontSize={textFontSize}
        boxRadius={boxRadius}
        onClose={onClose}
        stylePreset={stylePreset} 
        scrollRef={scrollRef}
      />
    );
  }

  // Collapsed Card bleibt wie bisher:
  return (
    <div className="relative flex flex-col h-full feedback-card-scroll">
      <div
        ref={scrollRef}
        className={boxClasses + " flex flex-col h-full feedback-card-scroll"}
        style={{
          backgroundColor:
            stylePreset === "transparent" || stylePreset === "apple-transparent"
              ? "transparent"
              : accentColor,
          borderRadius: boxRadius,
          fontSize: textFontSize,
          minHeight: Math.max(90, parseInt(textFontSize, 10) * 5),
          height: "100%",
          position: "relative",
          minWidth: "300px",
          maxWidth: "300px",
          margin: "",
          maxHeight: 165,
          overflowY: "auto",
        }}
      >
        {/* Name + Sterne */}
        <div className="flex items-center gap-2 mb-1">
          <span
            className="font-semibold"
            style={{ color: nameColor, fontSize: "18px" }}
          >
            {review.name}
          </span>
          {!review.isGPT && (
            <div className="flex items-center">
              {Array.from({ length: 5 }, (_, index) => (
                <Star
                  key={index}
                  className="h-5 w-5 mb-1"
                  style={{ color: index < review.rating ? "#facc15" : "#d1d5db" }}
                  fill={index < review.rating ? "currentColor" : "none"}
                />
              ))}
            </div>
          )}
        </div>
        {/* Kommentar */}
        <div className="flex-1 flex items-center w-full pb-1.5">
          <p
            ref={commentRef}
            className={
              "italic transition-all duration-500 ease-in-out w-full truncate"
            }
            style={{
              color: commentColor,
              lineHeight: "1.5",
              textAlign: "left",
              margin: 0,
              display: "block",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {review.comment}
          </p>
        </div>
        {/* Footer */}
        <div className="flex items-center justify-between mt-auto w-full">
          <div className="flex items-center gap-2">
            <Badge isGPT={review.isGPT} />
            <span
              className="text-xs block py-0"
              style={{ color: commentColor, fontSize: "15px" }}
            >
              {review.date}
            </span>
          </div>
          {/* Rechts: Button */}
          {review.comment.length > 36 ? (
            <button
              onClick={onWeiterlesen}
              className="text-sm px-3 py-1 rounded-full text-white transition"
              style={{
                backgroundColor: color,
                minWidth: 90,
              }}
            >
              {review.isGPT ? "Anzeigen" : "Weiterlesen"}
            </button>
          ) : (
            <span
              style={{
                opacity: 0,
                pointerEvents: "none",
                minWidth: 90,
                display: "inline-block",
                backgroundColor: color,
                borderRadius: "9999px",
                padding: "0.25rem 0.75rem",
                color: "#fff"
              }}
              className="text-sm rounded-full transition"
            >
              {review.isGPT ? "Anzeigen" : "Weiterlesen"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}


//social-style
if (cardLayout === "social-style") {
  const logoUrl = review.isGPT
    ? "https://simplifyai.in/wp-content/uploads/2024/08/ChatGPT-logo-new.png"
    : "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/800px-Google_%22G%22_logo.svg.png";
  const firstLine = review.comment.split('\n')[0];
  const showWeiterlesen = !cardExpand && firstLine.length > 40;

  // NEU: Im Expand direkt ExpandCard nutzen
  if (cardExpand) {
    return (
      <ExpandCard
        logoUrl={logoUrl}
        color={color}
        name={review.name}
        isGPT={review.isGPT}
        rating={review.isGPT ? undefined : review.rating}
        comment={review.comment}
        date={review.isGPT ? undefined : review.date}
        profilePhotoUrl={review.profilePhotoUrl}
        accentColor={accentColor}
        nameColor={nameColor}
        commentColor={commentColor}
        textFontSize={textFontSize}
        boxRadius={boxRadius}
        onClose={onClose}
        stylePreset={stylePreset}
        scrollRef={scrollRef}
      />
    );
  }

  // Collapsed Social-Style Card wie gehabt
  return (
    <div className="relative flex flex-col h-full feedback-card-scroll">
      <div
        ref={scrollRef}
        className={
          boxClasses +
          " flex flex-col h-full items-center justify-center feedback-card-scroll"
        }
        style={{
          backgroundColor:
            stylePreset === "transparent" || stylePreset === "apple-transparent"
              ? "transparent"
              : accentColor,
          borderRadius: boxRadius,
          fontSize: textFontSize,
          position: "relative",
          minHeight: "133px",
          maxHeight: "133px",
          minWidth: "300px",
          maxWidth: "300px",
          margin: "",
          overflowY: undefined,
        }}
      >
        
{/* Header */}
<div className="flex items-center justify-center gap-2 w-full mb-1">
  {!review.isGPT && (
    <div
      className="relative flex items-center justify-center mr-1 flex-shrink-0"
      style={{ width: 33, height: 33 }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <img
        src={review.profilePhotoUrl || FALLBACK_AVATAR}
        alt={review.name + " Profilbild"}
        className="w-full h-full object-cover rounded-full bg-white"
        style={{
          width: 30,
          height: 30,
          display: "block",
        }}
        draggable={false}
      />
      <GoogleOverlay size={16} logoSize={16} offset={4} />
      {/* Tooltip */}
      {showTooltip && (
        <div
          className="absolute left-full top-1/2 -translate-y-1/2 ml-2 text-white text-[12px] px-2 py-1 rounded z-50 shadow pointer-events-none"
          style={{
            background: "#2c2c2e",
            whiteSpace: "nowrap",
          }}
        >
          Bewertung aus Google
        </div>
      )}
    </div>
  )}

  <span
    className="font-semibold"
    style={{
      color: nameColor,
      fontSize: "18px"
    }}
  >
    {review.name}
  </span>
  {!review.isGPT && (
    <div className="flex items-center">
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          className="w-5 h-5 mb-1"
          style={{ color: index < review.rating ? "#facc15" : "#d1d5db" }}
          fill={index < review.rating ? "currentColor" : "none"}
        />
      ))}
    </div>
  )}
</div>




        {/* Body */}
        <div className="flex-1 flex items-center justify-center w-full pb-1">
          <p
            ref={commentRef}
            className={
              "italic transition-all duration-500 ease-in-out w-full text-center " +
              (showWeiterlesen ? "truncate" : "")
            }
            style={{
              color: commentColor,
              lineHeight: "1.5",
              fontSize: "inherit",
              margin: 0,
              display: "block",
              overflow: showWeiterlesen ? "hidden" : "visible",
              textOverflow: showWeiterlesen ? "ellipsis" : "unset",
              whiteSpace: showWeiterlesen ? "nowrap" : "normal",
            }}
          >
            {review.comment}
          </p>
        </div>
        {/* Footer */}
        <div className="flex flex-col items-center w-full">
          <span
            className="text-xs block py-1 text-center w-full"
            style={{ color: commentColor, fontSize: "15px" }}
          >
            {review.date}
          </span>
          {/* Nur wenn nötig, im Normal-Modus */}
          {showWeiterlesen && (
            <button
              onClick={onWeiterlesen}
              className="text-base text-gray-400 hover:text-gray-800 rounded transition"
              style={{ minWidth: 90 }}
            >
              {review.isGPT ? "Anzeigen" : "Weiterlesen"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}



// ⭐️ 3. Default Layout 
if (cardLayout === "default") {
  const logoUrl = review.isGPT
    ? "https://simplifyai.in/wp-content/uploads/2024/08/ChatGPT-logo-new.png"
    : "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/800px-Google_%22G%22_logo.svg.png";

  // Nur beim Expand auf ExpandCard zurückgreifen:
  if (cardExpand) {
    return (
      <ExpandCard
        logoUrl={logoUrl}
        color={color}
        name={review.name}
        isGPT={review.isGPT}
        profilePhotoUrl={review.profilePhotoUrl}
        rating={review.isGPT ? undefined : review.rating}
        comment={review.comment}
        date={review.isGPT ? undefined : review.date}
        accentColor={accentColor}
        nameColor={nameColor}
        commentColor={commentColor}
        textFontSize={textFontSize}
        boxRadius={boxRadius}
        onClose={onClose}
        stylePreset={stylePreset}
        scrollRef={scrollRef}
      />
    );
  }

  // Collapsed Card bleibt wie bisher!
  return (
    <div className="relative flex flex-col h-full feedback-card-scroll">
      <div
        ref={scrollRef}
        className={boxClasses + " flex flex-col h-full feedback-card-scroll"}
        style={{
          backgroundColor:
            stylePreset === "transparent" || stylePreset === "apple-transparent"
              ? "transparent"
              : accentColor,
          borderRadius: boxRadius,
          fontSize: textFontSize,
          position: "relative",
          minHeight: "117px",
          minWidth: "300px",
          maxWidth: "300px",
          margin: "",
          maxHeight: 178,
          overflowY: "auto",
        }}
      >
        {/* Name, Badge, Sterne */}
        <div className="flex items-center gap-2 mb-1">
          <Badge isGPT={review.isGPT} />
          <p
            className="font-semibold"
            style={{
              color: nameColor,
              fontSize: "18px",
            }}
          >
            {review.name}
          </p>
          {!review.isGPT && (
            <div className="flex items-center">
              {Array.from({ length: 5 }, (_, index) => (
                <Star
                  key={index}
                  className="h-5 w-5 mb-1"
                  style={{
                    color: index < review.rating ? "#facc15" : "#d1d5db",
                  }}
                  fill={index < review.rating ? "currentColor" : "none"}
                />
              ))}
            </div>
          )}
        </div>
        {/* Kommentar */}
        <p
          ref={commentRef}
          className={
            "italic transition-all duration-500 ease-in-out w-full truncate"
          }
          style={{
            color: commentColor,
            lineHeight: "1.5",
            textAlign: "left",
            marginBottom: review.comment.length > 36 ? "0.5rem" : 0,
            fontSize: "inherit",
          }}
        >
          {review.comment}
        </p>
        {/* Footer */}
        <div className="flex items-center justify-between mt-auto w-full">
          <div className="flex items-center gap-2">
            <span
              className={`text-xs block py-0`}
              style={{ color: commentColor, fontSize: "15px" }}
            >
              {review.date}
            </span>
          </div>
          {/* Rechts: Button */}
          {review.comment.length > 36 ? (
            <button
              onClick={onWeiterlesen}
              className="text-sm px-3 py-1 text-white rounded-full transition"
              style={{ minWidth: 90, backgroundColor: color }}
            >
              {review.isGPT ? "Anzeigen" : "Weiterlesen"}
            </button>
            
          ) : (
            <span
              style={{
                opacity: 0,
                pointerEvents: "none",
                minWidth: 90,
                display: "inline-block",
              }}
            >
              {review.isGPT ? "Anzeigen" : "Weiterlesen"}
            </span>
          )}
          {cardExpand && (
            <button
              onClick={onClose}
              className="absolute top-1 right-3 text-gray-400 hover:text-gray-800 text-3xl rounded-full px-2 py-1 transition"
            >
              ×
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
}