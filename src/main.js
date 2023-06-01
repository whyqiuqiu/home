import { createApp } from 'vue'
import './style.css'

import '../src/style/style.scss';

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'


// 引入 pinia 
import {
    createPinia
} from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(ElementPlus)
app.use(
    // createPinia().use(piniaPluginPersistedstate),
    pinia
);
app.mount('#app')


// PWA
navigator.serviceWorker.addEventListener('controllerchange', () => {
    // 弹出更新提醒
    console.log("站点已更新，刷新后生效");
    ElMessage("站点已更新，刷新后生效");
})