import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';
import mkcert from 'vite-plugin-mkcert';

export default defineConfig({
    plugins: [
        sveltekit(),
        tailwindcss(),
        mkcert(),
        SvelteKitPWA(
            {
                disable: process.env.NODE_ENV === 'development', // 生产环境才启用 PWA
                registerType: 'autoUpdate', // autoUpdate/ prompt 模式下，当有新内容时，会触发 update 事件，允许我们在 UI 上弹窗提示用户
                strategies: 'generateSW', // 自动生成 SW，如果需要极度定制 SW 逻辑，改为 'injectManifest'
                includeAssets: ['pwa-512x512.png'],
                srcDir: 'src',
                filename: 'service-worker.js',
                workbox: {
                    globPatterns: ['**/*.{js,css,html,ico,png,svg,webp}'],
                    navigateFallback: null,
                    cleanupOutdatedCaches: true,
                    runtimeCaching: [
                        {
                            // 匹配所有“页面导航”请求 (访问 /, /about 等)
                            urlPattern: ({ request }) => request.mode === 'navigate',
                            handler: 'StaleWhileRevalidate',
                            options: {
                                cacheName: 'pages-cache',
                                expiration: {
                                    maxEntries: 50,
                                    maxAgeSeconds: 365 * 24 * 60 * 60 * 100 // 100年才过期
                                },
                                // 允许缓存 200 响应
                                cacheableResponse: {
                                    statuses: [0, 200]
                                }
                            }
                        },
                        {
                            // 缓存 API 请求或其他动态数据 (可选，根据你需求)
                            // 匹配所有 /api 开头的请求
                            urlPattern: ({ url }) => url.pathname.startsWith('/api'),
                            handler: 'StaleWhileRevalidate',
                            options: {
                                cacheName: 'api-cache',
                                cacheableResponse: {
                                    statuses: [0, 200]
                                }
                            }
                        }
                    ]
                },
                kit: {
                    includeVersionFile: true, // 适配 SvelteKit 的特殊构建输出目录

                },
                manifest: {
                    name: 'mini-svelte5',
                    short_name: 'mini-svelte5',
                    description: 'mini-svelte5',
                    theme_color: '#ffffff',
                    background_color: '#ffffff',
                    display: 'standalone',
                    orientation: 'portrait',
                    scope: '/',
                    start_url: '/',
                    icons: [
                        {
                            src: 'pwa-192x192.png',
                            sizes: '192x192',
                            type: 'image/png'
                        },
                        {
                            src: 'pwa-512x512.png',
                            sizes: '512x512',
                            type: 'image/png'
                        }
                    ]
                },
            }
        ),
    ],
    server: {
        https: {},
        port: 23001,
        host: true,
    },
    preview: {
        port: 33001,
        host: true
    },
});
