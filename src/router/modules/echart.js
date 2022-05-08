import SubView from '@/views/subView.vue'
export default [
  {
    path: '/echart',
    component: () => import('@/views/Echart/Echart.vue'),
    meta: {
      title: '图表中心',
      icon: 'fund',
      sort: 2,
      role: 'admin'
    }
  },
  {
    path: '/map',
    component: SubView,
    meta: {
      title: '地图',
      icon: 'global',
      sort: 6
    },
    children: [
      {
        path: '/map/baiduMap',
        component: () => import('@/views/Map/Map.vue'),
        meta: {
          title: '百度地图',
          icon: 'heat-map'
        }
      }
    ]

  }
]
