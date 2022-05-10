import Mock from 'mockjs'
import '@/mock/login'
import '@/mock/user'
import '@/mock/goods'
import '@/mock/chart'

console.log('%c mock 环境启动成功', 'color: #38f;font-weight: bold')
// 设置全局延时
Mock.setup({
  timeout: '200-400'
})
