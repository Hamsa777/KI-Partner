import React, { useEffect, useState, useRef } from "react";
import FeedbackCard from "./feedbackwidget/FeedbackCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import sampleData from "../assets/sampleData.json";
import Extractor from "./feedbackwidget/Extractor";
import GPTCard from "./feedbackwidget/GPTCard";

export default function FeedbackWidget({
  firmaId,
  config: propConfig,
  activeTab,
  editorMode = false,
  backgroundImagePosition,
  setBackgroundImagePosition,
}) {
  const [config, setConfig] = useState(null);
  const [bewertungen, setBewertungen] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fontLoaded, setFontLoaded] = useState(false);
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [expandedReview, setExpandedReview] = useState(null);
  const widgetRef = useRef(null);
  const [lockedSize, setLockedSize] = useState(null);
  const [extract, setExtract] = useState("");
  const [alreadyAnimatedGPTCard, setAlreadyAnimatedGPTCard] = useState(false);
  const [lastIndex, setLastIndex] = useState(null); 
  

  const handleWeiterlesen = (review, visibleIndex) => {
  if (widgetRef.current && !lockedSize) {
    const rect = widgetRef.current.getBoundingClientRect();
    setLockedSize({ width: rect.width, height: rect.height });
  }
  setExpandedReview(review);
  setLastIndex(visibleIndex);

  // HIER: Immer Animation erlauben, wenn auf „Anzeigen“ gedrückt wird
  setAlreadyAnimatedGPTCard(false);
};


const handleClose = () => {
  setExpandedReview(null);
  setLockedSize(null);

  if (lastIndex !== null && containerRef.current) {
    const cardWidthWithGap = cardWidth + gap;
    const feedbackOffset = gptReview ? 1 : 0;
    setTimeout(() => {
      containerRef.current.scrollTo({
        left: (lastIndex + feedbackOffset) * cardWidthWithGap,
        behavior: "smooth"
      });
    }, 0);
  }
};



  
// ---- RESPONSIVE BREAKPOINT LOGIK ----
const { visibleCards = 3 } = config || {};
const usedBreakpoint =
  visibleCards === 4 ? 1200 :
  visibleCards === 3 ? 1100 :
  visibleCards === 2 ? 700 : 900;

// extract vom Server laden
useEffect(() => {
  if (!firmaId) return;
  const fetchExtract = async () => {
    try {
      const response = await fetch(
        `https://feedback.ki-partner24.de/api/extracted/${firmaId}.json`
      );
      if (!response.ok) throw new Error("Extract nicht gefunden");
      const data = await response.json();
      setExtract(data.extracted || "");
    } catch (error) {
      console.error("Fehler beim Laden des Extracts:", error.message);
    }
  };
  fetchExtract();
}, [firmaId]);

const gptReview = extract
  ? {
      name: "Review Highlights",
      rating: 0,
      comment: extract,
      profilePhotoUrl: "",
      date: "",
      isGPT: true,
    }
  : null;


useEffect(() => {
  function check() {
    setIsMobile(window.innerWidth < usedBreakpoint);
  }
  check();
  window.addEventListener("resize", check);
  return () => window.removeEventListener("resize", check);
}, [usedBreakpoint]);


  // Drag für Hintergrundbild (Editor-Feature)
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging || !dragRef.current) return;
      console.log("DRAG MOVE", e.clientX, e.clientY);
      const rect = dragRef.current.getBoundingClientRect();
      const x = 100 - ((e.clientX - rect.left) / rect.width) * 100;
      const y = 100 - ((e.clientY - rect.top) / rect.height) * 100;
      if (config?.setBackgroundImagePosition) {
        config.setBackgroundImagePosition({
          x: Math.min(100, Math.max(0, x)),
          y: Math.min(100, Math.max(0, y)),
        });
      }
    };
    const stopDragging = () => setIsDragging(false);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", stopDragging);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", stopDragging);
    };
  }, [isDragging, config]);

  // Config laden (Editor hat Vorrang)
  useEffect(() => {
    if (propConfig) {
      setConfig(propConfig);
    } else if (firmaId) {
      const url = `https://feedback.ki-partner24.de/feedback-api/config-json/${firmaId}.json?t=${Date.now()}`;
      fetch(url)
        .then((res) => res.json())
        .then(setConfig)
        .catch((err) => console.error("❌ Fehler beim Laden der Config:", err));
    }
  }, [propConfig, firmaId]);

  // Google Font dynamisch laden
  useEffect(() => {
    if (!config?.font) return;
    const cleanFont = config.font.trim().replace(/['"]/g, "").split(",")[0];
    const fontName = cleanFont.replace(/ /g, "+");
    const href = `https://fonts.googleapis.com/css2?family=${fontName}:wght@400;500;600;700;800;900&display=swap`;
    if (document.querySelector(`link[href="${href}"]`)) {
      setFontLoaded(true);
      return;
    }
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    link.onload = () => setFontLoaded(true);
    document.head.appendChild(link);
  }, [config?.font]);

  // Bewertungen laden (Demo/Server)
  useEffect(() => {
    if (!firmaId) {
      // Demo-Modus
      const parsed = sampleData.map((entry) => ({
        date: new Date(entry.date).toLocaleDateString("de-DE", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
        name: entry.name,
        rating: parseInt(entry.rating),
        comment: entry.comment,
        profilePhotoUrl: entry.profilePhotoUrl,
      }));
      setBewertungen(parsed);
      setLoading(false);
      return;
    }
    const url = `https://feedback.ki-partner24.de/api/feedback/${firmaId}`;
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        const parsed = json.map((entry) => ({
          date: new Date(entry.date).toLocaleDateString("de-DE", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }),
          name: entry.name,
          rating: parseInt(entry.rating),
          comment: entry.comment,
          profilePhotoUrl: entry.profilePhotoUrl,
        }));
        // Nur einzigartige Einträge
        const unique = [];
        const seen = new Set();
        for (const fb of parsed) {
          const key = `${fb.name}-${fb.comment}-${fb.date}`;
          if (!seen.has(key)) {
            seen.add(key);
            unique.push(fb);
          }
        }
        setBewertungen(unique);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Fehler beim Abrufen der Feedback-Daten:", err);
        setError("Feedback konnte nicht geladen werden.");
        setLoading(false);
      });
  }, [firmaId]);

  // Erst rendern, wenn Config & Font bereit
  if (!config || !fontLoaded) return null;

  // --- Werte aus der Config extrahieren ---
  const {
    color = "#ffffff",
    accentColor = "#f8f8f8",
    font = "Inter, sans-serif",
    textFontSize = "16px",
    radius = "16px",
    boxRadius = "16px",
    customTitle = "Unsere Kundenbewertungen",
    mobileCustomTitle = "",
    logoUrl = null,
    logoSize,
    logoPosition = "right", // NEW: Desktop-Logo-Position
    mobileLogoPosition = "right", // NEW: Mobile-Logo-Position
    theme = "light",
    textColor = theme === "dark" ? "#f5f5f5" : "#222",
    headingStyles = {},
    headingFontSize = "22px",
    arrowColor = "#000",
    arrowBgColor = "#fff",
    widgetStylePreset = "classic",
    stylePreset = "classic",
    backgroundImageUrl = "",
   
    mobileHeadingFontSize = "23px",
    mobileLogoSize = "40px",
    cardLayout = "Standard (klassisch)"
  } = config;

    

 


  // Vorschau-Logik für Editor und Mobilgeräte
  const showMobilePreview = editorMode && activeTab === "mobile";
  const headingFont = showMobilePreview ? mobileHeadingFontSize : (isMobile ? mobileHeadingFontSize : headingFontSize);
  const logoFinalSize = showMobilePreview ? mobileLogoSize : (isMobile ? mobileLogoSize : logoSize);

  // NEU: Titel nur anzeigen, wenn gesetzt – KEIN Fallback!
  const effectiveCustomTitle = (showMobilePreview || isMobile)
    ? (mobileCustomTitle || "") // Leer lassen wenn leer!
    : customTitle;

  // NEU: Logo-Position bestimmen
  const effectiveLogoPosition = (showMobilePreview || isMobile)
    ? (mobileLogoPosition || "right")
    : (logoPosition || "right");

  // Sichtbare Karten
  const cardsToShow = showMobilePreview ? 1 : (isMobile ? 1 : Math.min(visibleCards, 4));
  const cardWidth = 300;    // NEU: 300px breit
  const gap = 20; 
  const containerWidth = cardsToShow * cardWidth + (cardsToShow - 1) * gap;

  // Styles
 const widgetClasses = [
  "space-y-4 p-4 relative transition-all mx-auto",
  widgetStylePreset === "glass"
    ? "bg-white/10 backdrop-blur-md border border-white/20 shadow-lg"
    : widgetStylePreset === "flat"
    ? "bg-transparent border border-gray-200 shadow-none"
    : widgetStylePreset === "transparent"
   ? "bg-white/20 backdrop-blur-sm border border-white/30 shadow-md"
    : widgetStylePreset === "apple-transparent"
    ? "bg-black/25 backdrop-blur-2xl backdrop-saturate-150"
    : "bg-white shadow-xl",
].join(" ");


  const headingStyle = {
    fontSize: headingFont,
    fontWeight: headingStyles.bold ? (headingStyles.weight ?? 700) : 400,
    fontStyle: headingStyles.italic ? "italic" : "normal",
    textDecoration: headingStyles.underline ? "underline" : "none",
    color: headingStyles.color || textColor,
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
  };

  // Logo-Positionierungsklassen (Tailwind)
  let logoPositionClass = "";
  if (effectiveLogoPosition === "left") logoPositionClass = "left-0 mx-0";
  else if (effectiveLogoPosition === "center") logoPositionClass = "left-1/2 -translate-x-1/2 mx-auto";
  else logoPositionClass = "right-0 mx-0"; // Standard: rechts

  // Navigation für Feedbackkarten
  const scrollByCard = (dir) => {
  if (typeof containerRef === "undefined" || !containerRef?.current) return;
  const el = containerRef.current;
  const scroll = dir === "right" ? cardWidth + gap : -(cardWidth + gap);
  el.scrollBy({ left: scroll, behavior: "smooth" });
};


  if (error) return <p className="text-red-500">{error}</p>;
  if (loading) return <p className="text-gray-500 text-sm">Lade Feedback...</p>;
  if (bewertungen.length === 0) {
    // Noch keine echten Bewertungen? Fallback auf Demo
    const parsed = sampleData.map((entry) => ({
      date: new Date(entry.date).toLocaleDateString("de-DE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
      name: entry.name,
      rating: parseInt(entry.rating),
      comment: entry.comment,
      profilePhotoUrl: entry.profilePhotoUrl,
    }));
    setBewertungen(parsed);
    return null;
  }
  
if (expandedReview) {
  // Abstand, falls nur 1 sichtbare Card: sonst 0 Abstand (volle Breite)
  const padding =  0;
  let maxCardWidth = containerWidth - padding;
  maxCardWidth = Math.min(maxCardWidth, 20000); // Passe 900 ggf. nach deinem Geschmack an

  return (
    <div
      ref={widgetRef}
      className="w-full"
      style={{
        backgroundColor: backgroundImageUrl ? undefined : color,
        backgroundImage: backgroundImageUrl ? `url(${backgroundImageUrl})` : undefined,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: backgroundImageUrl
          ? `${backgroundImagePosition?.x ?? 50}% ${backgroundImagePosition?.y ?? 50}%`
          : "center",
        fontFamily: `'${font}', sans-serif`,
        borderRadius: radius,
        maxWidth: `${containerWidth + 80}px`,
        margin: "0 auto",
        width: lockedSize ? lockedSize.width : undefined,
        height: lockedSize ? lockedSize.height : undefined,
        minHeight: lockedSize ? undefined : 320,
        overflow: lockedSize ? "hidden" : "visible",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transition: "width 0.2s, height 0.2s"
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%"
        }}
      >
        <div
          style={{
            display: "inline-block",
            minWidth: 260,              // Optional: kleinste Card-Breite
            maxWidth: maxCardWidth,     // Niemals breiter als Widget
            width: "auto",
            margin: "0 auto"
          }}
        >
          <FeedbackCard
            review={expandedReview}
            
            cardExpand={true}
            onClose={handleClose}
            accentColor={accentColor}
            nameColor={textColor}
            commentColor={textColor}
            boxRadius={boxRadius}
            stylePreset={stylePreset}
            textFontSize={textFontSize}
            cardLayout={cardLayout}
          />
        </div>
      </div>
    </div>
  );
}


  return (
      <div
      ref={el => {
      widgetRef.current = el;
      dragRef.current = el;
      }}
      onMouseDown={() => editorMode && setIsDragging(true)}
      className={`${widgetClasses} ${editorMode ? "no-select" : ""}`}
      style={{
        backgroundColor: backgroundImageUrl ? undefined : color,
        backgroundImage: backgroundImageUrl ? `url(${backgroundImageUrl})` : undefined,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: backgroundImageUrl
          ? `${config.backgroundImagePosition?.x ?? 50}% ${config.backgroundImagePosition?.y ?? 50}%`
          : "center",
        fontFamily: `'${config.font}', sans-serif`,
        borderRadius: radius,
        maxWidth: `${containerWidth + 80}px`, // bei Bedarf auf z.B. +100 erhöhen für noch mehr Padding außen
        cursor: editorMode && backgroundImageUrl ? "grab" : "default",
        userSelect: editorMode ? "none" : "auto"
      }}
    >
      <div className="relative flex justify-center items-center min-h-[40px]">
        {effectiveCustomTitle && (
          <h2 className="text-3xl text-center w-full" style={headingStyle}>
            {effectiveCustomTitle}
          </h2>
        )}
        {logoUrl && (
          <img
            src={logoUrl}
            alt="Logo"
            className={`absolute top-1/2 -translate-y-1/2 ${logoPositionClass}`}
            style={{
              height: logoFinalSize,
              objectFit: "contain"
            }}
          />
        )}
      </div>
      <div className="relative mx-auto" style={{ width: `${containerWidth}px` }}>
        {/* Linker Pfeil */}
        <button
          onClick={() => scrollByCard("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full transform transition-transform duration-150 ease-out hover:scale-110 flex items-center justify-center"
          style={{
            backgroundColor: arrowBgColor,
            marginLeft: "-29px",
          }}
        >
          <ChevronLeft color={arrowColor} />
        </button>
        {/* Feedback-Karten */}
        <div
        
  ref={containerRef}
  className="flex gap-5 overflow-hidden snap-x snap-mandatory"
  style={{
    scrollBehavior: "smooth",
    width: `${containerWidth}px`,
    
  }}
>
  
  {/* KI-Zusammenfassung als erste Card */}
  {gptReview && (
    <div
      key="gpt"
      className="flex-shrink-0 snap-start"
      style={{ minWidth: `${cardWidth}px`, maxWidth: `${cardWidth}px` }}
    >
      
    <GPTCard
  color={color}
  accentColor={accentColor}
  nameColor={textColor}
  commentColor={textColor}
  dateColor={textColor}
  boxRadius={boxRadius}
  stylePreset={stylePreset}
  textFontSize={textFontSize}
  onAnzeigen={() => handleWeiterlesen(gptReview)}
  cardLayout={cardLayout}
  playEntranceAnimation={!alreadyAnimatedGPTCard}
  onEntranceEnd={() => setAlreadyAnimatedGPTCard(true)}
  reviewCount={bewertungen.length}
  
 
/>


    </div>
  )}

  {/* Alle anderen Bewertungen */}
 {bewertungen.slice().reverse().map((review, i) => (
  <div
    key={i}
    className="flex-shrink-0 snap-start"
    style={{ minWidth: `${cardWidth}px`, maxWidth: `${cardWidth}px` }}
  >
    <FeedbackCard
      review={review}
      color={color}
      accentColor={accentColor}
      profilePhotoUrl={review.profilePhotoUrl}
      nameColor={textColor}
      commentColor={textColor}
      dateColor={textColor}
      boxRadius={boxRadius}
      stylePreset={stylePreset}
      textFontSize={textFontSize}
      cardLayout={cardLayout}
      onWeiterlesen={() => handleWeiterlesen(review, i)}
    />
  </div>
))}



        </div>
        <button
          onClick={() => scrollByCard("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full transform transition-transform duration-150 ease-out hover:scale-110 flex items-center justify-center"
          style={{
            backgroundColor: arrowBgColor,
            marginRight: "-29px",
          }}
        >
          <ChevronRight color={arrowColor} />
        </button>
      </div>
      <div
        className="text-center text-[14px] text-gray-500 hover:text-gray-700 mt-0 mb-0 leading-none"
        style={{ fontFamily: 'system-ui' }}
      >
        <a
          href="https://www.ki-partner24.de"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          powered by KI-Partner
        </a>
      </div>
    
 
    </div>
    
  );
}