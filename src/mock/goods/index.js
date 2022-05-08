import Mock from 'mockjs'

const { list } = Mock.mock({
  'list|50': [{
    id: '@id()',
    'SKU_NAME|1': ['短裤', '衬衫', '七分裤', '风衣', '运动鞋', '裙子', '帽子', '毛衣'],
    SKU_CODE: '@string("number", 3)',
    'MONEY|100-6000.2': 1,
    CREATED_TIME: '@datetime()',
    'STATUS|1-3': 2
  }]
})
/**
 * 获取数据
 */
Mock.mock(/api\/goods\/select/, 'post', (_req) => {
  const result = { data: {} }
  let success = false
  const { pageindex, pagesize } = JSON.parse(_req.body)
  const start = (pageindex - 1) * pagesize
  const end = (pageindex) * pagesize

  try {
    if (Number.isInteger(pageindex) && Number.isInteger(pagesize)) {
      success = true
      result.data.list = list.slice(start, end)
      result.data.total = list.length
      result.data.pageindex = pageindex
      result.data.pageindex = pageindex
    }
  } catch {
    const message = {
      warning: '传入的格式必须是pageindex: 1, pagesize: 10',
      tips: 'pageindex,pageindex的值是个整数'
    }
    throw message
  }

  if (success) {
    result.status = 200
    result.message = '添加成功'
  } else {
    result.status = 400
    result.data = false
    result.message = '参数错误'
  }
  return result
})
/**
 * 删除数据
 */
Mock.mock(/api\/goods\/delete/, 'post', (_req) => {
  const result = {}
  let success = false
  const { specsIds } = JSON.parse(_req.body)
  try {
    success = true
    // 拿到需要批量删除的数据
    const delItems = list.filter(r => specsIds.includes(r.id))
    // 遍历批量删除的数据
    delItems.forEach((item) => {
      // 拿到 批量删除的数据在list中的索引号，通过索引号删除
      const index = list.findIndex(r => r.id === item.id)
      list.splice(index, 1)
    })
  } catch {
    const message = { warning: '传入的格式必须是specsIds: [id]' }
    throw message
  }

  if (success && Array.isArray(specsIds)) {
    result.status = 200
    result.data = true
    result.message = '删除成功'
    result.total = list.length
  } else {
    result.status = 400
    result.data = false
    result.message = '参数错误'
  }

  return result
})
/**
 * 添加数据
 */
Mock.mock(/api\/goods\/add/, 'post', (_req) => {
  const body = JSON.parse(_req.body)
  list.push(Mock.mock({
    id: '@increment()',
    src: '@cword(3, 15)',
    name: body.name,
    price: body.price,
    'type|0-1': 1
  }))
  return {
    status: 200,
    data: true,
    message: '添加成功'
  }
})

/**
 * 修改数据
 */
Mock.mock(/api\/goods\/edit/, 'post', (_req) => {
  const body = JSON.parse(_req.body)
  list.forEach(r => {
    if (r.id === body.id) {
      r.src = body.src
      r.name = body.name
      r.price = body.price
      r.type = body.type
    }
  })
  return {
    status: 200,
    data: true,
    message: '修改成功'
  }
})

/**
 * 搜索数据
 */
Mock.mock(/api\/goods\/search/, 'post', (_req) => {
  const { keywords } = JSON.parse(_req.body)
  const result = {}

  if (keywords) {
    const keywordsResult = list.filter(item => {
      return item.SKU_NAME.includes(keywords) ||
      item.SKU_CODE.includes(keywords) ||
      item.CREATED_TIME.includes(keywords) ||
      ('' + item.STATUS).includes(keywords) ||
      String(item.MONEY).includes(keywords)
    })
    result.searchResult = keywordsResult
    result.total = keywordsResult.length
    result.status = 200
    result.message = '获取成功'
  }
  return result
})
