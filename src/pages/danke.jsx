import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Logo from "../assets/KI-Partner Vektorlogo.png";

export default function DankeSeite() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [access, setAccess] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!sessionId) {
      setError(true);
      return;
    }

    const fetchAccess = async () => {
      try {
        const res = await fetch("https://hook.eu2.make.com/DEIN-MAKE-WEBHOOK", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ session_id: sessionId })
        });

        const data = await res.json();
        console.log("✅ Access Code erhalten:", data.access);

        if (data.access) {
          setAccess(data.access);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("❌ Fehler beim Abrufen des Access Codes:", err);
        setError(true);
      }
    };

    fetchAccess();
  }, [sessionId]);

  const tallyUrl = access
    ? `https://tally.so/r/wAao5z?access=${access}`
    : null;

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-10 px-6 text-center">
      <img src={Logo} alt="KI-Partner Logo" className="w-56 h-auto mb-6" />
      <h1 className="text-3xl font-bold mb-4 text-black">
        Vielen Dank für Ihren Kauf bei KI-Partner!
      </h1>
      <p className="text-gray-700 text-base mb-6 max-w-xl">
        Im nächsten Schritt richten Sie Ihr individuelles Branding ein.
      </p>

      {!access && !error && (
        <p className="text-gray-600 mb-4">Lade deinen persönlichen Link…</p>
      )}

      {error && (
        <p className="text-red-600 mb-4">
          Es ist ein Fehler aufgetreten. Bitte kontaktieren Sie uns.
        </p>
      )}

      {access && (
        <a
          href={tallyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-indigo-700 hover:bg-indigo-900 text-white px-6 py-3 rounded-full font-semibold transition duration-200 mb-6"
        >
          Jetzt Onboarding starten
        </a>
      )}
    </div>
  );
}
