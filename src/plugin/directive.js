/**
 * 自定义指令注册中心，如果需要新增全局指令，只需按下面格式添加即可
 */
const directives = {
  drtRed: (el) => {
    el.style.color = 'red'
  }
}
export default (Vue) => {
  Object.keys(directives).forEach((key) => {
    Vue.directive(key, directives[key])
  })
}
