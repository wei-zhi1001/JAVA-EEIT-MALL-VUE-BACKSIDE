import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import { BootstrapVue } from 'bootstrap-vue'



import App from './App.vue'
import router from './router'
import axios from 'axios'


const API_URL = 'http://localhost:8080/mall';

axios.defaults.withCredentials = true

const app = createApp(App)

app.use(createPinia())
app.use(router)
// app.use(BootstrapVue)

app.config.globalProperties.API_URL = 'http://localhost:8080/mall';

//刷新頁面時如果我的SessionStrage有登入資訊，則還原我的pinia

app.mount('#app')
