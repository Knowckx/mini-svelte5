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
                registerType: 'prompt', // prompt 模式：有新内容时触发事件，允许我们在 UI 上弹窗提示用户手动更新
                includeAssets: ['pwa-512x512.png'],
                workbox: {
                    // 要缓存的资源 | 只匹配 client 目录，不匹配 prerendered 目录（项目未使用预渲染）
                    globPatterns: ['client/**/*.{js,css,html,ico,png,svg,webp}'],
                    navigateFallback: null,
                    // 自动清理过期缓存。新版本部署后，自动删除旧版本的缓存
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
                                },
                                // 允许缓存 200 响应
                                cacheableResponse: {
                                    statuses: [0, 200]
                                }
                            }
                        },
                    ]
                },
                kit: {
                    includeVersionFile: true // 将 SvelteKit 生成的 _app/version.json 加入 precache，用于版本检测。
                },
                manifest: {
                    name: 'mini-svelte5',
                    short_name: 'mini-svelte5',
                    description: 'mini-svelte5',
                    display: 'standalone', // 显示模式（无浏览器 UI，像原生 App）
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
