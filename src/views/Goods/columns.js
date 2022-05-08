const columns = [
  {
    dataIndex: 'SKU_NAME',
    key: 'SKU_NAME',
    title: '商品名称'
  },
  {
    title: 'SKU编号',
    key: 'SKU_CODE',
    dataIndex: 'SKU_CODE'
  },
  {
    title: '状态',
    key: 'STATUS',
    dataIndex: 'STATUS'
  },
  {
    title: '金额',
    dataIndex: 'MONEY',
    key: 'MONEY'
  },
  {
    title: '创建时间',
    dataIndex: 'CREATED_TIME',
    key: 'CREATED_TIME'
  },
  {
    title: '行为',
    key: 'action',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' },
    align: 'center'
  }

]
export default columns
