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
    },
    proxy: {
      // 通过本地代理避免浏览器层的 CORS 与中间节点压缩缓冲，提升流式稳定性
      '/deepseek': {
        target: 'https://api.deepseek.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/deepseek/, ''),
        // 保持与上游的流式传输
        headers: {
          Accept: 'text/event-stream'
        },
        ws: false,
        configure: (proxy) => {
          // 尽力关闭反向代理及上游的缓冲，放大流式效果
          proxy.on('proxyReq', (proxyReq) => {
            proxyReq.setHeader('Cache-Control', 'no-cache, no-transform');
            proxyReq.setHeader('Accept', 'text/event-stream');
          });
          proxy.on('proxyRes', (proxyRes) => {
            try {
              proxyRes.headers['x-accel-buffering'] = 'no';
              proxyRes.headers['cache-control'] = 'no-cache, no-transform';
            } catch {}
          });
        }
      }
    }
  },
  build: {
    rollupOptions: {
      input: 'index.html'
    }
  }
})
