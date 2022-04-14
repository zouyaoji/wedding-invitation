/*
 * @Author: zouyaoji@https://github.com/zouyaoji
 * @Date: 2022-04-12 21:49:06
 * @LastEditTime: 2022-04-13 14:44:12
 * @LastEditors: zouyaoji
 * @Description:
 * @FilePath: \wedding-invitation\vite.config.ts
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
  }
})
