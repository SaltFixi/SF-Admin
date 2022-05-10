# 基于Vue和Ant-design-vue开发
## 安装

``` bash
# 安装依赖
npm install

# 开启本地服务运行项目
npm run dev
#OR
yarn dev
```

## 目录结构

```bash
.src
|-- App.vue   # 应用入口组件
|-- main.js   # 应用入口js
|-- api       # 暂时没用到
|-- assets    # 资源模块
|-- components
|   |-- Draggable   # 拖动组件
|   |-- Layout      # 布局组件
|   |   |-- Bread.vue       # 面包屑
|   |   |-- Logout.vue      # 退出登录
|   |   |-- SiderBar.vue    # 侧边栏
|   |-- SelectWithPage  #带分页的下拉组件
|-- config  # 环境配置
|-- mock    # mock模拟数据
|-- plugin  # 插件
|   |-- component.js    # 对components的处理
|   |-- directive.js    # 注册全局指令
|   |-- filter.js       # 注册全局过滤器
|   |-- index.js        # 注册全局指令
|   |-- mixin.js        # 注册全局混入
|   |-- components      # 注册全局组件
|   |-- until       # 工具类
|       |-- auth.js             # 登录认证
|       |-- Export2Excel.js     # 导出excel
|       |-- request.js          # 处理请求
|-- router      # 路由配置
|-- store       # vuex 状态管理
|-- views
    |-- 404.vue         # 404界面
    |-- Layout.vue      # 布局界面
    |-- subView.vue     # 子路由显示的界面
    |-- Echart          # 图表界面
    |   |-- Echart.vue  
    |   |-- setOption.js    # echart参数配置
    |-- Goods           # 商品界面
    |-- Login           # 登录界面
    |-- Map             # 地图界面
    |-- Scenario        # 综合场景界面
    |-- User            # 用户界面
    |-- Widget          # 小组件界面
```

[使用文档](./src/config/use.md)


## 部分截图

![image-20220510190620129](https://raw.githubusercontent.com/Saltedfixi/blog/main/img202205101907638.png)

![image-20220510183321762](https://raw.githubusercontent.com/Saltedfixi/blog/main/img202205101833307.png)

![image-20220510190939786](https://raw.githubusercontent.com/Saltedfixi/blog/main/img202205101911395.png)

![image-20220510190024628](https://raw.githubusercontent.com/Saltedfixi/blog/main/img202205101900039.png)

