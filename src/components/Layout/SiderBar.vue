<template>
  <div>
    <div class="logo">
      <i class="iconfont icon-fish"><span v-show="!collapsed">SF-Admin</span></i>
    </div>
    <a-menu :theme="theme" mode="inline" :selected-keys="[currentPath]" :default-open-keys="openKeys">
      <a-menu-item v-for="menu in noChidrenMenus" :key="menu.meta.key">
        <router-link :to="menu.path">
          <a-icon :type="menu.meta.icon" />
          <span>{{ menu.meta.title }}</span>
        </router-link>
      </a-menu-item>

      <a-sub-menu v-for="item in hasChidrenMenus" :key="item.meta.key">
        <span slot="title"><a-icon :type="item.meta.icon" /><span>{{ item.meta.title }}</span></span>
        <a-menu-item v-for="menu in item.children" :key="menu.meta.key">
          <router-link :to="menu.path">
            <a-icon :type="menu.meta.icon" />
            <span>{{ menu.meta.title }}</span>
          </router-link>
        </a-menu-item>
      </a-sub-menu>
    </a-menu>

  </div>
</template>

<script>

export default {
  props: ['collapsed', 'theme'],

  computed: {
    noChidrenMenus() {
      return this.menuRoutes().filter(r => !r.children)
    },
    hasChidrenMenus() {
      return this.menuRoutes().filter(r => r.children)
    },
    currentPath() {
      return this.$route.meta.key
    },
    openKeys() {
      let str = ''
      str = '/' + this.$route.meta.key.split('/').splice(1, 1).join('')
      return [str]
    }

  },
  methods: {
    menuRoutes() {
      // 找到路由数组
      const routes = this.$router.options.routes
      // 找到 Layout 的子路由
      const menuRoutes = routes.find(r => r.name === 'Layout').children
      // 这里有点bug暂未修改
      // this.$store.dispatch('account/generateRoutes', menuRoutes)
      // const menus = this.$store.state.account.menus
      return menuRoutes
    }
  }

}
</script>

<style lang="less" scoped>
.logo {
  margin: 16px;
  text-align: center;
  color: mediumturquoise;
}

</style>
