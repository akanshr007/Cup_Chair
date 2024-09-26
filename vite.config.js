import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
  return {
    build: {
      outDir: 'build',
    },
    plugins: [react()],
    server: {
      host: true,
      port: 3000,
      // open: "/app",
    },
    preview: {
      // open: "/app",
      port: 3000, // This is the port which we will use in docker
    },
  };
});