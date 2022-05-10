import mixin from './mixin'
import filter from './filter'
import directive from './directive'
import component from './component'

// 定义插件
const plugin = {
  install(Vue, { silent } = {}) {
    const oldLog = console.log
    // 重写console.log方法，用于调试时打印，不需要时，可以通过silent一键关闭所有打印
    console.log = (...str) => {
      // 在函数定义时的参数中代表省略参数
      if (!silent) oldLog(...str)
    }

    mixin(Vue)
    filter(Vue)
    directive(Vue)
    component(Vue)

    console.log(`%c
     _   _  _   ___  __   _  __  _      _
    (_  /_\\ |    |  |__  | \\ |_  |  \\/  |
     _) | | |__  |  |__  |_/ |   |  /\\  | 
     ~  ~ ~ ~~~  ~  ~~~   ~   ~  ~ ~  ~ ~ @SF
     `, 'color: mediumpurple;font-size: 14px;font-weight: bold;')
  }
}

export default plugin
