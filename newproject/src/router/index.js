import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/HomeView.vue'
import Login from '@/views/Login.vue'
import { authenticated } from '@/util'

const checkAuth = async (to, from, next) => {
  try {
    if (await authenticated()) next()
    else next({
      path: '/login',
      replace: true
    })
  } catch (error) {
    console.error(error.message)
    next({
      path: '/login',
      replace: true
    })
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: checkAuth,
    props: true
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router