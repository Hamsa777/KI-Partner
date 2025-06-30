import { useRef, useState, useEffect } from "react";
import { Star } from "lucide-react";
import { color } from "framer-motion";


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

function Badge() {
  return (
    <div className="relative translate-y-[1px]">
  <div className="flex items-center justify-center w-6 h-6 bg-white/20 rounded-full shadow-inner group hover:animate-bounce-slow transition-transform mb-1">
    <img
  src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/800px-Google_%22G%22_logo.svg.png"
  alt="Shield Icon"
  className="w-4 h-4 " // für 1px nach unten
/>

        {/* Tooltip */}
        <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 bg-gray-800 text-white text-[12px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-50 shadow pointer-events-none">
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



// Review-modern
if (cardLayout === "review-modern") {
  return (
    <div className="relative flex flex-col feedback-card-scroll">
      <div
        ref={scrollRef}
        className={boxClasses + " flex flex-col feedback-card-scroll"}
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
          minWidth: cardExpand ? "100%" : "300px",
          maxWidth: cardExpand ? "100%" : "300px",
          margin: cardExpand ? "0 auto" : "",
          maxHeight: cardExpand ? 165 : undefined,
          overflowY: cardExpand ? "auto" : undefined,
        }}
      >
        {/* Name + Sterne */}
        <div className="flex items-center gap-2 mb-1">
          <span
            className="font-semibold"
            style={{ color: nameColor, fontSize: cardExpand ? "20px" : "18px" }}
          >
            {review.name}
          </span>
          <div className="flex items-center">
            {Array.from({ length: 5 }, (_, index) => (
              <Star
                key={index}
                className={cardExpand ? "w-5 h-5" : "h-5 w-5 mb-1"}
                style={{ color: index < review.rating ? "#facc15" : "#d1d5db" }}
                fill={index < review.rating ? "currentColor" : "none"}
              />
            ))}
          </div>
        </div>
        {/* Kommentar */}
        <p
          ref={commentRef}
          className={
            "italic transition-all duration-500 ease-in-out " +
            (!cardExpand ? "truncate" : "")
          }
          style={{
            color: commentColor,
            lineHeight: "1.5",
            textAlign: "left",
            marginBottom: !cardExpand && review.comment.length > 60 ? "0.5rem" : 0,
            // KEIN whiteSpace: "nowrap" hier! Wird durch truncate gemanaged.
          }}
        >
          {review.comment}
        </p>
        {/* Footer: Badge, Datum, Button */}
        <div className="flex items-center justify-between ">
          <div className="flex items-center gap-2">
            <Badge />
            <span
              className={`text-xs block ${cardExpand ? "py-3" : "py-0"}`}
              style={{ color: commentColor, fontSize: cardExpand ? "17px" : "15px" }}
            >
              {review.date}
            </span>
          </div>
          {/* Rechts: Button */}
          {!cardExpand && review.comment.length > 60 && (
            <button
              onClick={onWeiterlesen}
              className="text-sm px-3 py-1 rounded-full text-white transition"
              style={{
                backgroundColor: color,
              }}
            >
              Weiterlesen
            </button>
          )}
          {cardExpand && (
            <button
              onClick={onClose}
              className="absolute top-1 right-3 text-gray-400 hover:text-gray-800 text-3xl  rounded-full px-2 py-1 transition"
            >
              ×
            </button>
          )}
        </div>
      </div>
    </div>
  );
}


// ⭐️ 2. Social-Style
if (cardLayout === "social-style") {
  return (
    <div className="relative flex flex-col feedback-card-scroll">
      <div
        ref={scrollRef}
        className={boxClasses + " items-center feedback-card-scroll"}
        style={{
          backgroundColor:
            stylePreset === "transparent" || stylePreset === "apple-transparent"
              ? "transparent"
              : accentColor,
          borderRadius: boxRadius,
          fontSize: textFontSize,
          position: "relative",
          minHeight: Math.max(90, parseInt(textFontSize, 10) * 5),
          minWidth: cardExpand ? "100%" : "300px",
          maxWidth: cardExpand ? "100%" : "300px",
          margin: cardExpand ? "0 auto" : "",
          maxHeight: cardExpand ? 178 : undefined,
          overflowY: cardExpand ? "auto" : undefined,
        }}
      >
        {/* Badge, Name & Stars: Horizontal */}
        <div className="flex items-center justify-center gap-2 w-full mb-1">
          <Badge />
          <span
            className="font-semibold"
            style={{
              color: nameColor,
              fontSize: cardExpand ? "20px" : "18px"
            }}
          >
            {review.name}
          </span>
          <div className="flex items-center">
            {Array.from({ length: 5 }, (_, index) => (
              <Star
                key={index}
                className={cardExpand ? "w-5 h-5" : "w-5 h-5 mb-1"}
                style={{ color: index < review.rating ? "#facc15" : "#d1d5db" }}
                fill={index < review.rating ? "currentColor" : "none"}
              />
            ))}
          </div>
        </div>

        {/* Kommentar */}
        <p
          ref={commentRef}
          className={
            "italic transition-all duration-500 ease-in-out w-full " +
            (!cardExpand ? "truncate text-center" : "text-center")
          }
          style={{
            color: commentColor,
            lineHeight: "1.5",
             marginBottom: !cardExpand && review.comment.length > 60 ? "0.2rem" : 0,
            fontSize: cardExpand ? "20px" : "inherit",
          }}
        >
          {review.comment}
        </p>

        {/* Datum */}
        <span
          className={`text-xs block ${cardExpand ? "py-2" : "py-1"}`}
          style={{ color: commentColor, fontSize: cardExpand ? "17px" : "15px" }}
        >
          {review.date}
        </span>

        {/* Button */}
        {!cardExpand && review.comment.length > 60 && (
          <button
            onClick={onWeiterlesen}
            className="text-base text-gray-400 hover:text-gray-700 rounded transition"
          >
            Weiterlesen
          </button>
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
  );
}



// ⭐️ 3. Default Layout (dein aktuelles!)
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
        minWidth: cardExpand ? "100%" : "300px",
        maxWidth: cardExpand ? "100%" : "300px",
        margin: cardExpand ? "0 auto" : "",
        maxHeight: cardExpand ? 178 : undefined,
        overflowY: cardExpand ? "auto" : undefined,
      }}
    >
      {/* Name, Badge, Sterne */}
      <div className="flex items-center gap-2 mb-1">
        <Badge />
        <p
          className="font-semibold"
          style={{
            color: nameColor,
            fontSize: cardExpand ? "20px" : "18px",
          }}
        >
          {review.name}
        </p>
        <div className="flex items-center">
          {Array.from({ length: 5 }, (_, index) => (
            <Star
              key={index}
              className={cardExpand ? "w-6 h-6" : "h-5 w-5 mb-1"}
              style={{
                color: index < review.rating ? "#facc15" : "#d1d5db",
              }}
              fill={index < review.rating ? "currentColor" : "none"}
            />
          ))}
        </div>
      </div>

      {/* Kommentar */}
      <p
        ref={commentRef}
        className={
          "italic transition-all duration-500 ease-in-out w-full " +
          (!cardExpand ? "truncate" : "")
        }
        style={{
          color: commentColor,
          lineHeight: "1.5",
          textAlign: "left",
          marginBottom: !cardExpand && review.comment.length > 60 ? "0.5rem" : 0,
          fontSize: cardExpand ? "20px" : "inherit",
        }}
      >
        {review.comment}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between mt-auto w-full">
        <div className="flex items-center gap-2">
        
          <span
            className={`text-xs block ${cardExpand ? "py-3" : "py-0"}`}
            style={{ color: commentColor, fontSize: cardExpand ? "17px" : "15px" }}
          >
            {review.date}
          </span>
        </div>
        {/* Rechts: Button */}
        {!cardExpand && review.comment.length > 60 && (
          <button
            onClick={onWeiterlesen}
            className="text-base text-gray-400 hover:text-gray-700 rounded transition"
          >
            Weiterlesen
          </button>
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