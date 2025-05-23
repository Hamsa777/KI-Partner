// vite.widget.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'widget-dist', // nicht public → sicherer, sauberer
    emptyOutDir: true,     // dist-Ordner bei jedem Build leeren
    lib: {
      entry: path.resolve(__dirname, 'feedback.js'), // Einstiegspunkt
      name: 'FeedbackWidget',
      fileName: () => 'feedback.iife.js',
      formats: ['iife']
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
});
