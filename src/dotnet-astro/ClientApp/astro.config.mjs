// Loading environment variables from .env files
// https://docs.astro.build/en/guides/configuring-astro/#environment-variables
import { loadEnv } from "vite";
const {
  SSL_CRT_FILE,
  SSL_KEY_FILE
} = loadEnv(import.meta.env.MODE, process.cwd(), "");
import { env } from 'process';

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
  env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'http://localhost:37669';


import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  server: {
    port: 44440
  },
  vite: {
    server: {
      // Example: Add custom vite plugins directly to your Astro project
      https: {
        key: fs.readFileSync(SSL_KEY_FILE),
        cert: fs.readFileSync(SSL_CRT_FILE),
      },
      proxy: {
        '/weatherforecast': {
          target: target,
          changeOrigin: true,
        },
      }
    }
  },
  integrations: [tailwind(), react()]
});