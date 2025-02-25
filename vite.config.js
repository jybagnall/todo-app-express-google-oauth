import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // all requests that start with "/api" should go to our express server running on port 5000
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false
      }
    }
  }
});
