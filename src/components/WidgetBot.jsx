import { useEffect, useRef, useState } from "react";

export default function WidgetBot() {
  const iframeRef = useRef(null);
  const [open, setOpen] = useState(false);

  // Dynamische Config (später per Props oder Automation steuerbar)
  const config = {
    endpoint: "https://chatbot.ki-partner24.de/kunde123/bot",
    welcomeMessage: "Hallo! 👋 Ich bin der Support-Bot von Müller GmbH.",
    primaryColor: "#123456",
    botAvatar: "https://kundenseite.de/logo.png"
  };

  return (
    <>
      <div
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "60px",
          height: "60px",
          borderRadius: "30px",
          backgroundColor: config.primaryColor,
          boxShadow: "0 0 10px rgba(0,0,0,0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          zIndex: 9999
        }}
      >
        <img src={config.botAvatar} alt="Bot" style={{ width: "40px", height: "40px" }} />
      </div>

      {open && (
        <iframe
          ref={iframeRef}
          src={`${config.endpoint}?welcome=${encodeURIComponent(config.welcomeMessage)}`}
          style={{
            position: "fixed",
            bottom: "90px",
            right: "20px",
            width: "350px",
            height: "500px",
            border: "1px solid #ccc",
            borderRadius: "10px",
            background: "white",
            zIndex: 9999
          }}
        ></iframe>
      )}
    </>
  );
}
