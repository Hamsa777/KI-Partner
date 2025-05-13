import React from "react";
import HeroSection from "./components/HeroSection";
import ServiceCards from "./components/ServiceCards";
import Warum from "./components/Warum";
import Testimonials from "./components/Testimonials";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import WidgetBot from "./components/WidgetBot";

export default function KIPartnerLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 text-black font-sans">
      <HeroSection />
      <ServiceCards />
      <Warum />
      <Testimonials />
      <ContactSection />
      <Footer />
      <WidgetBot /> {/* Nur hier sichtbar */}
    </div>
  );
}
