import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
    // Pages are viewed through the Next.js dev server on :3000 (see
    // server/next.config.ts's rewrite), which proxies plain HTTP but not
    // the HMR websocket upgrade — so the client connects to Vite directly.
    hmr: {
      host: "localhost",
      port: 5173,
    },
  },
})
