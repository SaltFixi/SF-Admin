<template>
  <div class="s-tip" :style="{ 'border-left-color': color, 'color': color }">
    <strong><slot></slot></strong>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: 'mediumpurple'
    }
  }
}
</script>

<style scoped lang="less">
.s-tip {
  border-left: 8px solid;
  margin: 8px 0;
  background-color: rgba(246, 241, 241, 0.8);
  padding-left: 8px;
  height: 35px;
  line-height: 35px;
  color: mediumpurple;
}
</style>
