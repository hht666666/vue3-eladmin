import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// 自动导入vue中hook reactive ref等
import AutoImport from 'unplugin-auto-import/vite'
//自动导入ui-组件 比如说ant-design-vue  element-plus等
import Components from 'unplugin-vue-components/vite'

// console.log('********************',import.meta.env,'***************************');

// https://vitejs.dev/config/
export default defineConfig({
  // 打包
  build: {
    // 打包后文件名
    // outDir: 'dists',
    // assets打包后文件名
    // assetsDir: 'assetsss',
  },
  server: {
    //设置为0.0.0.0别人才能访问我的项目
    host: '0.0.0.0',
    // 端口号
    port: 3000,
    // 自动打开浏览器
    open: true,
    proxy: {
      '/api': {
        target: '',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      //安装两行后你会发现在组件中不用再导入ref，reactive等
      imports: ['vue', 'vue-router'],
      //存放的位置
      dts: 'src/auto-import.d.ts'
    }),
    Components({
      // 引入组件的,包括自定义组件
      // 存放的位置
      dts: 'src/components.d.ts'
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
