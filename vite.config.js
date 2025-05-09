import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  
  build: {
    outDir: 'dist',
  },
  // Wichtig für SPA-Fallback (z. B. bei Vercel)
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  base: '/',
});
