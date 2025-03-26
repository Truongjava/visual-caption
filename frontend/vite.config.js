import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "./",  // ⚠️ Thêm dòng này để sử dụng đường dẫn tương đối
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    proxy: {
      "/api": {
        target: "https://visual-caption-backend.onrender.com",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, "/api"), // Giữ nguyên /api trong URL backend
      },
    },
  },
  build: {
    outDir: "dist", // Đảm bảo build ra thư mục dist
  },
});
