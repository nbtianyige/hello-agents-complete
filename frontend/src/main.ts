import { createApp } from 'vue'
import Antd from 'ant-design-vue'
// import 'ant-design-vue/dist/reset.css' // Commented out to avoid TS build errors
import App from './App.vue'
import Home from './views/Home.vue'
import Result from './views/Result.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/result',
      name: 'Result',
      component: Result
    }
  ]
})

const app = createApp(App)

app.use(router)
app.use(Antd)

app.mount('#app')
