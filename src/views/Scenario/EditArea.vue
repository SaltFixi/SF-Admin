<template>
  <a-card title="基本信息" style="width: 350px">
    <template #extra>
      <template v-if="isEdit">
        <div class="flex">
          <s-btn style="margin-right: 8px" @click="save"><a-icon type="save" />保存</s-btn>
          <s-btn type="danger" @click="cancel">取消</s-btn>
        </div>
      </template>
      <a href="javascript:;" v-else @click="changestate">
        <a-icon type="edit" />
      </a>
    </template>
    <a-form-model :model="info" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
      <a-form-item label="昵称">
        <a-input v-if="isEdit" v-model="info.nickname" />
        <div v-else>{{ info.nickname }}</div>
      </a-form-item>
      <a-form-item label="年龄">
        <a-input v-if="isEdit" v-model="info.age" />
        <div v-else>{{ info.age }}</div>
      </a-form-item>
      <a-form-item label="签名">
        <a-textarea v-if="isEdit" v-model="info.sign" :auto-size="{ maxRows: 4 }"/>
        <div v-else>{{ info.sign }}</div>
      </a-form-item>
    </a-form-model>
  </a-card>
</template>

<script>
export default {
  data() {
    return {
      info: { nickname: '张三', age: 18, sign: 'Hello World' },
      bak: {},
      isEdit: false
    }
  },
  methods: {
    changestate() {
      this.bak = JSON.parse(JSON.stringify(this.info))
      this.isEdit = true
    },
    save() {
      this.$ms()
      this.isEdit = false
    },
    cancel() {
      this.info = this.bak
      this.isEdit = false
    }
  }
}
</script>

<style lang="less" scoped>
</style>
