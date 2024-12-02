import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    cors: true,
    watch: {
      usePolling: true,
      interval: 100
    }
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          ui: ["@fortawesome/react-fontawesome", "@fortawesome/free-solid-svg-icons"]
        }
      }
    }
  },
  clearScreen: false
});
