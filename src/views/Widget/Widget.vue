<template>
  <div>
    <a-page-header
      style="border: 1px solid rgb(235, 237, 240)"
      title="小组件"
      sub-title="这是个带分页的下拉组件"
      @back="() => null"
    />
    <SelectWithPage
      class="SelectWithPage"
      action-url="/getlist/select"
      :replace-fields="{
        id: 'id',
        text: 'name',
      }"
      :pageSize="10"
      v-model="text"
      @change="zzz"
    />
  </div>
</template>

<script>
import SelectWithPage from '@/components/SelectWithPage'
export default {
  components: {
    SelectWithPage
  },

  data() {
    return {
      text: 0
    }
  },

  methods: {
    zzz(row) {
      console.log(row)
    }
  }
}
</script>

<style lang="less" scoped>
.SelectWithPage {
  margin: 30px;
}
</style>
