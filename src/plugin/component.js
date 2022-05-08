/**
 * 从同级的components中自动导入所有vue文件，并且将里面的对象注册成全局组件
 */
import kebabCase from 'lodash/kebabCase'
export default (Vue) => {
  // 可以通过本方法导入文件夹中的文件
  // 文件夹路径，是否包含子目录，正则过滤
  const context = require.context('./components', true, /\.vue$/)
  // 遍历出每个组件的路径
  context.keys().forEach((filePath) => {
    // 截取路径作为组件名
    let comName = filePath.replace(/\.\/(.*)\.vue/, '$1')
    // 处理子目录中的组件名, aaa/bbb/ccc => 得到ccc
    if (comName.includes('/')) {
      const arr = comName.split('/')
      comName = arr[arr.length - 1]
    }
    // 组件挂载
    Vue.component('s-' + kebabCase(comName), context(filePath).default)
  })
}
