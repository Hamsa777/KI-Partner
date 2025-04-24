import React from "react";
import { motion } from "framer-motion";
import { services } from "../data/services";
import * as Icons from "react-icons/fa";

export default function ServiceCards({ scrollToSection }) {
  return (
    <section className="pt-16 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-10 text-center">Unsere Services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {services.map((service) => {
          const Icon = Icons[service.icon];
          return (
            <motion.div
              key={service.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollToSection(service.id)}
              className="cursor-pointer rounded-2xl border border-black bg-white p-6 shadow-lg hover:shadow-xl transition relative overflow-hidden text-center flex flex-col items-center justify-center"
            >
              {Icon && <Icon className="w-8 h-8 text-black mb-3 mx-auto" />}
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{service.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{service.description}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
