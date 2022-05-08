<template>
  <div class="wrapper">
    <h3 class="title" v-if="title">{{ title }}</h3>
    <draggable>
      <div v-for="(item, index) in group" :key="index">
        <a-card type="inner" class="drag-item">
          {{ item }}
        </a-card>
      </div>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  props: {
    title: {
      type: String
    },
    group: {
      type: Array,
      require: true
    }
  },
  components: {
    draggable
  }
}
</script>

<style lang="less" scoped>
.wrapper {
  min-width: 200px;
  margin: 10px;
  .title {
    display: inline-block;
    width: 100%;
    text-align: center;
    height: 45px;
    line-height: 45px;
    border-radius: 3px;
    color: #fff;
    background-color: hotpink;
  }

  .drag-item {
    text-align: center;
    margin: 10px 0;
    cursor: pointer;
    box-shadow: 0 1px 1px #eee;
    &:hover {
      border: 2px dashed skyblue;
    }
  }
}
</style>
