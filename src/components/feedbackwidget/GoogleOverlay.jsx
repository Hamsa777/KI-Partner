import { useState } from "react";

export default function GoogleOverlay({ size = 15, logoSize = 16, offset = 3 }) {
 

  return (
    <div
      style={{
        position: "absolute",
        right: `-${offset}px`,
        bottom: `-${offset}px`,
        width: `${size}px`,
        height: `${size}px`,
        background: "white",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 0 0 2px white",
        zIndex: 2,
    
      }}
      
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/800px-Google_%22G%22_logo.svg.png"
        alt="Google"
        style={{
          width: `${logoSize}px`,
          height: `${logoSize}px`
        }}
        draggable={false}
      />
  
    </div>
  );
}
