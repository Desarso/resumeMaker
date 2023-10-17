import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import path from "path";

export default defineConfig({
  plugins: [solid()],
  base: "",
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
    outDir: "docs",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "/src"),
      "~@": path.resolve(__dirname, "/src"),
    },
  },
});
