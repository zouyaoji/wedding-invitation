/*
 * @Author: zouyaoji@https://github.com/zouyaoji
 * @Date: 2022-04-12 21:49:06
 * @LastEditTime: 2023-08-22 14:53:40
 * @LastEditors: zouyaoji 370681295@qq.com
 * @Description:
 * @FilePath: \wedding-invitation-me\vite.config.ts
 */
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni()],
  resolve: {
    alias: {
      '@src': resolve(__dirname, './src')
    }
  },
  define: {
    'process.env': {}
  }
})
