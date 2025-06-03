import React from "react";
import HeroSection from "./components/HeroSection";
import ServiceCards from "./components/ServiceCards";
import Warum from "./components/Warum";
import ContactSection from "./components/ContactSection";
import Footer from "./components/footer";
import WidgetBot from "./components/WidgetBot";
import MyWidget from "./components/feedbackwidget/MyWidget";
export default function KIPartnerLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 text-black font-sans">
      <HeroSection />
      <ServiceCards />
      <Warum />
      <MyWidget />
      <ContactSection />
      <Footer />
      <WidgetBot /> 
    </div>
  );
}