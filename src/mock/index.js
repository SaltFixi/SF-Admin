import Mock from 'mockjs'
import '@/mock/user/login'
import '@/mock/user/user'
import '@/mock/goods/index'
import '@/mock/chart/index'

console.log('%c mock 环境启动成功', 'color: #38f;font-weight: bold')
// 设置全局延时
Mock.setup({
  timeout: '200-400'
})
