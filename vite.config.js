import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  test: { // Vitest config
    environment: 'happy-dom' // Emulates a web browser for testing purposes
  }
})
