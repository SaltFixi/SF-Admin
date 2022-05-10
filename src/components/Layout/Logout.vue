<template>
  <div>
    <a-dropdown>
      <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
        <i class="iconfont">&#xed7a;</i> {{ nickName }} <a-icon type="down" />
      </a>
      <a-menu slot="overlay">
        <a-menu-item>
          <a href="javascript:;"><a-icon type="info-circle" style="margin-right: 5px" />修改密码</a>
        </a-menu-item>

        <a-menu-item>
          <a @click="logout"><a-icon type="logout" style="margin-right: 5px" />退出登录</a>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
  </div>
</template>

<script>
export default {
  computed: {
    nickName() {
      const { name } = this.$store.state.account.userInfo
      return name
    }
  },

  methods: {
    async logout() {
      await this.$mc('你确定退出吗？', '')
      this.$store.dispatch('account/logOut')
    }
  }

}
</script>

<style lang="less" scoped>
</style>
