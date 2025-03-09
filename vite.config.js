import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import AutoImport from "unplugin-auto-import/vite";
import { VitePWA } from "vite-plugin-pwa";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    AutoImport({
      imports: ["react", "react-router-dom"], // Autoimporta React y React Router
      dts: "src/auto-imports.d.ts", // Opcional, mejora autocompletado en TypeScript
      eslintrc: {
        enabled: true, // Genera reglas para ESLint
        filepath: "./.eslintrc-auto-import.json",
        globalsPropValue: true,
      },
    }),
    VitePWA({
      registerType: "autoUpdate",
      inject: {
        // Esto inserta el manifiesto y el Service Worker en el HTML
        injectManifest: true, // Esto toma el manifiesto del archivo y lo inyecta automáticamente
      },
      name: "Mis hábitos",
      short_name: "MisHábitos",
      start_url: "/",
      theme_color: "#676BBE",
      background_color: "#353535",
      display: "standalone",
      description: "Una aplicación para registrar tus hábitos.",
      icons: [
        {
          src: "/calendar192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/calendar512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    }),
  ],
  base: "/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@icons": "@ant-design/icons",
    },
  },
  server: {
    historyApiFallback: true, // Evita el 404 en desarrollo
  },
});
