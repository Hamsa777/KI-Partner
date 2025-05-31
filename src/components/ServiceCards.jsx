import React from "react";
import { services } from "../data/services";
import { Link } from "react-router-dom";
import * as Icons from "react-icons/fa";
import { motion } from "framer-motion";

export default function ServiceCards() {
  return (
    <motion.section
      className="pt-0 px-4 max-w-7xl mx-auto"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <h2 className="text-4xl sm:text-5xl font-bold text-black my-8 text-center tracking-tight">
        Unsere KI-Systeme
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {services.map(({ id, title, description, icon, url, isExternal }) => {
          const IconComponent = Icons[icon];

          const Card = (
            <div
              className="bg-white/10 backdrop-blur-md border rounded-3xl p-6 sm:p-8 transition-all duration-300 shadow-md hover:shadow-xl hover:scale-[1.03] cursor-pointer text-center flex flex-col items-center justify-center h-full"
              style={{
                borderColor: "rgba(229, 231, 235, 0.4)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#283593";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(229, 231, 235, 0.4)";
              }}
            >
              {IconComponent && (
                <IconComponent className="w-10 h-10 mb-4" style={{ color: "#283593" }} />
              )}
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
              <p className="text-sm text-gray-700 leading-relaxed">{description}</p>
            </div>
          );

          return isExternal ? (
            <a
              key={id}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="h-full"
            >
              {Card}
            </a>
          ) : (
            <Link key={id} to={url} className="h-full">
              {Card}
            </Link>
          );
        })}
      </div>
    </motion.section>
  );
}

