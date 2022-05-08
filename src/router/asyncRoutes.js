/**
 * 从同级的modules中自动导入所有js文件，并且将里面的对象注册成路由
 */
const context = require.context('./modules', true, /\.js$/)

const asyncRoutes = []
context.keys().forEach((filePath) => {
  asyncRoutes.push(...context(filePath).default)
})

function isChildren(obj, children) {
  if (Object.values(obj).includes(children)) {
    obj.children.forEach((item) => {
      item.meta.key = item.path
      isChildren(obj.children, children)
    })
  } else {
    return false
  }
}

asyncRoutes.forEach((r) => {
  if (!r.meta) r.meta = {}
  // 没有设置key的默认path为keyc
  if (!r.meta.key) {
    r.meta.key = r.path
    isChildren(r, r.children)
  }
})

export default asyncRoutes
