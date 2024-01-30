import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  workboxOptions: {
    include: [/^index\.html$/, /\.css$/, /\.js$/, /^manifest\.json$/, /\.png$/],
    exclude: []
  },
  publicPath: '',
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  pwa: {
    workboxOptions: {
        runtimeCaching: [{
                urlPattern: /\.png$/,
                handler: 'CacheFirst',
                options: {
                    cacheName: 'png-cache',
                    expiration: {
                        maxEntries: 10, // 총 파일 10개까지 캐시
                        maxAgeSeconds: 60 * 60 * 24 * 365, // 1년 캐시 
                    }
                }
            },
            {
                urlPattern: /\.json$/,
                handler: 'StaleWhileRevalidate',
                options: {
                    cacheName: 'json-cache',
                    cacheableResponse: {
                        statuses: [200]
                    }
                },
            }
        ],
    }
  },
})
