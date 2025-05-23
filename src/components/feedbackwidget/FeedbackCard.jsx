import { useRef, useState, useEffect } from "react";
import { Star } from "lucide-react";
import { ShieldCheck } from "lucide-react";

export default function FeedbackCard({
  review,
  accentColor = "#f8f8f8",
  nameColor = "#222",
  commentColor = "#222",
  dateColor = "#222",
  boxRadius = "16px",
  fontSize = "14px",
  stylePreset = "classic"
  
}) {
  const [expanded, setExpanded] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const commentRef = useRef(null);

  useEffect(() => {
    if (commentRef.current) {
      const lineHeight = parseFloat(getComputedStyle(commentRef.current).lineHeight);
      const maxVisibleHeight = lineHeight * 2;
      if (commentRef.current.scrollHeight > maxVisibleHeight) {
        setShowButton(true);
      }
    }
  }, []);
  let boxClasses = "p-4 flex flex-col transition-all duration-300";

  if (stylePreset === "glass") {
    boxClasses += " bg-white/10 backdrop-blur-lg border border-white/30 shadow-lg";
  }
   else if (stylePreset === "flat") {
    boxClasses += " bg-transparent border border-gray-200 shadow-none";
  } else {
    boxClasses += " bg-white shadow-lg"; // default: classic
  }
  
  return (
    <div className="min-w-[260px] max-w-[260px] flex-shrink-0">
      <div
  className={`${boxClasses} ${expanded ? "" : "min-h-[120px]"}`}
        style={{
          backgroundColor: accentColor,
          borderRadius: boxRadius,
          position: "relative",
          minHeight: "115px",
        }}
      >
      
      {/* Name + Badge + Sterne */}
<div className="flex items-center gap-2 mb-1">
  {/* Badge links */}
  <div className="relative group">
  <div className="flex items-center justify-center w-6 h-6 bg-white/20 rounded-full shadow-inner group-hover:animate-bounce-slow transition-transform">
    <ShieldCheck className="w-4 h-4 text-green-500" />
  </div>
  <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 bg-gray-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-50 shadow">
    Verifiziert durch KI-Partner
  </div>
</div>



  {/* Name */}
  <p className="font-semibold text-base" style={{ color: nameColor }}>
    {review.name}
  </p>

  {/* Sterne */}
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
          className={`text-sm italic overflow-hidden transition-all duration-300 ${expanded ? "line-clamp-none" : "line-clamp-1"}`}
          style={{ color: commentColor }}
        >
          "{review.comment}"
        </p>

        {/* Weiterlesen/Verbergen */}
        {showButton && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-sm text-blue-600 mt-1 self-start hover:underline"
          >
            {expanded ? "Verbergen" : "Weiterlesen"}
          </button>
        )}

        {/* Datum */}
        <p
          className="absolute bottom-3 right-5 text-xs"
          style={{ color: dateColor, fontSize }}
        >
          {review.date}
        </p>
      </div>
    </div>
  );
}
