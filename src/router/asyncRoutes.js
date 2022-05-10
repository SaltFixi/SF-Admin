/**
 * 从同级的modules中自动导入所有js文件，并且将里面的对象注册成路由
 */
const context = require.context('./modules', true, /\.js$/)

const asyncRoutes = []
context.keys().forEach((filePath) => {
  asyncRoutes.push(...context(filePath).default)
})

// 处理路由的key，如果meta下没有key就将path赋给meta.key
// key用来当当前路由的高亮显示
function routesKey(route) {
  return route.map((r) => {
    if (!r.meta) r.meta = {}
    if (r.meta && !r.meta.key) {
      r.meta.key = r.path
      if (r.children && r.children.length > 0) {
        routesKey(r.children)
      }
    }
    return r
  })
}

routesKey(asyncRoutes)

export default asyncRoutes
