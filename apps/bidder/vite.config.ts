import { reactRouter } from "@react-router/dev/vite";
import { sentryReactRouter, type SentryReactRouterBuildOptions } from '@sentry/react-router';
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const sentryConfig: SentryReactRouterBuildOptions = {
  org: "drinq",
  project: "quotora-frontend",
  authToken: process.env.SENTRY_AUTH_TOKEN,
};

export default defineConfig(config => ({
  plugins: [tailwindcss(), reactRouter(), sentryReactRouter(sentryConfig, config), tsconfigPaths()],
  sentryConfig,
}));
