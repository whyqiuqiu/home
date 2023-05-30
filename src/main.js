import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import '../src/style/style.scss';

// 引入 pinia 
import {
    createPinia
} from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

const app = createApp(App);
const pinia = createPinia();
// pinia.use(piniaPluginPersistedstate);

app.use(createPinia().use(piniaPluginPersistedstate));
app.mount('#app')


// PWA
navigator.serviceWorker.addEventListener('controllerchange', () => {
    // 弹出更新提醒
    console.log("站点已更新，刷新后生效");
    ElMessage("站点已更新，刷新后生效");
})