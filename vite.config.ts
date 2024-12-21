import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths"; // tsconfig.paths.jsonの内容をviteに読み込むプラグイン

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      "styled-components": path.resolve(
        __dirname,
        "node_modules",
        "styled-components"
      ),
    },
  },
});
