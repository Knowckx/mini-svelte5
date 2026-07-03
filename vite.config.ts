import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import mkcert from 'vite-plugin-mkcert';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
    plugins: [
        svelte(),
        tailwindcss(),
        mkcert(),
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
