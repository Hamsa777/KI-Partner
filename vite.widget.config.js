import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'widget-dist',            // ⬅︎ Output-Folder (nicht public!)
    emptyOutDir: true,
    lib: {
      entry: path.resolve(__dirname, 'feedback.js'), // ⬅︎ dein Einstiegspunkt
      name: 'FeedbackWidget',                        // ⬅︎ globaler Name (optional)
      fileName: () => 'feedback.iife.js',
      formats: ['iife'],                             // ⬅︎ IIFE für <script>-Einbindung
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
