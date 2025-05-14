import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import vercel from 'vite-plugin-vercel';

export default defineConfig({
    plugins: [react(), tailwindcss(), vercel()],
    server: {
        port: 3000,
    },
});
