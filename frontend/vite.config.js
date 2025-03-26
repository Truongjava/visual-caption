import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "./", // ⚠️ Giữ lại để đảm bảo đường dẫn tương đối khi deploy
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
  },
  build: {
    outDir: "dist", // Đảm bảo build ra thư mục dist
  },
});
