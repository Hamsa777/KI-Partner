// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-sm text-gray-600 py-6 px-4 text-center ">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-center gap-4 mb-2">
          <Link to="/impressum" className="underline hover:text-[#283593]">
            Impressum
          </Link>
          <span>|</span>
          <Link to="/datenschutz" className="underline hover:text-[#283593]">
            Datenschutz
          </Link>
        </div>

        <p className="text-gray-500">
          © {new Date().getFullYear()} KI-Partner – Alle Rechte vorbehalten
        </p>
      </div>
    </footer>
  );
}
