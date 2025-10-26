import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
  build: {
    // Increase chunk size warning limit to 1000kb (1MB)
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Manual chunk splitting for better caching
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom'],
          'motion-vendor': ['motion/react'],
          'ui-vendor': ['lucide-react'],
          // Put all shadcn/ui components in separate chunk
          'ui-components': [
            './components/ui/button',
            './components/ui/input',
            './components/ui/select',
            './components/ui/dialog',
            './components/ui/card',
            './components/ui/dropdown-menu',
          ],
        },
      },
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'motion/react', 'lucide-react'],
  },
});
