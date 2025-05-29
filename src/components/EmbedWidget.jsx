// src/components/EmbedWidget.jsx
import React, { useEffect } from "react";

export default function EmbedWidget() {
  // Trigger Reflow nach Mount, um Visibility-Probleme zu umgehen
  useEffect(() => {
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 100);
  }, []);

  return (
    <section className="py-10 px-4 text-center bg-white">
      <div className="flex justify-center">
        <div className="w-full max-w-[900px]">
          <iframe
            src="https://www.ki-partner24.de/feedback/c9f21e5d"
            width="100%"
            height="320"
            style={{ border: "none", display: "block" }}
            loading="lazy"
            title="Kundenbewertungen Widget von KI-Partner"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
