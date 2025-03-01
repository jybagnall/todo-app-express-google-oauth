import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000", // redirect API calls to backend
        changeOrigin: true, // modify the 'Origin' header to match the 'target'
        secure: false, // disable SSL verification
      },
    },
  },
});
