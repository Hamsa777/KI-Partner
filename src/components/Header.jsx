import React from "react";
import logo from "../assets/KI-Partner Vektorlogo.jpeg";

export default function Header() {
  return (
    <header className="bg-white sticky top-0 z-20 shadow-md">
     <div className="flex flex-col items-center pt-9 pb-6">

        <img
          src={logo}
          alt="KI-Partner Logo"
          className="h-[30px] sm:h-[45px] md:h-[50px] w-auto"
        />
        <p className="text-sm sm:text-base text-gray-600 mt-1">
          Wir automatisieren Ihr Unternehmen mit KI
        </p>
      </div>
    </header>
  );
}
