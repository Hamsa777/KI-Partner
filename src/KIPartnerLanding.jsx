import React from "react";
import Header from "./components/Header";
import ServiceCards from "./components/ServiceCards";
import Warum from "./components/Warum";
import Testimonials from "./components/Testimonials";
import ContactSection from "./components/ContactSection";
import { services } from "./data/services"; // ganz oben ergänzen
import Footer from "./components/footer";


export default function KIPartnerLanding() {
 

const scrollToSection = (id) => {
  const service = services.find((s) => s.id === id);

  if (service?.popupUrl) {
    window.open(service.popupUrl, "_blank", "width=800,height=700,resizable=yes,scrollbars=yes,status=no");
  } else {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 text-black font-sans">
      <Header />
      <ServiceCards scrollToSection={scrollToSection} />
      <Warum />
      <Testimonials />
      <ContactSection />
      <Footer />
      
    </div>
  );
}
