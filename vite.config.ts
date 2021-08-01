import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/main.ts'),
      name: 'xkFriend'
    },
    cssCodeSplit: false,
    target: 'modules'
  },
  plugins: [vue()]
})
