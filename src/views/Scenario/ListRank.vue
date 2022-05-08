<template>
  <div>
    <s-tip> <a-icon type="column-height" /> 点击排序 </s-tip>
    <ul>
      <a-list item-layout="horizontal" :data-source="list">
        <a-list-item slot="renderItem" slot-scope="item, i">
          <transition-group name="list">
            <div :key="item.id">
              <a-list-item-meta description="高木同学天下第一">
                <a slot="title">{{ item.title }}</a>
                <a-avatar slot="avatar" style="backgroundColor: mediumturquoise" icon="user" />
              </a-list-item-meta>
            </div>
          </transition-group>
          <div>
            <template v-if="i > 0">
              <a @click="moveUp(i)"><a-icon type="arrow-up" />上移</a>
              <a-divider type="vertical" />
            </template>
            <template v-if="i < list.length - 1">
              <a @click="moveDown(i)"><a-icon type="arrow-down" />下移 </a>
              <a-divider type="vertical" />
            </template>
            <a @click="list.splice(i, 1)"> <a-icon type="delete" />删除 </a>
          </div>
        </a-list-item>
      </a-list>
    </ul>

    <s-tip color="hotpink"> <a-icon type="sliders" /> 拖动排序 </s-tip>
    <a-row type="flex" justify="space-around">
      <a-col :span="6">
        <Draggable :group="group1" title="分组一" />
      </a-col>
      <a-col :span="6">
        <Draggable :group="group2" title="分组二" />
      </a-col>
    </a-row>
  </div>
</template>

<script>
import Draggable from '@/components/Draggable/index.vue'
const group1 = ['海绵宝宝', '章鱼哥', '蟹老板', '派大星']
const group2 = ['伞兵一号', '伞兵二号', '伞兵三号', '伞兵四号']
export default {
  components: {
    Draggable
  },
  data() {
    return {
      list: [],
      id: '',
      group1,
      group2
    }
  },

  created() {
    this.list = Array.from({ length: 4 }).map((r, i) => ({
      id: i + 1,
      title: '高木-' + (i + 1)
    }))
  },

  methods: {
    moveUp(i) {
      const prev = this.list[i - 1]
      // 通过索引把自身的元素赋值给上一个元素
      this.$set(this.list, i - 1, this.list[i])
      // 通过索引把上一个元素赋值给自身
      this.$set(this.list, i, prev)
    },
    moveDown(i) {
      const next = this.list[i + 1]
      this.$set(this.list, i + 1, this.list[i])
      this.$set(this.list, i, next)
    },
    del(i) {
      this.list.splice(i, 1)
    }
  }
}
</script>

<style lang="less" scoped>
.list-enter-active {
  transition: all 1s;
}

.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
