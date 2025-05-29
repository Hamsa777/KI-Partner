import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: 'src/feedback.iife.js',
      name: 'FeedbackWidget',
      formats: ['iife'],
      fileName: () => 'feedback.iife.js',
    },
    outDir: 'dist', // ⬅️ wichtig für deinen Server!
    emptyOutDir: true,
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});
