// src/components/BackgroundLayer.jsx
import React from "react";

export default function BackgroundLayer() {
  return (
    <>
      {/* Base */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-[#020617]" />

      {/* Gradient (durchgehend, keine Kanten) */}
      <div className="pointer-events-none fixed inset-0 z-[1] bg-gradient-to-b from-[#060f27] via-[#020617] to-black" />

      {/* Optional: minimaler Blur wie SmartDrive */}
      <div className="pointer-events-none fixed inset-0 z-[2] bg-black/10 backdrop-blur-[2px]" />
    </>
  );
}