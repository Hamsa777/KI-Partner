import React from "react";
import HeroSection from "./components/HeroSection";
import ServiceCards from "./components/ServiceCards";
import Warum from "./components/Warum";
import ContactSection from "./components/ContactSection";
import Services from "./components/services";


export default function KIPartnerLanding() {
  return (
  <div className="min-h-screen">
      <HeroSection />
      <ServiceCards />
      <Services />
      <Warum />
      <ContactSection />
        </div>
  );
}