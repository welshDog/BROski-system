import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components')
    }
  },
  build: {
    sourcemap: true,
    chunkSizeWarningLimit: 20,
    rollupOptions: {
      output: {
        manualChunks: (id: string) => {
          if (id.includes('node_modules')) {
            if (id.includes('@react-three/drei')) return 'vendor-drei';
            if (id.includes('three')) return 'vendor-three';
            if (id.includes('react')) return 'vendor-react';
          }
          return undefined;
        }
      }
    }
  },
  preview: {
    host: true,
    port: 4173
  }
});
