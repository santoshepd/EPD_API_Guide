import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: "/EPD_API_Guide/",
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
