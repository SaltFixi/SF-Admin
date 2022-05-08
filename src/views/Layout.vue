<template>
  <a-config-provider :locale="locale">
    <a-layout class="layout">
      <a-layout-sider v-show="hideSider" :trigger="null" v-model="collapsed" breakpoint="md" @breakpoint="onBreakpoint"
        :collapsed-width="collapsedWidth">
        <SiderBar :collapsed="collapsed" theme="dark" />
      </a-layout-sider>

       <a-affix v-show="hideSetting" :style="{ position: 'absolute', top: '35%', right: '17px', zIndex: 999 }">
        <div class="setting" @click="showDrawer">
          <a-icon type="unordered-list"></a-icon>
        </div>
      </a-affix>

      <a-drawer placement="right" :closable="false" :visible="visibleDrawer" @close="closeDrawer">
        <SiderBar :collapsed="collapsed" />
      </a-drawer>

      <a-layout>
        <a-layout-header class="layout-header">
          <div class="flex a-c">
            <a-icon class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'"
              @click="() => (collapsed = !collapsed)" />
            <Bread />
          </div>

          <Logout />
        </a-layout-header>

        <a-layout-content class="main-content">
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-config-provider>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import Bread from '@/components/Layout/Bread.vue'
import Logout from '@/components/Layout/Logout.vue'
import SiderBar from '@/components/Layout/SiderBar.vue'

export default {
  data () {
    return {
      locale: zhCN,
      collapsed: false,
      collapsedWidth: 80,
      visibleDrawer: false,
      hideSider: true,
      hideSetting: true
    }
  },

  components: {
    Bread,
    Logout,
    SiderBar
  },

  methods: {
    onBreakpoint (broken) {
      if (broken) {
        this.collapsedWidth = 0
        this.hideSider = false
        this.hideSetting = true
      } else {
        this.collapsedWidth = 80
        this.hideSider = true
        this.hideSetting = false
      }
    },
    closeDrawer () {
      this.visibleDrawer = false
    },
    showDrawer () {
      this.collapsed = false
      this.visibleDrawer = true
    }
  }
}
</script>

<style lang="less" scoped>
.layout {
  height: 100vh;
  overflow: hidden;

  .layout-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    padding: 15px;
  }

  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;

    &:hover {
      color: mediumturquoise;
    }
  }
}

.main-content {
  margin: 16px;
  height: 100vh;
  padding: 12px;
  overflow: scroll;
  overflow-x: hidden;
  background-color: #fff;
}

::v-deep .ant-drawer-body {
  padding: 0;
}

.setting {
  background-color: mediumturquoise;
  color: #fff;
  text-align: center;
  border-radius: 5px 0 0 5px;
  line-height: 40px;
  font-size: 22px;
  width: 40px;
  height: 40px;
  box-shadow: -2px 0 8px #ccc;
  cursor: pointer;
}
</style>
