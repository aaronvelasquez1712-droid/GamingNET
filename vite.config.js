import { defineConfig } from 'vite';

export default defineConfig({
  // Base path for GitHub Pages sub‑directory
  base: '/GamingNET/',
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        project: './project.html'
      }
    }
  }
});
