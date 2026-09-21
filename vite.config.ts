import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/__cog_bucket/": {
        target: "https://storage.yandexcloud.net",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/__cog_bucket/, ""),
      },
    },
  },
  optimizeDeps: {
    exclude: ["maplibre-gl"],
  },
  resolve: {
    alias: {
      "@tabler/icons-react": "@tabler/icons-react/dist/esm/icons/index.mjs",
      "@": resolve(__dirname, "src"),
    },
  },
});
