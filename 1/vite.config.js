// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/my-portfolio123/1/dist', // ← 반드시 실제 배포 경로와 일치!
});