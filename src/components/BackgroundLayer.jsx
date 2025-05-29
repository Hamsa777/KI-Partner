// src/components/BackgroundLayer.jsx
export default function BackgroundLayer() {
  return (
    <>
      {/* Hintergrundbild – feststehend */}
     
      <div
        className="fixed inset-0 -z-50 bg-no-repeat bg-cover bg-center"
        style={{
          backgroundImage: "url('/bg.jpg')",
          backgroundAttachment: "fixed",
        }}
      />

      {/* Optionales Overlay */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm -z-40" />

      {/* Seitenränder für Lichtakzent */}
      <div className="fixed top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-[#1a237e]/30 to-transparent blur-lg -z-40" />
      <div className="fixed top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-[#1a237e]/30 to-transparent blur-lg -z-40" />
    </>
  );
}
