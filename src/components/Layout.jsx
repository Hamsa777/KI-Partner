// src/components/Layout.jsx
import React from "react";
import Header from "./Header";
import Footer from "./footer";
import { Outlet } from "react-router-dom";
import BackgroundLayer from "./BackgroundLayer";

export default function Layout() {
  return (
    <div className="relative min-h-screen text-white overflow-x-hidden">
      {/* ✅ Globaler Base-Background wie SmartDrive */}
      <BackgroundLayer />

      {/* ✅ Alles Content darüber */}
      <div className="relative z-10">
        <Header />
        <main className="pt-0">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}