import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'

import Fastclick from "fastclick"
import lazyPlugin from 'vue3-lazy'
// 使用懒加载的插件
const app = createApp(App);
app.use(router).use(store).mount('#app')
app.use(lazyPlugin, {
  loading: require('./assets/img/lazyload/imgload.svg'), // 加载时默认图片
  error: require('./assets/img/lazyload/noimgload .svg')// 图片失败时默认图片
})
// 解决移动端300ms延迟
Fastclick.attach(document.body)
