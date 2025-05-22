import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
  ],
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
  resolve: {
    alias: [
      { find: "@components", replacement: "/src/components" },
      { find: "@hooks",      replacement: "/src/hooks" },
      { find: "@context",    replacement: "/src/context" },
      { find: "@utils",      replacement: "/src/utils" },
      { find: "@data",       replacement: "/src/data" },
      { find: "@types",      replacement: "/src/types" },
    ],
  },
  server: {
    port: 3000,
    open: true,
  },
});
