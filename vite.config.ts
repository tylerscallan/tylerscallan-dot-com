import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    postcss: {
      plugins: [
        tailwindcss({ config: './config/tailwind.config.js' }),
        autoprefixer(),
      ],
    },
  },
  base: '/',
  server: {
    port: 27100,
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-lightbox': ['yet-another-react-lightbox'],
          'vendor-icons': ['lucide-react'],
        },
      },
    },
  },
})
