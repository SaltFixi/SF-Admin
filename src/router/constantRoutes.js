import asyncRoutes from './asyncRoutes'

const routes = [
  {
    path: '/',
    name: 'Layout',
    redirect: '/user',
    component: () => import('@/views/Layout.vue'),
    children: asyncRoutes
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login/login.vue')
  }
]

// 404界面要放在最后
routes.push({
  path: '*',
  component: () => import('@/views/404.vue')
})

export default routes
