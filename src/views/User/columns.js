const columns = [
  {
    dataIndex: 'name',
    key: 'name',
    scopedSlots: { customRender: 'name' },
    title: '名称'
  },
  {
    title: '年龄',
    dataIndex: 'price',
    key: 'price',
    scopedSlots: { customRender: 'price' }
  },
  {
    title: '描述',
    dataIndex: 'src',
    key: 'src',
    ellipsis: true
  },
  {
    title: '状态',
    dataIndex: 'type',
    key: 'type',
    scopedSlots: { customRender: 'type' }
  },
  {
    title: '行为',
    key: 'action',
    scopedSlots: { customRender: 'action' },
    align: 'center'
  }
]

export default columns
