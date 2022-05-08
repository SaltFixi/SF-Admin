import Vuex from 'vuex'
import Vue from 'vue'
import createPersistedState from 'vuex-persistedstate'
import account from './modules/account'

Vue.use(Vuex)

const dataState = createPersistedState({
  // 存储方式：localStorage、sessionStorage、cookies
  storage: window.sessionStorage,
  key: 'store',
  render(state) {
    return { ...state }
  }
  // paths: ['openKeys']
})

const store = new Vuex.Store({
  modules: { account },
  /* vuex数据持久化配置 */
  plugins: [dataState]
})

export default store
