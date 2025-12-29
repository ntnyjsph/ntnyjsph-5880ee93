import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { writeFileSync, mkdirSync } from "fs";

// Plugin to copy .nojekyll to dist folder
const nojekyllPlugin = () => ({
  name: 'copy-nojekyll',
  closeBundle() {
    try {
      mkdirSync('dist', { recursive: true });
      writeFileSync('dist/.nojekyll', '');
    } catch (e) {
      // Ignore errors
    }
  }
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "./",
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    nojekyllPlugin()
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
