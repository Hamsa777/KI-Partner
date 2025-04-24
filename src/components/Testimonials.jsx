// src/components/Testimonials.jsx
import React from "react";

export default function Testimonials() {
    return (
      <section className="py-20 bg-white text-center">
        <h2 className="text-3xl font-bold mb-10">Was unsere Kunden sagen</h2>
        <div className="max-w-6xl mx-auto grid gap-8 grid-cols-1 md:grid-cols-3 px-4">
          <div className="bg-gray-100 p-6 rounded-xl shadow-md">
            <p className="text-gray-700 italic mb-4">
              „KI-Partner hat unser Unternehmen in die Zukunft katapultiert. Die automatisierten Prozesse sparen uns täglich Stunden.“
            </p>
            <p className="font-semibold text-gray-900">– Markus B., IT-Dienstleister</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-xl shadow-md">
            <p className="text-gray-700 italic mb-4">
              „Einfach, effizient und professionell. Unsere Angebote werden jetzt automatisch erstellt – ganz ohne Aufwand.“
            </p>
            <p className="font-semibold text-gray-900">– Sandra L., Agenturinhaberin</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-xl shadow-md">
            <p className="text-gray-700 italic mb-4">
              „Die Terminbuchung über den KI-Bot funktioniert einwandfrei. Unsere Kunden sind begeistert!“
            </p>
            <p className="font-semibold text-gray-900">– Tobias R., Gesundheitszentrum</p>
          </div>
        </div>
      </section>
    );
  }