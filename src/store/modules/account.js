import { getUser } from '@/api/user'
import Cookie from 'js-cookie'
import asyncRoutes from '@/router/asyncRoutes'

export default ({
  namespaced: true,
  state: () => ({
    userInfo: null,
    routes: []
  }),
  getters: {
    role(state) {
      return state.userInfo ? state.userInfo.role : null
    }
  },
  mutations: {
    SET_USER_INFO(state, user) {
      state.userInfo = user
    },
    SET_ROUTES(state, role) {
      let roleRoutes = asyncRoutes
      if (role !== 'admin') { roleRoutes = roleRoutes.filter(r => r.meta.role === role) }
      state.routes = roleRoutes
    }
  },
  actions: {
    async getUserInfo({ commit }) {
      const token = Cookie.get('token')
      const user = await getUser(token)
      commit('SET_USER_INFO', user)
      commit('SET_ROUTES', user.role)
    }
  }
})
