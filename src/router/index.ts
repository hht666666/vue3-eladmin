import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { getToken } from '../utils/auth'
import { getMenu } from '@/api/api'

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

// 主入口路由
export const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/dashboard', // 重定向:重新指向其它path,会改变网址
    component: HomeView,
    children: [...homeRoutes]
  }
]
// console.log(routes)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...globalRoutes, ...routes]
})

const addRouters = <any>[]
//登录鉴权
router.beforeEach((to, from, next) => {
  if (getToken()) {
    //动态添加路由
    if (addRouters.length == 0) {
      getMenu().then((res: any) => {
        res.forEach((item: any) => {
          // 动态添加路由
          item.children.forEach((ele: any) => {
            router.addRoute('home', {
              path: '/' + ele.path,
              name: ele.name,
              meta: ele.meta,
              component: () => import('../views/' + ele.component + '.vue')
            })
          })
          // 动态添加路由,并保存到sessionStorage中
          addRouters.push(item)
          sessionStorage.setItem('addRouters', JSON.stringify(addRouters))
        })
        console.log(addRouters, 'addRoutersaddRoutersaddRouters')
      })
    }
    next()
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  }
})
console.log(router, 'routerrouterrouterrouterrouter')

export default router
