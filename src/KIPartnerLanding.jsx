import React from "react";
import HeroSection from "./components/HeroSection";
import ServiceCards from "./components/ServiceCards";
import Warum from "./components/Warum";
import ContactSection from "./components/ContactSection";
import Testimonals from "./components/Testimonals";
import Services from "./components/services";
//import WidgetBot from "./components/WidgetBot";
import MyWidget from "./components/feedbackwidget/MyWidget";
export default function KIPartnerLanding() {
  return (
  <div className="min-h-screen">


      <HeroSection />
      <Services />
      <ServiceCards />
      <Testimonals />
      <Warum />
      <ContactSection />
    
     
     
      {/*
  <WidgetBot />
  <MyWidget />
*/}
    </div>
  );
}