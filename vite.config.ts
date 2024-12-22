import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths"; // tsconfig.paths.jsonの内容をviteに読み込むプラグイン

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
});
