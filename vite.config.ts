import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import viteCompression from "vite-plugin-compression";

// https://vitejs.dev/config/
export default defineConfig({
  base: '/vaiko-vardas-page/',
  plugins: [vue(), viteCompression()],
});
