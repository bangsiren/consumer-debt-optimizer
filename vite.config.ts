import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["react", "react-dom", "@jbaluch/components", "styled-components"],
  },
  server: {
    port: 5176,
    host: true,
    proxy: {
      '/api': {
        target: 'https://velocity-navigator-backend-dev.azurewebsites.net',
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
