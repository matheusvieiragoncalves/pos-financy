import { loadEnv } from 'vite';
import { defineConfig } from 'vitest/config';
const env = loadEnv('test', process.cwd(), '');

export default defineConfig({
  resolve: {
    tsconfigPaths: true
  },
  test: {
    env,
    globals: true,
    environment: 'node',
    setupFiles: ['./vitest.setup.ts'],
    projects: [
      {
        extends: true,
        test: {
          name: 'unit',
          include: ['src/**/*.test.ts'],
          exclude: ['src/**/*.integration.test.ts']
        }
      },
      {
        extends: true,
        test: {
          name: 'integration',
          include: ['src/**/*.integration.test.ts'],
          setupFiles: ['./src/test/setup-integration.ts'],
          fileParallelism: false
        }
      }
    ]
  }
});
