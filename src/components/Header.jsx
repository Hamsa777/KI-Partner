import React from "react";
import logo from "../assets/KI-Partner Vektorlogo.jpeg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// motion-kompatible Link-Komponente
const MotionLink = motion(Link);

export default function Header() {
  return (
    <header className="bg-white sticky top-0 z-30 shadow-sm border-b">
      <div className="relative flex items-center justify-between px-6 pt-5 pb-5 max-w-6xl mx-auto">
        {/* Linke Navigation */}
        <div className="flex items-center space-x-6 text-sm sm:text-base pt-1">
          <Link to="/ueberuns" className="hover:underline text-gray-800">
            Über uns
          </Link>
        {/*  <Link to="/ablauf" className="hover:underline text-gray-800">
            Ablauf
          </Link>
          */}
        </div>
           
        {/* Logo & Slogan – sauber mittig */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center pt-1">
          <Link to="/" className="flex items-center cursor-pointer mt-2">
            <img
              src={logo}
              alt="KI-Partner Logo"
              className="h-8 sm:h-10 w-auto"
            />
          </Link>
          <p className="text-sm sm:text-base text-gray-600 mt-0 tracking-tight">
            Wir automatisieren Ihr Unternehmen mit KI
          </p>
        </div>

        {/* Rechte Navigation */}
        <div className="flex items-center space-x-4 text-sm sm:text-base pt-1">
          <Link
            to="/dokumenten-automatisierung"
            className="hover:underline text-gray-800"
          >
            Demo testen
          </Link>

          <MotionLink
            to="/kontakt"
            whileHover={{
              scale: 1.02,
              backgroundColor: "#1a237e",
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-[#283593] text-white px-4 py-1.5 rounded-full"
          >
            Kontakt
          </MotionLink>
        </div>
      </div>
    </header>
  );
}
