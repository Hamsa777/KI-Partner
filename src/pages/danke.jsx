import React, { useEffect, useState } from "react";
import Logo from "../assets/KI-Partner Vektorlogo.png";

export default function DankeSeite() {
  const [secretKey, setSecretKey] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchSecret = async () => {
      try {
        // 1️⃣ Rufe dein Make-Webhook auf (der das Secret erzeugt und zurückgibt)
        const res = await fetch("https://hook.eu2.make.com/lr1tfhcsg58ckwvxgzcwaf7b8u4d4w5v", {
          method: "POST",
        });
        const { SecretKey } = await res.json();

        if (SecretKey) {
          setSecretKey(SecretKey);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error(err);
        setError(true);
      }
    };

    fetchSecret();
  }, []);

  // Baue die Tally-URL mit dem abgefragten secretKey
  const tallyUrl = secretKey
    ? `https://tally.so/r/wAao5z?secretKey=${secretKey}`
    : null;

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-10 px-6 text-center">
      {/* Logo */}
      <img
        src={Logo}
        alt="KI-Partner Logo"
        className="w-56 h-auto mb-6"
      />

      {/* Überschrift */}
      <h1 className="text-3xl font-bold mb-4 text-black">
        Vielen Dank für Ihren Kauf bei KI-Partner!
      </h1>

      {/* Beschreibung */}
      <p className="text-gray-700 text-base mb-6 max-w-xl">
        Im nächsten Schritt gehen Sie durch das Onboarding.
      </p>

      {/* Fehler- oder Ladezustand */}
      {error ? (
        <p className="text-red-600 mb-4">
          Es ist ein Fehler aufgetreten. Bitte kontaktieren Sie uns.
        </p>
      ) : !secretKey ? (
        <p className="text-gray-600 mb-4">Lade Ihren persönlichen Link…</p>
      ) : (
        /* Onboarding-Button mit secretKey in der URL */
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
