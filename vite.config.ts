import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import { createSvg } from './src/icons/index'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// 自动导入vue中hook reactive ref等
import AutoImport from 'unplugin-auto-import/vite'
//自动导入ui-组件 比如说ant-design-vue  element-plus等
import Components from 'unplugin-vue-components/vite'
//访问本地环境变量插件
import { loadEnv } from 'vite'
const env = loadEnv(process.env.NODE_ENV as string, process.cwd())
console.log(env)

export default defineConfig({
  // 打包
  build: {
    // 打包后文件名
    // outDir: 'dists',
    // assets打包后文件名
    // assetsDir: 'assetsss',
  },
  server: {
    //如果多台电脑处在同一个局域网下，配置0.0.0.0后，别的电脑就可以通过ip://端口号 访问到当前项目
    host: '0.0.0.0',
    // 端口号
    port: 3000,
    // 自动打开浏览器
    open: true,
    proxy: {
      /**代理标识 */
      [env.VITE_APP_BASE_API]: {
        /**代理路径 */
        target: env.VITE_APP_BASE_URL,
        /**是否开启跨域地理 */
        changeOrigin: true,
        /**路径重写 */
        // rewrite: (path) => path.replace(/^\/env.VITE_APP_BASE_API/, ''),
        rewrite: (path) => path.replace(new RegExp('^' + env.VITE_APP_BASE_API), '')
      }
    }
  },
  plugins: [
    vue(),
    vueJsx(),
    createSvg('./src/icons/svg/'),
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
