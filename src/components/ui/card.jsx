import React from "react";

export function Card({ children }) {
    return <div className="rounded-xl shadow p-4 bg-white">{children}</div>;
  }
  
  export function CardContent({ children, className = "" }) {
    return <div className={className}>{children}</div>;
  }
  