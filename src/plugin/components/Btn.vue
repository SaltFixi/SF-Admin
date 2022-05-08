<template>
  <div>
    <button class="btn" @click="handleClick" :class="{ primary: type === 'primary', success: type === 'success', danger: type === 'danger' }">
      <slot></slot>
    </button>
  </div>
</template>

<script>
export default {
  name: 's-btn',
  props: {
    type: {
      type: String,
      // 默认为 primary
      default: 'primary',
      validator(value) {
        // 这个值必须匹配下列字符串中的一个
        return ['primary', 'success', 'danger'].includes(value)
      }
    }
  },

  methods: {
    handleClick(e) {
      this.$emit('click', e)
    }
  }
}
</script>

<style lang="less" scoped>
.btn {
  border: none;
  color: #fff;
  user-select: none;
  height: 32px;
  padding: 0 15px;
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap;
}

.primary {
  background-color: mediumpurple;
}

.success {
  background-color: hotpink;
}

.danger {
  background-color: orangered;
}
</style>
