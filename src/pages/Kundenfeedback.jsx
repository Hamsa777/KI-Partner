import React from "react";
import { Link } from "react-router-dom";
import { FaComments, FaShoppingCart } from "react-icons/fa";
import { HiClipboardDocumentCheck } from "react-icons/hi2";
import { motion } from "framer-motion";
import MyWidget from "../components/feedbackwidget/MyWidget";

export default function Kundenfeedback() {
  return (
    <section className="bg-gradient-to-b from-white to-gray-100 min-h-screen px-6 py-14 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-3xl text-center"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8"
        >
          KI-gestütze Feedback Automation
        </motion.h1>

    <motion.p
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ duration: 0.4, delay: 0.2 }}
  viewport={{ once: true }}
  className="text-gray-700 text-lg leading-relaxed mb-4"
>
  <a
    href="https://www.qualtrics.com/blog/online-review-stats/"
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-600 underline"
  >
    Statistisch
  </a>{" "}
  gesehen informieren sich <strong>90 % der Kunden</strong> vor dem Kauf über Bewertungen – <strong>Vertrauen ist kaufentscheidend</strong>.<br />
  Mit unserem System binden Sie ihre besten bestehenden Google-Bewertungen in unser <strong>individuell gestaltbares Feedback-Widget</strong> ein.<br />
  Unsere <strong>KI analysiert sämtliche Kundenstimmen</strong> und erstellt eine professionelle Zusammenfassung, die Ihren Besuchern auf einen Blick zeigt, was Ihre Kunden besonders schätzen.<br />
  So steigern Sie <strong>das Vertrauen in Ihre Marke</strong> und erhöhen Ihre <strong>Verkaufschancen</strong> – mit echtem Social Proof und moderner KI-Unterstützung.
</motion.p>





      <motion.a
  href="/widgetvorschau"
  target="_blank"
  rel="noopener noreferrer"
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.4 }}
  viewport={{ once: true }}
  whileHover={{ scale: 1.02, backgroundColor: "#1a237e" }}
  className="inline-block bg-[#283593] text-white px-6 py-3 rounded-full text-sm sm:text-base font-medium mt-8"
>
  Jetzt Beispiel Designs ansehen
</motion.a>



        {/* Haupt-Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="relative group w-full max-w-sm mx-auto mt-16"
        >
          {/* Card Wrapper mit Hover-Effekten */}
          <div className="bg-white/10 backdrop-blur-md border border-gray-300 rounded-3xl p-6 sm:p-8 shadow-md transition-all duration-300 text-center flex flex-col items-center justify-center cursor-pointer group-hover:scale-[1.03] group-hover:border-[#283593] group-hover:shadow-xl">
            <FaComments className="text-4xl mb-4 text-[#283593]" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Kundenfeedback-System</h3>
            <p className="text-sm text-gray-600">
              Kundenfeedback erfassen, KI-basiert auswerten & automatisch auf Ihrer Website präsentieren.
            </p>
          </div>

          {/* Hover-Overlay mit zwei Buttons */}
          <div className="absolute inset-0 bg-white/95 backdrop-blur-md rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex">
            <a
              href="https://buy.stripe.com/bJebJ19aW4ecgdmbgn7bW06"
              target="_blank"
              rel="noopener noreferrer"
              className="w-1/2 flex flex-col items-center justify-center hover:bg-gray-100 transition rounded-l-3xl"
            >
              <HiClipboardDocumentCheck className="text-4xl mb-3 text-[#283593]" />
              <span className="text-sm font-normal text-black">Jetzt testen</span>
            </a>
            <div className="w-px bg-gray-300 my-6"></div>
            <a
              href="https://buy.stripe.com/fZu5kD1Iu9yw6CMdov7bW07"
              target="_blank"
              rel="noopener noreferrer"
              className="w-1/2 flex flex-col items-center justify-center hover:bg-gray-100 transition rounded-r-3xl"
            >
              <FaShoppingCart className="text-4xl mb-3 text-[#283593]" />
              <span className="text-sm font-normal text-black">Jetzt kaufen</span>
            </a>
          </div>
        </motion.div>

     {/* Timeline */}
<section className="mt-20 px-4">
  <motion.h2
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.6, delay: 1.1 }}
    className="text-2xl sm:text-3xl font-bold text-gray-800 mb-14 text-center"
  >
    So funktioniert’s
  </motion.h2>

  <div className="max-w-xl mx-auto flex flex-col items-center space-y-10 text-center">
    {[
      // Schritt 1
      "Kauf abschließen und direkt zum Onboarding weitergeleitet werden. Dort geben Sie Firmenname, E-Mail und Branche an.",
      // Schritt 2
      "Nach Onboarding erhalten Sie den Link zum Ihrem persönlichen Widget und Ihre bestehenden Google-Bewertugen werden per Import oder manuell von uns eingefügt.",
      // Schritt 3
      "Im Editor gestalten Sie Farben, Logo und Stil nach Wunsch, oder lassen das Design direkt von uns für Sie übernehmen.",
      // Schritt 4
      "Sie erhalten Ihren persönlichen Embed-Code und binden das Widget blitzschnell auf Ihrer Website ein.",
      // Schritt 5
      "Ihre Besucher sehen alle echten Bewertungen inklusive einer KI-Auswertung, die die Kundenstimmen professionell zusammenfasst."
    ].map((text, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: i * 0.1 }}
        viewport={{ once: true }}
        className="flex flex-col items-center"
      >
        <div className="w-8 h-8 rounded-full bg-[#283593] text-white flex items-center justify-center font-semibold text-sm mb-4">
          {i + 1}
        </div>
        <p className="text-gray-700 text-base sm:text-lg">{text}</p>
      </motion.div>
    ))}
  </div>
</section>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ duration: 0.5, delay: 0.4 }}
  viewport={{ once: true }}
>
  
  <a
    href="https://buy.stripe.com/bJebJ19aW4ecgdmbgn7bW06"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block mt-10 px-6 py-3 bg-[#283593] text-white text-sm font-medium rounded-full shadow hover:bg-[#1f2d66] transition"
  >
    Kostenlos testen
  </a>
</motion.div> 

          <Link
            to="/"
            className="inline-block mt-10 text-sm text-gray-600 underline hover:text-gray-900 transition"
          >
            Zurück zur Startseite
          </Link>
        </motion.div>
      </motion.div>
    </section>
    
  );
  
}
