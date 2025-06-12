import { motion } from "framer-motion";

export default function MyWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <iframe
        src="https://www.ki-partner24.de/embed/ffc5042a"
        width="100%"
        height="280"
        style={{ border: "none", display: "block" }}
        loading="lazy"
        title="Kundenbewertungen Widget"
      />
    </motion.div>
  );
}
