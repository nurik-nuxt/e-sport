import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  build: {
    outDir: 'dist'
  },
  server: {
    fs: {
        // Allow serving files from one level up to the project root
        allow: ['..']
    }
  }
})
