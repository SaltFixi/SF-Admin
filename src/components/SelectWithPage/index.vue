<template>
  <div>
    <a-popover v-model="visible" placement="bottomLeft" trigger="click">
        <template slot="content">
          <p @click="setVal(item)" class="content" v-for="item in data" :key="item.id">{{item.text}}</p>
          <a-pagination class="flex j-c" size="small" @change="changePageindex" :total="total" :page-size="pageSize" />
        </template>
        <div class="s-select">
          <div>{{ currentVal ?  currentVal : '请选择'}}</div>
          <a-icon type="down" class="select-icon" :class="{ up: visible }"/>
        </div>
      </a-popover>
  </div>
</template>

<script>
/**
 * 使用该组件，该组件 action-url 接受的参数是 post 请求路径
 * 接口需要接受pageIndex 和 pageSize 参数，并返回
 * {
 *  data: { list: [], total: 50 }，这样的格式
 * }
 * replace-fields: 允许自定义修改接口里面接受的 id , text
 * v-model 可以直接拿到 text 的值
 * change 事件，回调参数 row: {id , text}
 * pageSize 允许修改每页条数，默认为8条
 */
export default {
  props: {
    value: {
      type: [Number, String],
      default: 1
    },
    actionUrl: {
      type: [Number, String],
      require: true
    },
    replaceFields: {
      type: Object,
      default() {
        return {
          id: 'id',
          text: 'text'
        }
      }
    },
    pageSize: {
      type: Number,
      default: 8
    }
  },

  data() {
    return {
      visible: true,
      currentVal: '',
      data: [],
      current: 1,
      total: 0
    }
  },

  mounted() {

  },

  methods: {
    setVal(item) {
      this.currentVal = item.text
      this.$emit('change', { ...item })
      this.$emit('input', item.text)
      this.visible = false
    },
    async getList() {
      const { data: { list, total } } = await this.$post(this.actionUrl, {
        pageindex: this.current,
        pagesize: this.pageSize
      })

      // 将接口中的字段改成组件中所需要的字段
      const lists = list.map((r) => {
        const { id, text } = this.replaceFields
        return {
          id: r[id],
          text: r[text]
        }
      })

      this.data = lists
      this.total = total
    },
    changePageindex(pageindex) {
      this.current = pageindex
      this.getList()
    }
  },
  created() {
    this.currentVal = this.data.find(r => r.id === this.value)
    this.getList()
  }
}
</script>

<style lang="less" scoped>
.s-select {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 250px;
  height: 30px;
  border: 1px solid #bcbcbc;
  padding: 10px;
  color: rgba(0, 0, 0, 0.5);
  font-size: 13px;
  border-radius: 3px;
  user-select: none;
  cursor: pointer;
  &:active {
    box-shadow: 0 1px 8px skyblue;
    border-color: skyblue;
  }

  .select-icon {
    transition: 0.2s;
    &.up {
      transform: rotate(180deg);
    }
  }
}

.content {
  width: 210px;
  height: 25px;
  line-height: 25px;
  font-size: 13px;
  cursor: pointer;
  text-indent: 6px;
  &:hover {
    background-color: mediumturquoise;
    color: #fff;
  }
}

</style>
