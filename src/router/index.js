import VueRouter from 'vue-router'
import Vue from 'vue'
import routes from './constantRoutes'
import Nprogress from 'nprogress'
import { getToken } from '@/plugin/until/auth'

Vue.use(VueRouter)

const router = new VueRouter({
  routes
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

// 路由跳转前一定会走这里
router.beforeEach(async(to, from, next) => {
  if (to.meta.title) { document.title = 'SF-Admin | ' + to.meta.title }
  // Nprogress.start()
  const auth = getToken()
  if (auth) {
    // 已登录的话，不能再去登录页
    if (to.path === '/login') {
      return next('/')
    } else {
      next()
    }
  } else {
    // 没登陆的话，不在登录页强制跳转登录页
    if (to.path === '/login') {
      next()
    } else {
      return next('/login')
    }
  }
})

// 路由跳转后一定会走这里
router.afterEach((to, form) => {
  Nprogress.done()
})

export default router
