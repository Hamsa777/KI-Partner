// src/components/Header.jsx
import React from "react";

export default function Header() {
    return (
      <header className="py-10 text-center bg-white sticky top-0 z-20 shadow-md">
        <div className="relative z-10 bg-white">
          <h1 className="text-5xl font-extrabold tracking-tight mb-2">Ihr KI-Partner</h1>
          <p className="text-lg text-gray-600 pb-4">Wir automatisieren Ihr Unternehmen mit KI</p>
        </div>
      </header>
    );
  }