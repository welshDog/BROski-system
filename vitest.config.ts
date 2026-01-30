import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components')
    }
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['tests/setup.ts'],
    globals: true,
    pool: 'threads',
    include: ['tests/**/*.{test,spec}.{ts,tsx,js,jsx}'],
    exclude: [
      'node_modules/**',
      'tests/rules.test.*',
      'tests/integration/approvalWorkflow.emu.test.*'
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'html'],
      include: [
        'src/utils/**/*.{ts,js}',
        'src/stores/perfStore.{ts,js}',
        'src/perf/observer.{ts,js}',
        'src/components/UI/CoinCounter.{ts,js}',
        'src/services/notificationService.{ts,js}'
      ],
      exclude: [
        'src/components/3D/**',
        '**/*.stories.*',
        '**/*.test.*'
      ],
      thresholds: {
        lines: 90,
        statements: 90,
        branches: 80,
        functions: 90
      }
    }
  }
});
