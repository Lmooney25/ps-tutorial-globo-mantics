import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Tell vite to run on port 3000
    strictPort: true, // If 3000 isn't available then blow-up.
  }
})
