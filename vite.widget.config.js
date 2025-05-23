import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: "feedback.js",
      name: "FeedbackWidget",
      fileName: "feedback",
      formats: ["iife"], // wichtig für <script> Einbindung!
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {},
      },
    },
  },
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"), // 💥 DAS HIER
  },
});
