import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {fileURLToPath} from "url"

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {//simdilik kullanmadik
      '/api'    : 'http://webback:3305', 
      '/site'   : 'http://webback:3305',
      '/user'   : 'http://webback:3305',
      '/payment': 'http://webback:3305',
      '/u'      : 'http://webback:3305',
    }},
  resolve:{
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
},
  plugins: [react()]
})
