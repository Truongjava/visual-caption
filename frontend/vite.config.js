// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// export default defineConfig({
//   // base: "./", 
//   plugins: [react()],
//   server: {
//     port: 5173,
//     host: true,
//     proxy: {
//       "/api": {
//         target: "https://visual-caption-backend.onrender.com",
//         changeOrigin: true,
//         secure: false,
//         rewrite: (path) => path.replace(/^\/api/, "/api"), 
//       },
//     },    
//   },
//   build: {
//     outDir: "dist", 
//   },
// });




import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
  },
  build: {
    outDir: "dist",
  },
});
