import { defineConfig, type UserConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [
    react(), 
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  json: {
    stringify: true,
  },
  build: {
    outDir: "dist",
    minify: "terser",
    sourcemap: true,
    chunkSizeWarningLimit: 1000,
  },
} as UserConfig);