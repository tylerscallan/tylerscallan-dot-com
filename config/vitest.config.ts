import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

const rootDir = path.resolve(__dirname, '..')

export default defineConfig({
  plugins: [react()],
  root: rootDir,
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/unit/setup.ts'],
    include: ['tests/unit/**/*.test.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'tests/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/types/',
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(rootDir, './src'),
    },
  },
})
