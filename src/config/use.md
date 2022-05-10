## 用户

有两个用户
```js
admin用户:
账号: admin   密码: 123

emp用户:
账号: xx      密码: 456
```

## 路由配置

以goods为例

```js
{
    path: '/goods',
    meta: {
        title: '商品类',    // title 自定义侧边栏标题
        icon: 'account-book',   // icon 自定义侧边栏图标
        sort: 3,        // sort 路由排序
        role: 'emp'     // 权限分两种 admin、emp
    },
    component: SubView, // 二级菜单均使用 SubView 组件
    children: [
        {
            path: '/goods/list',
            component: () => import('@/views/Goods/GoodsList.vue'),
            meta: {
                title: '商品查询',
                icon: 'search'
            }
        },
        {
            path: '/goods/add',
            component: () => import('@/views/Goods/GoodsAdd.vue'),
            meta: {
                // hide: true,        // hide 隐藏界面
                // key: '/goods/list',    // key 用于高亮显示一般配合hide使用
                title: '商品添加',
                icon: 'shopping'
            }
        }
    ]
}
```
---

key不配置的话默认path是key值，将key配置成/goods/list，
就是说从/goods/list在跳转到/goods/add界面，侧边栏路由的高亮显示还是/goods/list

我们将children下注释的hide、和key取消注释
在`商品查询界面`点击按钮`新增数据`会发现跳转到了`/goods/list`，
侧边栏高亮显示还是它本身

----

无接口，所有数据都是在本地mock文件夹模拟的有需要可自行查看学习,列表数据添加删除搜索等等功能

内部模拟跨域，登录权限等等功能

**内部有许多小功能如：**

### 首屏过度Login

![image-20220510192533098](https://raw.githubusercontent.com/Saltedfixi/blog/main/img202205101926434.png)

### 分离chunk文件

![image-20220510192818840](https://raw.githubusercontent.com/Saltedfixi/blog/main/img202205101928429.png)


### 前端工程自动化

router/asyncRoutes.js与plugin/component.js均采用了前端工程自动化

`asyncRoutes.js`
```js
/**
 * 从同级的modules中自动导入所有js文件，并且将里面的对象注册成路由
 */
const context = require.context('./modules', true, /\.js$/)

const asyncRoutes = []
context.keys().forEach((filePath) => {
  asyncRoutes.push(...context(filePath).default)
})

```

使用mixin减少代码,如：

`plugin/mixin.js`
```js
$ms(type = 'success', message = '操作成功', description = '') {
    this.$notification[type]({
        message,
        duration: 2,
        description
    })
},
```
调用时直接`this.$ms()`就可以了
也可以添加参数`this.$ms('error', '操作失败')`
结合ant design vue使用


商品查询页面
导出pdf，打印excel，搜索商品功能

等等诸多功能自行查找
