import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/sachin-portfolio-3d/',
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2020',
  },
})
