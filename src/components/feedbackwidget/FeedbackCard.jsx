import { useRef, useState, useEffect } from "react";
import { Star, ShieldCheck } from "lucide-react";

export default function FeedbackCard({
  review,
  accentColor = "#f8f8f8",
  nameColor = "#222",
  commentColor = "#222",
  dateColor = "#222",
  boxRadius = "16px",
  textFontSize = "20px",
  stylePreset = "classic",
  cardLayout = "default"
}) {
 // GANZ OBEN in der Komponente:
const [expanded, setExpanded] = useState(false);
const [showButton, setShowButton] = useState(false);
const [commentHeight, setCommentHeight] = useState(0);
const commentRef = useRef(null);
useEffect(() => {
  setExpanded(false);
}, [review]);

function Badge() {
  return (
    <div className="relative">
      <div className="flex items-center justify-center w-6 h-6 bg-white/20 rounded-full shadow-inner group hover:animate-bounce-slow transition-transform">
        <img
  src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/800px-Google_%22G%22_logo.svg.png"
  alt="Shield Icon"
  className="w-4 h-4"
/>
        {/* Tooltip */}
        <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 bg-gray-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-50 shadow pointer-events-none">
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




// ⭐️ 1. Review Modern: Button farbig rechts unten, Datum und Badge links unten
if (cardLayout === "review-modern") {
  return (
    <div className="min-w-[300px] max-w-[300px] flex-shrink-0">
      <div
  className={boxClasses + " flex flex-col"}
  style={{
    backgroundColor:
  stylePreset === "transparent" || stylePreset === "apple-transparent"
    ? "transparent"
    : accentColor,

    borderRadius: boxRadius,
    fontSize: textFontSize,
    minHeight: Math.max(90, parseInt(textFontSize, 10) * 5 + 48), // Mehr Reserve!
    height: "100%",
    position: "relative",
  }}
>   
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold text-base" style={{ color: nameColor, fontSize: "16px" }}>
            {review.name}
          </span>
          <div className="flex items-center ml-1">
            {Array.from({ length: 5 }, (_, index) => (
              <Star
                key={index}
                className="h-4 w-4"
                style={{ color: index < review.rating ? "#facc15" : "#d1d5db" }}
                fill={index < review.rating ? "currentColor" : "none"}
              />
            ))}
          </div>
        </div>
        <p
          ref={commentRef}
          className="italic transition-all duration-500 ease-in-out overflow-hidden"
          style={{
            color: commentColor,
            maxHeight: `${commentHeight}px`,
            lineHeight: "1.5",
            textAlign: "left",
            marginBottom: showButton ? "0.5rem" : 0,
          }}
        >
          "{review.comment}"
        </p>
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-2">
            <Badge />
            <span className="text-xs" style={{ color: dateColor, fontSize: "14px" }}>
              {review.date}
            </span>
          </div>
          {showButton && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-sm rounded-full px-4  bg-red-600 text-white font-bold hover:bg-red-800 transition"
            >
              {expanded ? "Verbergen" : "Weiterlesen"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
// ⭐️ 2. Social-Style: Button farbig rechts unten, Datum und Badge links unten

if (cardLayout === "social-style") {
  return (
    <div className="min-w-[300px] max-w-[300px] flex-shrink-0">
      <div
        className={boxClasses + " items-center"}
        style={{
          backgroundColor:
  stylePreset === "transparent" || stylePreset === "apple-transparent"
    ? "transparent"
    : accentColor,

          borderRadius: boxRadius,
          fontSize: textFontSize,
          position: "relative",
          minHeight: "115px",
        }}
      >
        {/* Badge, Name & Stars: Horizontal */}
        <div className="flex items-center justify-center gap-2 w-full mb-1">
          <Badge />
          <span className="font-semibold text-base" style={{ color: nameColor, fontSize: "16px" }}>
            {review.name}
          </span>
          <div className="flex items-center">
            {Array.from({ length: 5 }, (_, index) => (
              <Star
                key={index}
                className="h-4 w-4"
                style={{ color: index < review.rating ? "#facc15" : "#d1d5db" }}
                fill={index < review.rating ? "currentColor" : "none"}
              />
            ))}
          </div>
        </div>

        {/* Kommentar */}
        <p
          ref={commentRef}
          className="italic text-center transition-all duration-500 ease-in-out overflow-hidden"
          style={{
            color: commentColor,
            maxHeight: `${commentHeight}px`,
            lineHeight: "1.5",
            marginBottom: showButton ? "0.5rem" : 0,
          }}
        >
          "{review.comment}"
        </p>

        {/* Datum */}
        <span className="text-xs mb-1 block" style={{ color: dateColor, fontSize: "15px" }}>
          {review.date}
        </span>

        {/* Button */}
        {showButton && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-sm text-blue-700 hover:text-blue-900 hover:underline transition mx-auto block"
          >
            {expanded ? "Verbergen" : "Weiterlesen"}
          </button>
        )}
      </div>
    </div>
  );
}


// ⭐️ 3. Default Layout (dein aktuelles!)
return (
  <div className="min-w-[300px] max-w-[300px] flex-shrink-0">
    <div
      className={boxClasses+ " flex flex-col h-full"}
      style={{
       backgroundColor:
  stylePreset === "transparent" || stylePreset === "apple-transparent"
    ? "transparent"
    : accentColor,

        borderRadius: boxRadius,
        fontSize: textFontSize,
        position: "relative",
        minHeight: "115px",
      }}
    >
      {/* Name, Badge, Sterne */}
      <div className="flex items-center gap-2 mb-1">
        <Badge />
        <p className="font-semibold text-base" style={{ color: nameColor, fontSize: "16px" }}>
          {review.name}
        </p>
        <div className="flex items-center">
          {Array.from({ length: 5 }, (_, index) => (
            <Star
              key={index}
              className="h-4 w-4"
              style={{ color: index < review.rating ? "#facc15" : "#d1d5db" }}
              fill={index < review.rating ? "currentColor" : "none"}
            />
          ))}
        </div>
      </div>

      {/* Kommentar */}
      <p
  ref={commentRef}
  className="italic transition-all duration-500 ease-in-out overflow-hidden"
  style={{
    color: commentColor,
    maxHeight: `${commentHeight}px`,
    lineHeight: "1.5",
    marginBottom: showButton ? "0.25rem" : 0,
  }}
>
  "{review.comment}"
</p>

<div className="flex items-center justify-between mt-auto">
  {showButton && (
    <button
      onClick={() => setExpanded(!expanded)}
      className="text-base font-semibold text-blue-600  rounded hover:underline transition-all duration-200"
      style={{ fontSize: "15px" }}
    >
      {expanded ? "Verbergen" : "Weiterlesen"}
    </button>
  )}
  <span style={{ color: dateColor, fontSize: "15px" }}>{review.date}</span>
</div>

        
    </div>
  </div>
);
}