import Mock from 'mockjs'

Mock.mock(/api\/echart\/info/, 'get', () => {
  const card = [
    {
      text1: '应收总额',
      text2: '同年比去年减少15.3%',
      money: '26123017',
      bgColor: '#7460ee',
      icon: 'icon-moneybag'
    },
    {
      text1: '应收超期金额',
      text2: '占比已超15%',
      money: '259433',
      bgColor: '#1e88e5',
      icon: 'icon-uf_money'
    },
    {
      text1: '下期应对总额',
      text2: '同比上周超8%',
      money: '1553217',
      bgColor: '#fc4b6c ',
      icon: 'icon-money1'
    },
    {
      text1: '超期末发货总金额',
      text2: '未发客户243个',
      money: '1587941',
      bgColor: '#26c6da',
      icon: 'icon-money'
    }
  ]

  const { line } = Mock.mock({
    'line|7': [{
      'mounth|+1': ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
      'line1|80-280': 100,
      'line2|80-280': 100
    }]
  })

  const { bar } = Mock.mock({
    'bar|12': [{
      'mounth|+1': ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      'bar1|80-280': 100,
      'bar2|80-430': 100
    }]
  })

  const { table } = Mock.mock({
    'table|6': [{
      total: 200000,
      add: 10000,
      noActive: 1280,
      active: 9720,
      potential: 2367,
      today: 122,
      yesterday: 346,
      week: 12356,
      month: 25356,
      id: '@id()'
    }]
  })

  const { pie } = Mock.mock({
    pie: [
      { value: 110, name: '销售一部' },
      { value: 735, name: '销售二部' },
      { value: 580, name: '销售三部' },
      { value: 484, name: '销售四部' },
      { value: 300, name: '研发一部' },
      { value: 200, name: '研发二部' },
      { value: 253, name: '研发三部' },
      { value: 440, name: '测试部' },
      { value: 700, name: '财务部' }
    ]
  })

  pie.forEach(r => {
    r.color = Mock.mock('@rgb')
  })

  const data = {}
  data.card = card
  data.line = line
  data.bar = bar
  data.pie = pie
  data.table = table

  return {
    data: data,
    status: 200,
    message: '添加成功'
  }
})
