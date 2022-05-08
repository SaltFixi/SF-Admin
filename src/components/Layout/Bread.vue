<template>
  <div>
    <a-breadcrumb>
      <a-breadcrumb-item>首页</a-breadcrumb-item>
      <a-breadcrumb-item>{{ currentTitle }}</a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>

<script>
export default {
  computed: {
    currentTitle() {
      return this.$route.meta.title
    }
  }
}
</script>

<style lang="less" scoped>

</style>
