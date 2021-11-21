import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { visualizer } from 'rollup-plugin-visualizer'
import { resolve } from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/main.ts'),
      name: 'xkFriend'
    },
    cssCodeSplit: false,
    target: 'modules',
    terserOptions: {
      compress: {
        drop_console: true
      }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        charset: false,
        additionalData: `@import "@/styles/function.scss";`
      }
    }
  },
  plugins: [vue(), vueJsx(), visualizer({ template: 'sunburst' })],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src') // 设置 `@` 指向 `src` 目录
    }
  },

  server: {
    port: 5678
  }
})
