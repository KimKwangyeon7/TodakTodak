import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
// import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  assetsInclude: ['**/*.mem'],
  workboxOptions: {
    include: [/^index\.html$/, /\.css$/, /\.js$/, /^manifest\.json$/, /\.png$/],
    exclude: []
  },
  publicPath: '/public',
  plugins: [
    vue(),
    VitePWA({
      srcDir: 'public',
      filename: 'firebase-messaging-sw.js',
      devOptions: {
        enabled: true,
        type: 'module',
      },
      strategies: 'injectManifest',
      injectManifest: {
        injectionPoint: undefined
      },
      manifest: {
        "name": "todak",
        "short_name": "todak",
        "icons": [
          {
            "src": "/logo/KakaoTalk_20240208_220849622.jpg",
            "sizes": "192x192",
            "type": "image/png",
            "purpose": "any"
          },
          {
            "src": "/logo/KakaoTalk_20240208_220849622.jpg",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "maskable"
          }
        ],
        "start_url": "/",
        "display": "standalone",
        "background_color": "#ffffff",
        "theme_color": "#ffffff"
      },
      workbox: {
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
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

})