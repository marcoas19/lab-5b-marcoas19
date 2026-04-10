import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/HomeView.vue'
import Login from '@/views/Login.vue'
import { authenticated } from '@/util'

const checkAuth = async (to, from, next) => {
  try {
    const ok = await authenticated()
    console.log('AUTH CHECK RESULT:', ok)

    if (ok) {
      next()
    } else {
      next('/login')
    }
  } catch (error) {
    console.error('ROUTER AUTH ERROR:', error)
    next('/login')
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: checkAuth
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