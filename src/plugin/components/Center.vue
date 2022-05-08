<template>
  <div>
    <div class="center"><slot></slot></div>
  </div>
</template>

<script>
export default {
  name: 's-center'
}
</script>

<style lang="less" scoped>
.center {
  display: flex;
  align-items: center;
  justify-content: center;
  color: deeppink;
}
</style>
