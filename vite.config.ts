import { defineConfig } from "vite";
import aitDevtools from "@apps-in-toss/devtools/unplugin";

export default defineConfig({
  // 상대 경로로 빌드해야 토스 앱 안에서 img/ 경로가 그대로 열린다.
  base: "./",
  plugins: [aitDevtools.vite()],
});
