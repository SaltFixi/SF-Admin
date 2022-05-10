import Mock from 'mockjs'

const { list } = Mock.mock({
  'list|30': [{
    'id|+1': 1,
    src: '@cword(3, 15)',
    name: '@cname()',
    'price|10-50': 10,
    'type|0-1': 1
  }]
})
/**
 * 获取数据
 */
Mock.mock(/api\/getlist\/select/, 'post', (_req) => {
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
Mock.mock(/api\/getlist\/delete/, 'post', (_req) => {
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
Mock.mock(/api\/getlist\/add/, 'post', (_req) => {
  const body = JSON.parse(_req.body)
  list.push(Mock.mock({
    id: '@increment()',
    src: '@cword(3, 15)',
    name: body.name,
    price: body.price,
    type: 0
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
Mock.mock(/api\/getlist\/edit/, 'post', (_req) => {
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
Mock.mock(/api\/getlist\/search/, 'post', (_req) => {
  const body = JSON.parse(_req.body)
  const searchResult = list.filter(item => item.name.includes(body.keywords))
  return {
    status: 200,
    list: searchResult,
    message: '获取成功'
  }
})
