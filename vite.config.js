import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Konfigurasi untuk FinTrack AI agar React & Tailwind jalan bareng
export default defineConfig({
  plugins: [react()],
  base: '/fintrack-ai/',
})