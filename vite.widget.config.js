import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'public',
    emptyOutDir: false, // damit andere public-Dateien wie index.html nicht gelöscht werden
    lib: {
      entry: path.resolve(__dirname, 'feedback.js'),
      name: 'FeedbackWidget',
      fileName: () => 'feedback.iife.js',
      formats: ['iife']
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true
      }
    }
  }
});
