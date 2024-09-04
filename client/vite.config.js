import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": "http://localhost:3001", // Adjust the URL based on your backend server
    },
  },
  plugins: [react()],
});
