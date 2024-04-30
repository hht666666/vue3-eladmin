// import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
const app = createApp(App)

//引入ElementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
app.use(ElementPlus)
//引入图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

//写入svg-icon模板
import svgIcon from './icons/indexView.vue'
app.component('svg-icon', svgIcon)

app.use(createPinia())
app.use(router)
app.mount('#app')
