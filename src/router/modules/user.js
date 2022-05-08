export default [
  {
    path: '/user',
    component: () => import('@/views/User/UserList.vue'),
    meta: {
      title: '用户列表',
      icon: 'user',
      sort: 1,
      role: 'admin'
    }
  }
]
