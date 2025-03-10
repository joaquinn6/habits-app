import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import AutoImport from "unplugin-auto-import/vite";
import { VitePWA } from "vite-plugin-pwa";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

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
      devOptions: {
        enabled: true,
      },
      includeAssets: ["calendar192.png.png", "calendar.svg"],
      manifest: {
        name: "Hábitos",
        short_name: "MyH",
        description: "My Awesome App description",
        theme_color: "#ffffff",
        icons: [
          {
            src: "calendar192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "calendar512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
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
  optimizeDeps: {
    include: ["antd"], // Asegúrate de que Ant Design esté siendo optimizado
  },
});
