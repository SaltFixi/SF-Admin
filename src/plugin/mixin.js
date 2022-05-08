import { $get, $post } from './until/request'

export default (Vue) => {
  // 全局混入
  Vue.mixin({
    methods: {
      $get,
      $post,
      $ms(type = 'success', message = '操作成功', description = '') {
        this.$notification[type]({
          message,
          duration: 2,
          description
        })
      },
      $mc(title = '你确定删除此项吗？', content = '删除后将无法恢复，请谨慎操作。') {
        return new Promise((resolve) => {
          this.$confirm({
            title,
            content,
            onOk: () => {
              resolve()
            }
          })
        })
      },
      $valid(formRef) {
        return new Promise((resolve) => {
          this.$refs[formRef].validate(valid => {
            if (valid) resolve()
          })
        })
      }
    }
  })
}
