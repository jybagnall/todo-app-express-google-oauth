import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
        target:
          process.env.NODE_ENV === "production"
            ? "https://todo-app-express-google-oauth-production-6b03.up.railway.app"
            : "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
// 📍frontend will make requests directly to the backend(Railway)
