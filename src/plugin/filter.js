// 需要导入dayjs
import dayjs from 'dayjs'

/**
 * 过滤器注册中心，如果需要新增全局过滤器，只需按下面格式添加即可
 */
const filters = {
  // 时间格式化
  ftmTime: (value, format = 'YYYY年MM月DD日 HH:mm:ss') => dayjs(value).format(format),
  // 性别
  ftmGender: (value) => ['男', '女'][value] || '未知',
  // 金钱
  ftmMoney: (money) => {
    if (money !== undefined) {
      const arr = money.toString().split('.')
      return (
        (arr[0] || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') +
        (arr[1] ? '.' + arr[1] : '')
      )
    } else {
      return money
    }
  }
}

export default (Vue) => {
  Object.keys(filters).forEach((key) => {
    Vue.filter(key, filters[key])
  })
}
