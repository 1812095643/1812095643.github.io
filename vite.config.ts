import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      'vue': 'vue/dist/vue.esm-bundler.js',
    },
  },
  server: {
    port: 5173,
    open: false,
    // Ensure SPA fallback for direct deep links
    fs: {
      // allow serving files from project root
      allow: ['..']
    }
  },
  build: {
    rollupOptions: {
      input: 'index.html'
    }
  }
})
