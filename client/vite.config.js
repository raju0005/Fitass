import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'



// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),],
  server: {
    host: true, // Enables access from local network
    port: 3000,
    proxy: {
      "/api/": "http://localhost:5000",
    }
  }
})