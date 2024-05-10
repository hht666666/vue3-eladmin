import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { getToken } from '../utils/auth'

/**静态路由,第一种全局路由,不需要以侧边栏作为入口的路由 */
const globalRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/common/LoginView.vue')
  }
  // {
  //   path: '/404',
  //   name: '404'
  // },
  // {
  //   path: '/401',
  //   name: '401'
  // }
]

/**静态路由表, 第二种,需要以侧边栏作为入口的路由,首页 */
const homeRoutes = [
  {
    path: '/dashboard',
    name: 'dashboard',
    meta: {
      title: '首页'
    },
    component: () => import('../views/common/DashBoard.vue')
  }
]

/**动态路由表 */
const addRouters = [
  {
    path: '/user',
    name: 'user',
    meta: {
      title: '用户管理'
    },
    component: () => import('../views/system/user/UserView.vue')
  },
  {
    path: '/role',
    name: 'role',
    meta: {
      title: '角色管理'
    },
    component: () => import('../views/system/role/RoleView.vue')
  },
  {
    path: '/dept',
    name: 'dept',
    meta: {
      title: '角色管理'
    },
    component: () => import('../views/system/dept/DeptView.vue')
  }
]

/**将首页添加到动态路由表的第一个 */
addRouters.unshift(homeRoutes[0])

// 主入口路由
export const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/dashboard', // 重定向:重新指向其它path,会改变网址
    component: HomeView,
    children: [...addRouters]
  }
]
// console.log(routes)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...globalRoutes, ...routes]
})

//登录鉴权
router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    next()
  } else {
    if (getToken()) {
      next()
    } else {
      next('/login')
    }
  }
})
export default router
