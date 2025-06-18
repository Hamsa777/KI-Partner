import { motion } from "framer-motion";
import React, { useEffect } from "react";

export default function MyWidget() {
 useEffect(() => {
  const handleResizeMessage = (event) => {
    if (event.data?.type === "widgetResize") {
      const iframe = document.getElementById("kiFeedbackWidget");
      if (iframe && event.data.height) {
        iframe.style.height = event.data.height + "px";
      }
    }
  };

  window.addEventListener("message", handleResizeMessage);
  return () => window.removeEventListener("message", handleResizeMessage);
}, []);


  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <iframe
        id="kiFeedbackWidget"
        src="https://www.ki-partner24.de/embed/ffc5042a"
        width="100%"
        height="260"
        style={{ border: "none", display: "block" }}
        loading="lazy"
        title="Kundenbewertungen Widget"
      />
    </motion.div>
  );
}
