import tsconfigPaths from 'vite-tsconfig-paths'; // para resolver o alias "@/"
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['./vitest.setup.ts']
  }
});
