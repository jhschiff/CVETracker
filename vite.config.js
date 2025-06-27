import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import { resolve } from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [TanStackRouterVite({ autoCodeSplitting: true }), viteReact()],
  test: {
    globals: true,
    environment: "jsdom",
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  // server: {
  //   proxy: {
  //     '/kev': {
  //       target: 'https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json',
  //       changeOrigin: true,
  //       rewrite: (path) => '',
  //       secure: false,
  //     },
  //   },
  // }
});
