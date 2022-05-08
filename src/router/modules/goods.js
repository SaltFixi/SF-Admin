import SubView from '@/views/subView.vue'
export default [
  {
    path: '/goods',
    meta: {
      title: '商品类',
      icon: 'account-book',
      sort: 3,
      role: 'emp'
    },
    component: SubView,
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
          // hide: true,
          title: '商品添加',
          icon: 'shopping'
        }
      }
    ]
  },
  {
    path: '/widget',
    component: () => import('@/views/Widget/Widget.vue'),
    meta: {
      title: '小组件',
      icon: 'appstore-o',
      sort: 4,
      role: 'emp'
    }
  }
]
