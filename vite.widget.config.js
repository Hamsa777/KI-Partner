// vite.widget.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: 'feedback.js',
      name: 'FeedbackWidget',
      fileName: 'feedback',
      formats: ['iife'], // nur eine globale Datei für <script src="">
    },
    outDir: 'dist',
    emptyOutDir: true,
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
});
