import SubView from '@/views/subView.vue'
export default [
  {
    path: '/sxenario',
    meta: {
      title: '综合场景',
      icon: 'inbox',
      sort: 5,
      role: 'emp'
    },
    component: SubView,
    children: [
      {
        path: '/sxenario/editArea',
        component: () => import('@/views/Scenario/EditArea.vue'),
        meta: {
          title: '可编辑区域',
          icon: 'control'
        }
      },
      {
        path: '/sxenario/listRank',
        component: () => import('@/views/Scenario/ListRank.vue'),
        meta: {
          title: '列表排序',
          icon: 'ordered-list'
        }
      },
      {
        path: '/sxenario/reserve',
        component: () => import('@/views/Scenario/Reserve.vue'),
        meta: {
          title: '预约空位',
          icon: 'border-inner'
        }
      }
    ]
  }
]
