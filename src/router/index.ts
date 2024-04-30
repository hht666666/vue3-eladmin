import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      redirect: '/echarts',
      children: [
        {
          path: '/echarts',
          name: 'echarts',
          component: () => import('../views/home/EchArts.vue')
        },
        {
          path: '/usermanage',
          name: 'usermanage',
          component: () => import('../views/SystemManage/UserManage.vue')
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/LoginView.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    next()
  } else {
    if (localStorage.getItem('token')) {
      next()
    } else {
      next('/login')
    }
  }
})
export default router
