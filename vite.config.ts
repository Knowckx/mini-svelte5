import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import mkcert from 'vite-plugin-mkcert';
import { VitePWA } from 'vite-plugin-pwa';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
    plugins: [
        svelte(),
        tailwindcss(),
        mkcert(),
        VitePWA({
            registerType: 'prompt',
            includeAssets: ['pwa-512x512.png'],
            manifest: {
                name: 'mini-svelte5',
                short_name: 'mini-svelte5',
                description: 'mini-svelte5',
                display: 'standalone',
                start_url: '/',
                scope: '/',
                theme_color: '#ffffff',
                background_color: '#ffffff',
                icons: [
                    {
                        src: 'pwa-512x512.png',
                        sizes: '192x192',
                        type: 'image/png'
                    },
                    {
                        src: 'pwa-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'any maskable'
                    }
                ],
                screenshots: [
                    {
                        src: 'placeholder-1024.png',
                        sizes: '1024x1024',
                        type: 'image/png',
                        form_factor: 'wide'
                    },
                    {
                        src: 'placeholder-1024.png',
                        sizes: '1024x1024',
                        type: 'image/png'
                    }
                ]
            },
            workbox: {
                navigateFallback: '/index.html',
                cleanupOutdatedCaches: true
            }
        }),
    ],
    resolve: {
        alias: {
            $lib: fileURLToPath(new URL('./src/lib', import.meta.url))
        }
    },
    // ✅ 必须 - 禁用客户端预构建本地包的缓存
    optimizeDeps: {
        exclude: ['infa-s5']
    },
    // ✅ 必须 - 处理 SSR 时的本地包
    ssr: {
        noExternal: ['infa-s5']
    },
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
