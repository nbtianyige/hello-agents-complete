import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve, fileURLToPath } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = resolve(__filename, '..')

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true
      }
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router'],
          antd: ['ant-design-vue']
        }
      }
    }
  }
})
