import { getToken, setToken, removeToken } from '@/plugin/until/auth'
import { $post } from '@/plugin/until/request'
import router from '@/router'
import store from '@/store'

function routesAuth(routes) {
  const { role } = store.state.account.userInfo
  if (role !== 'admin') { routes = routes.filter(r => r.meta.role !== role) }
  return routes
}

function routesHide (routes) {
  return routes.filter((r) => {
    if (r.children) {
      r.children = routesHide(r.children)
    }
    return !r.meta.hide
  })
}

function routesSort (routes) {
  routes.sort((a, b) => {
    return a.meta.sort - b.meta.sort
  })
}

export default ({
  namespaced: true,
  state: () => ({
    token: getToken(),
    userInfo: JSON.parse(localStorage.getItem('userInfo')) || '',
    menus: JSON.parse(localStorage.getItem('menus')) || []
  }),
  mutations: {
    SET_TOKEN(state, val) {
      state.token = val
    },
    SET_USERINFO(state, val) {
      localStorage.setItem('userInfo', JSON.stringify(val))
    },
    SET_MENUS(state, val) {
      localStorage.setItem('menus', JSON.stringify(val))
    },
    REMOVE_USERINFO(state) {
      localStorage.removeItem('userInfo')
      state.userInfo = ''
    },
    REMOVE_MENUS(state) {
      localStorage.removeItem('menus')
      state.menus = ''
    },
    LOG_OUT(state) {
      state.token = ''
      removeToken()
      router.push('/login')
    }
  },
  actions: {
    async login({ commit }, loginModel) {
      const { resultCode, data } = await $post('/sys-user/login', loginModel)
      const { token } = data
      if (resultCode) {
        setToken(token)
        commit('SET_TOKEN', token)
        commit('SET_USERINFO', data)
      }
      return resultCode
    },
    async logOut({ commit }) {
      commit('REMOVE_USERINFO')
      commit('REMOVE_MENUS')
      commit('LOG_OUT')
    },
    generateRoutes({ commit }, menus) {
      // 登录拿到路由权限
      menus = routesAuth(menus)
      // 过滤掉不需要在菜单栏显示的路由
      routesHide(menus)
      // 将路由排序
      routesSort(menus)
      commit('SET_MENUS', menus)
    }
  }
})
