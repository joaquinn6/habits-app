import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import AutoImport from "unplugin-auto-import/vite";
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
