import React from "react";
import { services } from "../data/services";
import { Link } from "react-router-dom";
import * as Icons from "react-icons/fa";
import { motion } from "framer-motion";

export default function ServiceCards() {
  return (
    <section className="pt-0 px-2 max-w-7xl mx-auto">
      {/* Überschrift mit Fade-Down */}
      <motion.h2
        initial={{ opacity: 0, y: 0 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="text-3xl sm:text-5xl font-bold text-black my-12 text-center tracking-tight"
      >
        Unsere KI-Systeme
      </motion.h2>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {services.map(({ id, title, description, icon, url, isExternal }) => {
          const IconComponent = Icons[icon];

          const Card = (
            <div className="rounded-2xl border border-black bg-white p-6 shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 duration-300 ease-in-out text-center flex flex-col items-center justify-center h-full">
              {IconComponent && (
                <IconComponent className="w-8 h-8 text-black mb-3 mx-auto" />
              )}
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
            </div>
          );
          

          return isExternal ? (
            <a
              key={id}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer h-full"
            >
              {Card}
            </a>
          ) : (
            <Link key={id} to={url} className="cursor-pointer h-full">
              {Card}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
